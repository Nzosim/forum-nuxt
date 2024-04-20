<template>
  <h1 class="mx-auto w-75 mt-15 text-blue">Poster une réponse</h1>
  <v-card class="mx-auto pa-5 w-75 mt-4" elevation="8">
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
const { createMessage } = messagesStore;

const contenu = ref("");

definePageMeta({
  middleware: async function (to, from) {
    const { session } = await useSession();
    const value = session.value.user;

    const route = useRoute();
    const id = route.params.id;
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
  createMessage(id, contenu.value, value.id);
  return navigateTo(`/sujets/${id}`);
};
</script>
