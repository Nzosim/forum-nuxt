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
        async createSubject(forum_id, titre, contenu, author_id) {
            let url_subject = `http://localhost:3000/api/sujets`
            const { data } = await useFetch(url_subject, {
                method: 'POST',
                body: JSON.stringify({ forum_id, titre, author_id })
            })

            let url_message = `http://localhost:3000/api/messages`
            const { data: data_message } = await useFetch(url_message, {
                method: 'POST',
                body: JSON.stringify({ sujet_id: data.value.subject_id, contenu, author_id })
            }) 
            showToast(data.value.body, data.value.status)
        }
    },
    getters: {
        getSujets: state => {
            return state.sujets
        },
    }
})
