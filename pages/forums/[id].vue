<template>
    <div>
        <h1>Sujets</h1>
        <div v-for="sujet in getSujets.body" :key="sujet.id">
            <NuxtLink :to="`/sujets/${sujet.id}`">
                <p>{{ sujet.titre }}</p>
                <p>{{ new Date(sujet.date_crea) }}</p>
            </NuxtLink>
        </div>  
    </div>
</template>

<script setup>
import { useSujetsStore } from '~/store/sujets.js'
import { storeToRefs } from 'pinia'
const sujetsStore = useSujetsStore()
const { fetchSujetsByForum } = sujetsStore
const { getSujets } = storeToRefs(sujetsStore)

const route = useRoute()
const id = route.params.id;

await fetchSujetsByForum(id)
</script>


