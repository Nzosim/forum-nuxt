import { defineStore } from 'pinia'

export const useMessagesStore = defineStore('messages', {
    state: () => {
        return {
            messages: []
        }
    },
    actions: {
        async fetchMessagesBySujets(id) {
            let url = `http://localhost:3000/api/messages?sujet_id=${id}`
            const { data } = await useFetch(url)
            this.messages = data.value
        },
    },
    getters: {
        getMessages: state => {
            return state.messages
        },
    }
})
