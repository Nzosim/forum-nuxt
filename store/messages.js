import { defineStore } from "pinia";

// Store des messages
export const useMessagesStore = defineStore("messages", {
  state: () => {
    return {
      messages: [],
      currentPage: 1,
      messagesPerPage: 20,
      url: "http://localhost:3000/api/messages",
      // Websocket pour les notifications
      webSocket: new WebSocket("ws://localhost:3000/_ws"),
      message: {},
    };
  },
  actions: {
    // Récupération des messages d'un sujet
    async fetchMessagesBySujets(id) {
      const { data } = await useFetch(this.url + `?sujet_id=${id}`);
      this.messages = data.value;
    },
    // Récupération d'un message par son id
    async fetchMessage(id) {
      const { data } = await useFetch(this.url + `?id=${id}`);
      this.message = data.value;
    },
    // Création d'un message 
    async createMessage(sujet_id, contenu, author_id, citation_id) {
      const { data } = await useFetch(this.url, {
        method: "POST",
        body: JSON.stringify({ sujet_id, contenu, author_id, citation_id }),
      });
      this.webSocket.send("reload_messages");
      showToast(data.value.body, data.value.status);
    },
    // Suppression d'un message
    async deleteMessage(id) {
      const { data } = await useFetch(this.url + `?id=${id}`, {
        method: "DELETE",
      });
      this.webSocket.send("reload_messages");
      showToast(data.value.body, data.value.status);
    },
    // Modification d'un message
    async modifyMessage(id, contenu) {
      const { data } = await useFetch(this.url, {
        method: "PATCH",
        body: JSON.stringify({ id, contenu }),
      });
      this.webSocket.send("reload_messages");
      showToast(data.value.body, data.value.status);
    },
    // Permet de passer à la page précédente
    previousPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    // Permet de passer à la page suivante
    nextPage() {
      if (this.currentPage < this.messages.body.length / this.messagesPerPage)
        this.currentPage++;
    },
  },
  getters: {
    // Permet de récupérer les messages de la page courante
    getMessages: (state) => {
      const indexOfLastMessage = state.currentPage * state.messagesPerPage;
      const indexOfFirsMessage = indexOfLastMessage - state.messagesPerPage;
      return state.messages.body.slice(indexOfFirsMessage, indexOfLastMessage);
    },
    // Permet de récupérer tous les messages
    getAllMessags: (state) => {
      return state.messages.body;
    },
  },
});
