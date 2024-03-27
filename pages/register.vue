<script setup>
import { useUsersStore } from '~/store/users.js'
import { storeToRefs } from 'pinia'
const usersStore = useUsersStore()
const { register } = usersStore
const { getRetourFetch } = storeToRefs(usersStore)
const email = ref('')
const password = ref('')
</script>

<template>
    <h1>Registration page</h1>
    <div>
        <input type="text" v-model="email" placeholder="Email">
        <input type="text" v-model="password" placeholder="Password">
        <button @click="register(email, password)">Register</button>
    </div>
    <div v-if="getRetourFetch.length !== 0">
        <p>{{ getRetourFetch.body }}</p>
    </div>
</template>

<style>
* {
    font-family: Arial, sans-serif;
}
h1 {
    color: #333;
}
input {
    margin: 10px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
button {
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f0f0f0;
    cursor: pointer;
}
button:hover {
    background-color: #e0e0e0;
}
p {
    margin: 10px;
    color: #333;
}
</style>