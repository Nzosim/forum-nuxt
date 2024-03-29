import { defineStore } from 'pinia'

export const useSujetsStore = defineStore('sujets', {
    state: () => {
        return {
            sujets: []
        }
    },
    actions: {
        async fetchSujetsByForum(id) {
            let url = `http://localhost:3000/api/sujets?forum_id=${id}`
            const { data } = await useFetch(url)
            this.sujets = data.value
        },
    },
    getters: {
        getSujets: state => {
            return state.sujets
        },
    }
})
