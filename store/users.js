import { defineStore } from 'pinia'
import { showToast } from '~/utils/toast'

export const useUsersStore = defineStore('users', {
    actions: {
        async register(login, password, isAdmin = false) {
            let url = `http://localhost:3000/api/users`
            const { data } = await useFetch(url, {
                method: 'POST',
                body: JSON.stringify({ login, password, isAdmin })
            })
            showToast(data.value.body, data.value.status)
        },
        async login(login, password) {
            let url = `http://localhost:3000/api/users?login=${login}&password=${password}`
            const { data } = await useFetch(url)
            showToast(data.value.body, data.value.status)
        },
        async changePassword(login, password, newPassword) {
            const { data } = await useFetch(`http://localhost:3000/api/users`, {
                method: 'PATCH',
                body: JSON.stringify({ login, password, newPassword })
            })
            showToast(data.value.body, data.value.status)
        }
    }
})
