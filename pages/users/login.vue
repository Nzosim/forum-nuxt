<script setup>
import { useUsersStore } from "~/store/users.js";
const usersStore = useUsersStore();
const { login } = usersStore;
const email = ref("");
const password = ref("");
const visible = ref(false);
</script>

<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="250"
      src="~/assets/forum.png"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Email</div>

      <v-text-field
        v-model="email"
        density="compact"
        placeholder="exemple@test.fr"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        Mot de passe
      </div>

      <v-text-field
        v-model="password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="**********"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-btn
        class="mb-8 bg-blue"
        size="large"
        variant="tonal"
        block
        @click="login(email, password)"
      >
        Connexion
      </v-btn>

      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="/users/register"
          rel="noopener noreferrer"
          target="_blank"
        >
          S'inscrire <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>
