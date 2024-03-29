<script setup>
import { useUsersStore } from '~/store/users.js'
import { storeToRefs } from 'pinia'
const usersStore = useUsersStore()
const { login } = usersStore
const email = ref('')
const password = ref('')
</script>

<template>
    <h1>Login page</h1>
    <div>
        <input type="text" v-model="email" placeholder="Email">
        <input type="text" v-model="password" placeholder="Password">
        <button @click="login(email, password)">Login</button>
    </div>
</template>
