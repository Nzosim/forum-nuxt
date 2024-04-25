import { defineStore } from "pinia";

// Store des sujets
export const useSujetsStore = defineStore("sujets", {
  state: () => {
    return {
      sujets: [],
      currentPage: 1,
      sujetsPerPage: 20,
      // Websocket pour les notifications
      webSocket: new WebSocket("ws://localhost:3000/_ws"),
      url: "http://localhost:3000/api/",
    };
  },
  actions: {
    // Récupération des sujets du forum
    async fetchSujetsByForum(id) {
      const { data } = await useFetch(`${this.url}sujets?forum_id=${id}`);
      this.sujets = data.value;
    },
    // Création d'un sujet
    async createSubject(forum_id, titre, contenu, author_id) {
      const { data } = await useFetch(`${this.url}sujets`, {
        method: "POST",
        body: JSON.stringify({ forum_id, titre, author_id }),
      });

      const { data: data_message } = await useFetch(`${this.url}messages`, {
        method: "POST",
        body: JSON.stringify({
          sujet_id: data.value.subject_id,
          contenu,
          author_id,
        }),
      });
      this.webSocket.send("reload_sujets");
      showToast(data.value.body, data.value.status);
    },
    // Verrouillage/déverrouillage d'un sujet
    async lockUnlockSubject(id, close) {
      const { data } = await useFetch(`${this.url}sujets`, {
        method: "PATCH",
        body: JSON.stringify({
          id: id,
          close,
        }),
      });
      this.webSocket.send("reload_sujets");
      showToast(data.value.body, data.value.status);
    },
    // Suppression d'un sujet
    async deleteSubject(id) {
      const { data } = await useFetch(this.url + `sujets?id=${id}`, {
        method: "DELETE",
      });
      this.webSocket.send("reload_sujets");
      showToast(data.value.body, data.value.status);
    },
    // Permet de passer à la page précédente
    previousPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    // Permet de passer à la page suivante
    nextPage() {
      if (this.currentPage < this.sujets.body.length / this.sujetsPerPage)
        this.currentPage++;
    },
  },
  getters: {
    // Permet de récupérer les sujets de la page actuelle
    getSujets: (state) => {
      const indexOfLastSubject = state.currentPage * state.sujetsPerPage;
      const indexOfFirsSubject = indexOfLastSubject - state.sujetsPerPage;
      return state.sujets.body.slice(indexOfFirsSubject, indexOfLastSubject);
    },
  },
});
