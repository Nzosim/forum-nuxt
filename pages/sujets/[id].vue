<template>
    <div>
        <NuxtLink :to="`/messages/${id}`">Poster un message</NuxtLink>
        <h1>Messages</h1>
        <div v-for="sujet in getMessages.body" :key="sujet.id">
            <div>
                <p>{{ sujet.contenu }}</p>
                <p>{{ new Date(sujet.date_crea) }}</p>
                <p v-if="date_modif">{{ new Date(date_modif) }}</p>
            </div>
            <br>
        </div>  
    </div>
</template>

<script setup>
import { useMessagesStore } from '~/store/messages.js'
import { storeToRefs } from 'pinia'
const messagesStore = useMessagesStore()
const { fetchMessagesBySujets } = messagesStore
const { getMessages } = storeToRefs(messagesStore)

const route = useRoute()
const id = route.params.id;

await fetchMessagesBySujets(id)
</script>
