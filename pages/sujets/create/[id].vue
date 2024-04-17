<template>
    <h1>Créer un sujet</h1>
    <input type="text" v-model="titre" placeholder="Nom du sujet">
    <textarea v-model="contenu" placeholder="Message"></textarea>
    <button @click="create()">Créer</button>
</template>

<script setup>
import { showToast } from '~/utils/toast'
import { useSujetsStore } from '~/store/sujets.js'
const sujetsStore = useSujetsStore()
const { createSubject } = sujetsStore

const titre = ref('')
const contenu = ref('')

definePageMeta({
    middleware: async function (to, from) {
        const { session } = await useSession()
        const value = session.value.user

        const route = useRoute()
        const id = route.params.id;
        if (!value) {
            showToast("Vous devez vous connecter avant de créer un sujet", 400);
            return navigateTo(`/forums/${id}`);
        }
    }
});

const create = async () => {
    if(!titre.value || !contenu.value) return showToast("Veuillez remplir tous les champs", 400);

    const { session } = await useSession()
    const value = session.value.user

    const route = useRoute()
    const id = route.params.id;
    createSubject(id, titre.value, contenu.value, value);
}
</script>