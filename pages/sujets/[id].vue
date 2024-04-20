<template>
  <div class="all_table">
    <a :href="`/forums/${getMessages[0].forum_id}`" class="mt-1 w-75">
      <v-icon class="mb-1">mdi-arrow-left</v-icon> Liste des sujets
    </a>

    <div class="w-75 messages_rep mt-3">
      <h3 class="bg-grey-darken-4 messages_rep_title">Message</h3>
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

        <template v-slot:append>
          <div
            v-if="
              getMessages[0].id !== message.id &&
              user &&
              (user.id === message.user_id || user.role === 1)
            "
          >
            <v-btn
              variant="tonal"
              color="orange-lighten-1"
              class="mr-2"
              @click="updateMessage(message.id)"
              >Modifier</v-btn
            >
            <v-btn
              variant="tonal"
              color="red-lighten-1"
              @click="messageDelete(message.id)"
              >Supprimer</v-btn
            >
          </div>
        </template>
        <p class="text-grey font-italic text-body-2">
          {{ formatDate(message.date_crea) }}
        </p>
      </v-list-item>
    </div>

    <v-btn
      class="text-none mt-4 w-75"
      min-width="92"
      variant="outlined"
      color="green"
      @click="navigateTo(`/messages/${id}`)"
    >
      Répondre</v-btn
    >

    <div class="w-75 mt-3 messages_rep">
      <h3 class="bg-grey-darken-4 messages_rep_title">Réponses</h3>
      <v-list-item
        v-for="message in getMessages.slice(1)"
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

        <template v-slot:append>
          <div
            v-if="
              getMessages[0].id !== message.id &&
              user &&
              (user.id === message.user_id || user.role === 1)
            "
          >
            <v-btn
              variant="tonal"
              color="orange-lighten-1"
              class="mr-2"
              @click="updateMessage(message.id)"
              >Modifier</v-btn
            >
            <v-btn
              variant="tonal"
              color="red-lighten-1"
              @click="messageDelete(message.id)"
              >Supprimer</v-btn
            >
          </div>
        </template>
        <p class="text-grey font-italic text-body-2">
          {{ formatDate(message.date_crea) }}
        </p>
      </v-list-item>
    </div>
    <div>
      <v-btn
        class="text-none mt-9 mr-2"
        min-width="92"
        variant="outlined"
        @click="previousPage()"
      >
        Page précédente</v-btn
      >
      <v-btn
        class="text-none mt-9 ml-2"
        min-width="92"
        variant="outlined"
        @click="nextPage()"
      >
        Prochaine page</v-btn
      >
    </div>
  </div>
</template>

<style>
.messages_rep {
  border: 1px solid black;
  border-radius: 10px 10px;
}
.messages_rep_title {
  margin: 0;
  border-top-left-radius: 10px 10px;
  border-top-right-radius: 10px 10px;
  padding: 15px 25px;
}
</style>

<script setup>
import { formatDate } from "~/utils/util.js";
import { useMessagesStore } from "~/store/messages.js";
import { storeToRefs } from "pinia";
const messagesStore = useMessagesStore();
const { fetchMessagesBySujets, nextPage, previousPage, deleteMessage } =
  messagesStore;
const { getMessages } = storeToRefs(messagesStore);

const route = useRoute();
const id = route.params.id;

const user = ref("");
const { session } = await useSession();
user.value = session.value.user;

const messageDelete = async (messageId) => {
  await deleteMessage(messageId);
  navigateTo(`/sujets/${id}`);
};

await fetchMessagesBySujets(id);
</script>
