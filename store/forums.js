import { defineStore } from 'pinia'

export const useForumsStore = defineStore('forums', {
    state: () => {
        return {
            forums: []
        }
    },
    actions: {
        async fetchForum() {
            this.forums = []
            let baseUrl = `http://localhost:3000/api/`
            const { data } = await useFetch(`${baseUrl}/forums`)
            this.forums = data.value.body
        },
    },
    getters: {
        getForums: state => {
            return state.forums
        },
    }
})
