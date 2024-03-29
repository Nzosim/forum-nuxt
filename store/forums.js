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
            console.log(data.value)
            data.value.body.forEach(async forum => {
                let url = `${baseUrl}/sujets?forum_id=${forum.id}`
                const { data } = await useFetch(url)
                let count = data.value.body.length 
                this.forums.push({ ...forum, count})
            })
        },
    },
    getters: {
        getForums: state => {
            return state.forums
        },
    }
})
