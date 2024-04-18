<template>
  <h1>Dashboard page</h1>
  <div>
    <p>Dashboard of {{ name }}</p>
    <button @click="logout">Logout</button>
  </div>
  <button @click="seeChangePasswordForm = !seeChangePasswordForm">
    Change password
  </button>
  <div v-if="seeChangePasswordForm">
    <input type="password" placeholder="Old password" v-model="oldPassword" />
    <input type="password" placeholder="New password" v-model="newPassword" />
    <button @click="changePassword(name, oldPassword, newPassword)">
      Change password
    </button>
  </div>
</template>

<script setup>
import { showToast } from "~/utils/toast";
import { useUsersStore } from "~/store/users.js";
const usersStore = useUsersStore();
const { changePassword } = usersStore;

const seeChangePasswordForm = ref(false);
const oldPassword = ref("");
const newPassword = ref("");

const name = ref("");
const getUser = async () => {
  const { session } = await useSession();
  name.value = session.value.user.login;
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
