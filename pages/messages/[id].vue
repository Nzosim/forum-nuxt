<template>
    <h1>Poster un message</h1>
    <textarea v-model="contenu" placeholder="Message"></textarea>
    <button @click="postMessage()">Poster</button>
</template>

<script setup>
import { showToast } from '~/utils/toast'
import { useMessagesStore } from '~/store/messages.js'
const messagesStore = useMessagesStore()
const { createMessage } = messagesStore

const contenu = ref('')

definePageMeta({
    middleware: async function (to, from) {
        const { session } = await useSession()
        const value = session.value.user

        const route = useRoute()
        const id = route.params.id;
        if (!value) {
            showToast("Vous devez vous connecter avant de poster un message", 400);
            return navigateTo(`/sujets/${id}`);
        }
    }
});

const postMessage = async () => {
    if(!contenu.value) return showToast("Veuillez écrire un message avant de le poster", 400);

    const { session } = await useSession()
    const value = session.value.user

    const route = useRoute()
    const id = route.params.id;
    createMessage(id, contenu.value, value.id);
    return navigateTo(`/sujets/${id}`);
}
</script>