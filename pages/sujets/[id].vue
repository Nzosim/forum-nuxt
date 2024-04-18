<template>
  <div class="all_table">
    <a href="/" class="mt-1 w-75">
      <v-icon class="mb-1">mdi-arrow-left</v-icon> Liste des sujets
    </a>
    <div class="w-75 d-flex justify-space-between">
      <h1 class="my-7 w-75">Messages</h1>
      <v-btn
        class="text-none mt-9"
        min-width="92"
        variant="outlined"
        @click="navigateTo(`/messages/${id}`)"
      >
        Répondre</v-btn
      >
    </div>
    <div v-for="message in getMessages" :key="message.id">
      <div>
        <p>{{ message.contenu }}</p>
        <p>{{ formatDate(message.date_crea) }}</p>
        <p>Author : {{ message.login }}</p>
        <p v-if="date_modif">{{ formatDate(date_modif) }}</p>
      </div>
      <div
        v-if="
          getMessages[0].id !== message.id &&
          user &&
          (user.id === message.user_id || user.role === 1)
        "
      >
        <button @click="updateMessage(message.id)">Modifier</button>
        <button @click="messageDelete(message.id)">Supprimer</button>
      </div>
      <br />
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
