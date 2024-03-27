import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
    state: () => {
        return {
            retourFetch: []
        }
    },
    actions: {
        async register(login, password) {
            this.retourFetch = []
            let url = `http://localhost:3000/api/users/users`
            const { data } = await useFetch(url, {
                method: 'POST',
                body: JSON.stringify({ login, password })
            })
            .catch((e) => {
                this.error = e
            })
            this.retourFetch = data.value
        },
        async login(login, password) {
            this.retourFetch = []
            let url = `http://localhost:3000/api/users/users?login=${login}&password=${password}`
            const { data } = await useFetch(url)
            .catch((e) => {
                this.error = e
            })
            this.retourFetch = data.value
        }
    },
    getters: {
        getRetourFetch() {
            return this.retourFetch
        }
    }
})
