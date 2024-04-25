<template>
  <h1 class="mx-auto w-75 mt-15 text-blue">
    {{ query.citation ? "Citer" : "Poster" }} une réponse
  </h1>
  <v-card class="mx-auto pa-5 w-75 mt-4" elevation="8">
    <div v-if="query.citation">
      <v-list-item
        v-for="message in getMessages.slice(0, 1)"
        :key="message.id"
        :subtitle="message.contenu"
        :title="message.login"
        class="pa-3 messages_item"
      >
        <template v-slot:prepend>
          <v-avatar>
            <img src="/assets/no_avatar.jpg" width="50px" />
          </v-avatar>
        </template>
        <p class="text-grey font-italic text-body-2">
          {{ formatDate(message.date_crea) }}
        </p>
      </v-list-item>
    </div>

    <div class="text-subtitle-1 text-medium-emphasis">Contenu du message</div>

    <v-textarea
      v-model="contenu"
      density="compact"
      prepend-inner-icon="mdi-text-box-edit"
      variant="outlined"
      @click:append-inner="visible = !visible"
    ></v-textarea>

    <v-btn
      class="mb-8 bg-blue"
      size="large"
      variant="tonal"
      block
      @click="postMessage()"
    >
      Poster
    </v-btn>
  </v-card>
</template>

<script setup>
import { showToast } from "~/utils/toast";
import { useMessagesStore } from "~/store/messages.js";
const messagesStore = useMessagesStore();
const { createMessage, fetchMessage } = messagesStore;
const { getMessages } = storeToRefs(messagesStore);
const route = useRoute();
const query = route.query;

const contenu = ref("");

definePageMeta({
  middleware: async function (to, from) {
    const { session } = await useSession();
    const value = session.value.user;

    const route = useRoute();
    if (!value) {
      showToast("Vous devez vous connecter avant de poster un message", 400);
      return navigateTo(`/sujets/${id}`);
    }
  },
});

const postMessage = async () => {
  if (!contenu.value)
    return showToast("Veuillez écrire un message avant de le poster", 400);

  const { session } = await useSession();
  const value = session.value.user;

  const route = useRoute();
  const id = route.params.id;
  createMessage(id, contenu.value, value.id, query.citation);
  return navigateTo(`/sujets/${id}`);
};

if (query.citation) {
  fetchMessage(query.citation);
}
</script>
