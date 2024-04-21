import { defineStore } from 'pinia'

export const useForumsStore = defineStore('forums', {
    state: () => {
        return {
            forums: [],
            url: "http://localhost:3000/api/forums"
        }
    },
    actions: {
        async fetchForum() {
            this.forums = []
            const { data } = await useFetch(this.url)
            this.forums = data.value.body
        },
        async createForum(name) {
            const { data } = await useFetch(this.url, {
                method: 'POST',
                body: JSON.stringify({ name })
            })
            showToast(data.value.body, data.value.status)
        },
        async deleteForum(id) {
            const { data } = await useFetch(this.url + `?id=${id}`, {
                method: 'DELETE'
            })
            showToast(data.value.body, data.value.status)
        },
        async modifyForum(id, name) {
            const { data } = await useFetch(this.url, {
                method: 'PATCH',
                body: JSON.stringify({ id, name })
            })
            showToast(data.value.body, data.value.status)
        }
    },
    getters: {
        getForums: state => {
            return state.forums
        },
    }
})
