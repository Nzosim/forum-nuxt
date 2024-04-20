<template>
  <h1 class="mx-auto w-75 mt-15 text-blue">Créer un sujet</h1>
  <v-card class="mx-auto pa-5 w-75 mt-4" elevation="8">
    <div class="text-subtitle-1 text-medium-emphasis">Nom du sujet</div>

    <v-text-field
      v-model="titre"
      density="compact"
      prepend-inner-icon="mdi-format-title"
      variant="outlined"
    ></v-text-field>

    <div class="text-subtitle-1 text-medium-emphasis">Contenu du message</div>

    <v-textarea
      v-model="contenu"
      density="compact"
      prepend-inner-icon="mdi-text-box-edit"
      variant="outlined"
      @click:append-inner="visible = !visible"
    ></v-textarea>

    <v-btn
      class="mb-8 bg-blue"
      size="large"
      variant="tonal"
      block
      @click="create()"
    >
      Créer
    </v-btn>
  </v-card>
</template>

<script setup>
import { showToast } from "~/utils/toast";
import { useSujetsStore } from "~/store/sujets.js";
const sujetsStore = useSujetsStore();
const { createSubject } = sujetsStore;

const titre = ref("");
const contenu = ref("");

definePageMeta({
  middleware: async function (to, from) {
    const { session } = await useSession();
    const value = session.value.user;

    const route = useRoute();
    const id = route.params.id;
    if (!value) {
      showToast("Vous devez vous connecter avant de créer un sujet", 400);
      return navigateTo(`/forums/${id}`);
    }
  },
});

const create = async () => {
  if (!titre.value || !contenu.value)
    return showToast("Veuillez remplir tous les champs", 400);

  const { session } = await useSession();
  const value = session.value.user;

  const route = useRoute();
  const id = route.params.id;
  createSubject(id, titre.value, contenu.value, value.id);
  return navigateTo(`/forums/${id}`);
};
</script>
