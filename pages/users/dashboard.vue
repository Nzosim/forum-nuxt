<template>
  <h1 class="mx-auto w-75 mt-15 text-blue">Dashboard</h1>
  <v-card class="mx-auto pa-5 w-75 mt-4" elevation="8">
    <h3 class="mb-3">
      Dashboard de <b>{{ name }}</b>
    </h3>

    <v-btn
      v-if="!seeChangePasswordForm"
      class="mb-2"
      size="large"
      variant="tonal"
      color="orange"
      block
      @click="seeChangePasswordForm = !seeChangePasswordForm"
    >
      Changer de mot de passe
    </v-btn>

    <div v-if="seeChangePasswordForm">
      <div class="text-subtitle-1 text-medium-emphasis mt-8">
        Mot de passe actuel
      </div>
      <v-text-field
        v-model="oldPassword"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="**********"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">
        Nouveau mot de passe
      </div>
      <v-text-field
        v-model="newPassword"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="**********"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-btn
        size="large"
        class="mb-8"
        variant="tonal"
        color="red"
        block
        @click="
          changePassword(name, oldPassword, newPassword);
          seeChangePasswordForm = false;
        "
      >
        Valider
      </v-btn>
    </div>

    <v-btn
      v-if="!seeChangePasswordForm"
      size="large"
      variant="tonal"
      color="red"
      block
      @click="logout"
    >
      Se déconnecter
    </v-btn>
  </v-card>

  <v-card v-if="role === 1" class="mx-auto pa-5 w-75 mt-4" elevation="8">
    <h3 class="mb-3">Espace ADMIN</h3>

    <v-btn
      v-if="!seeCreateAdminForm"
      class="mb-2"
      size="large"
      variant="tonal"
      color="green"
      block
      @click="seeCreateAdminForm = !seeCreateAdminForm"
    >
      Créer un nouvel admin
    </v-btn>

    <div v-if="seeCreateAdminForm">
      <div class="text-subtitle-1 text-medium-emphasis">Email</div>

      <v-text-field
        v-model="email"
        density="compact"
        placeholder="exemple@test.fr"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Mot de passe</div>
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
        size="large"
        class="mb-8"
        variant="tonal"
        color="green"
        block
        @click="
          register(email, password, true);
          seeCreateAdminForm = false;
        "
      >
        Valider
      </v-btn>
    </div>

    <v-btn
      v-if="!seeChangePasswordForm"
      size="large"
      variant="tonal"
      color="red"
      block
      @click="logout"
    >
      Se déconnecter
    </v-btn>
  </v-card>
</template>

<script setup>
import { showToast } from "~/utils/toast";
import { useUsersStore } from "~/store/users.js";
const usersStore = useUsersStore();
const { changePassword, register } = usersStore;

const seeChangePasswordForm = ref(false);
const oldPassword = ref("");
const newPassword = ref("");
const visible = ref(false);

const seeCreateAdminForm = ref(false);
const email = ref("");
const password = ref("");

const name = ref("");
const role = ref("");
const getUser = async () => {
  const { session } = await useSession();
  name.value = session.value.user.login;
  role.value = session.value.user.role;
};
getUser();

const logout = async () => {
  const { reset } = await useSession();
  reset();
  navigateTo("/users/login");
};

definePageMeta({
  middleware: async function (to, from) {
    const { session } = await useSession();
    const value = session.value.user;
    if (!value) {
      showToast(
        "Vous devez vous connecter pour accéder à votre dashboard",
        400
      );
      return navigateTo("/users/login");
    }
  },
});
</script>
