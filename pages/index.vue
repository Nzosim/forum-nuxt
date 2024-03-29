<template>
    <div>
        <h1>Forums</h1>
        <div v-for="forum in getForums" :key="forum.id">
            <NuxtLink :to="`/forums/${forum.id}`">{{ forum.nom }},  Nombre de sujets : {{ forum.count }}</NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { useForumsStore } from '~/store/forums.js'
import { storeToRefs } from 'pinia'
const forumsStore = useForumsStore()
const { fetchForum } = forumsStore
const { getForums } = storeToRefs(forumsStore)
await  fetchForum();

</script>