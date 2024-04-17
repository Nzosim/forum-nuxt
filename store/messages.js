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
        async createMessage(sujet_id, contenu, author_id) {
            let url_message = `http://localhost:3000/api/messages`
            const { data } = await useFetch(url_message, {
                method: 'POST',
                body: JSON.stringify({ sujet_id, contenu, author_id })
            }) 
            showToast(data.value.body, data.value.status)
        }
    },
    getters: {
        getMessages: state => {
            return state.messages
        },
    }
})
