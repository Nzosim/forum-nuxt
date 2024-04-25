<template>
  <div class="all_table">
    <a href="/" class="mt-1 w-75">
      <v-icon class="mb-1">mdi-arrow-left</v-icon> Liste des forums
    </a>
    <div class="w-75 d-flex justify-space-between">
      <h1 class="my-7 w-75">Sujets</h1>
      <v-btn
        class="text-none mt-9"
        min-width="92"
        variant="outlined"
        @click="navigateTo(`/sujets/create/${id}`)"
      >
        Créer un sujet</v-btn
      >
    </div>
    <v-table class="w-75 vtable">
      <thead class="bg-grey-darken-4">
        <tr>
          <th class="text-left">Nom</th>
          <th class="text-left">Date de création</th>
          <th class="text-left">Dernier message</th>
          <th class="text-left">Envoyé par</th>
          <th v-if="user && user.role === 1" class="text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="sujet in getSujets"
          :key="sujet.id"
          @click="navigateTo(`/sujets/${sujet.id}`)"
        >
          <td>{{ sujet.titre }}</td>
          <td>{{ formatDate(sujet.date_crea) }}</td>
          <td>{{ formatDate(sujet.date_dernier_message) }}</td>
          <td>{{ sujet.auteur_dernier_message }}</td>
          <td v-if="user && user.role === 1">
            <v-btn variant="tonal" @click="deleteSubject(sujet.id)">
              Supprimer</v-btn
            >
          </td>
        </tr>
      </tbody>
    </v-table>
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
import { useSujetsStore } from "~/store/sujets.js";
import { storeToRefs } from "pinia";
import { formatDate } from "~/utils/util.js";

const sujetsStore = useSujetsStore();
const { fetchSujetsByForum, nextPage, previousPage, deleteSubject } =
  sujetsStore;
const { getSujets } = storeToRefs(sujetsStore);

const route = useRoute();
const id = route.params.id;

const user = ref("");
const { session } = await useSession();
user.value = session.value.user;

await fetchSujetsByForum(id);

let ws;
const isSecure = window.location.protocol === "https:";
const url = (isSecure ? "wss://" : "ws://") + location.host + "/_ws";
ws = new WebSocket(url);

ws.addEventListener("message", async (event) => {
  const message = event.data;
  if (message === "reload_sujets") await fetchSujetsByForum(id);
});
</script>
