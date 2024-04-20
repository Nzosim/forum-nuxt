import { defineStore } from 'pinia'

export const useMessagesStore = defineStore('messages', {
    state: () => {
        return {
            messages: [],
            currentPage: 1,
            messagesPerPage: 20,
            url: "http://localhost:3000/api/messages"
        }
    },
    actions: {
        async fetchMessagesBySujets(id) {
            const { data } = await useFetch(this.url + `?sujet_id=${id}`)
            this.messages = data.value
        },
        async createMessage(sujet_id, contenu, author_id) {
            const { data } = await useFetch(this.url, {
                method: 'POST',
                body: JSON.stringify({ sujet_id, contenu, author_id })
            }) 
            showToast(data.value.body, data.value.status)
        },
        async deleteMessage(id) {
            const { data } = await useFetch(this.url + `?id=${id}`, {
                method: 'DELETE'
            })
            showToast(data.value.body, data.value.status)
        },
        async modifyMessage(id, contenu) {
            const { data } = await useFetch(this.url, {
                method: 'PATCH',
                body: JSON.stringify({ id, contenu })
            })
            showToast(data.value.body, data.value.status)
        },
        previousPage() {
            if(this.currentPage > 1) this.currentPage-- 
        },
        nextPage() {
            if(this.currentPage < this.messages.body.length / this.messagesPerPage)
                this.currentPage++
        }
    },
    getters: {
        getMessages: state => {
            const indexOfLastMessage = state.currentPage * state.messagesPerPage
            const indexOfFirsMessage = indexOfLastMessage - state.messagesPerPage
            return state.messages.body.slice(indexOfFirsMessage, indexOfLastMessage)
        },
    }
})
