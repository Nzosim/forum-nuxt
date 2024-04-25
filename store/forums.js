import { defineStore } from 'pinia'

// Store des forums
export const useForumsStore = defineStore('forums', {
    state: () => {
        return {
            forums: [],
            url: "http://localhost:3000/api/forums"
        }
    },
    actions: {
        // Récupération des forums
        async fetchForum() {
            this.forums = []
            const { data } = await useFetch(this.url)
            this.forums = data.value.body
        },
        // Création d'un forum
        async createForum(name) {
            const { data } = await useFetch(this.url, {
                method: 'POST',
                body: JSON.stringify({ name })
            })
            showToast(data.value.body, data.value.status)
        },
        // Suppression d'un forum ainsi que de ses sujets et messages
        async deleteForum(id) {
            const { data } = await useFetch(this.url + `?id=${id}`, {
                method: 'DELETE'
            })
            showToast(data.value.body, data.value.status)
        },
        // Modification du nom d'un forum
        async modifyForum(id, name) {
            const { data } = await useFetch(this.url, {
                method: 'PATCH',
                body: JSON.stringify({ id, name })
            })
            showToast(data.value.body, data.value.status)
        }
    },
    getters: {
        // Récupération des forums
        getForums: state => {
            return state.forums
        },
    }
})
