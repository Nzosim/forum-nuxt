<template>
  <div class="all_table">
    <h1 class="my-7 w-75">Forums</h1>
    <v-table class="w-75 vtable">
      <thead class="bg-grey-darken-4">
        <tr>
          <th class="text-left">Nom</th>
          <th class="text-left">Nombre de sujets</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="forum in getForums"
          :key="forum.id"
          @click="navigateTo(`/forums/${forum.id}`)"
        >
          <td>{{ forum.nom }}</td>
          <td>{{ forum.nombre_de_sujets }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import { useForumsStore } from "~/store/forums.js";
import { storeToRefs } from "pinia";
const forumsStore = useForumsStore();
const { fetchForum } = forumsStore;
const { getForums } = storeToRefs(forumsStore);
await fetchForum();

onMounted(() => {
  let ws;
  const messages = ref([]);
  const isSecure = window.location.protocol === "https:";
  const url = (isSecure ? "wss://" : "ws://") + location.host + "/_ws";

  if (ws) {
    // Déjà connecté, on ferme la connexion existante
    ws.close();
  }

  // Connexion au serveur
  console.log("Connexion à", url, "...");
  ws = new WebSocket(url);

  ws.addEventListener("open", () => {
    console.log("ws connecté!");
  });
});
</script>

<style>
.all_table {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.vtable {
  border: 1px solid #212121;
  border-radius: 10px 10px;
  cursor: pointer;
}

tbody tr:nth-child(even),
.messages_item:nth-child(odd) {
  background-color: #eeeeee;
}

tbody tr:nth-child(even):hover,
.messages_item:nth-child(odd):hover {
  background-color: white;
  transition: 0.3s;
}

tbody tr:nth-child(odd):hover,
.messages_item:nth-child(even):hover {
  background-color: #eeeeee;
  transition: 0.3s;
}
a {
  text-decoration: none;
}
</style>
