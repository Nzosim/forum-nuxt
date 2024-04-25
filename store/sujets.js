import { defineStore } from "pinia";

export const useSujetsStore = defineStore("sujets", {
  state: () => {
    return {
      sujets: [],
      currentPage: 1,
      sujetsPerPage: 20,
      webSocket: new WebSocket("ws://localhost:3000/_ws"),
      url: "http://localhost:3000/api/",
    };
  },
  actions: {
    async fetchSujetsByForum(id) {
      const { data } = await useFetch(`${this.url}sujets?forum_id=${id}`);
      this.sujets = data.value;
    },
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
    previousPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.sujets.body.length / this.sujetsPerPage)
        this.currentPage++;
    },
  },
  getters: {
    getSujets: (state) => {
      const indexOfLastSubject = state.currentPage * state.sujetsPerPage;
      const indexOfFirsSubject = indexOfLastSubject - state.sujetsPerPage;
      return state.sujets.body.slice(indexOfFirsSubject, indexOfLastSubject);
    },
  },
});
