<template>
  <div class="d-flex justify-space-between bg-grey-darken-4 elevation-24">
    <a href="/"><img src="assets/forum.png" /></a>

    <div class="w-25 d-flex justify-space-evenly text-h5 pt-6 font-weight-bold">
      <a href="/users/register">Incription</a>
      <a href="/users/login">Connexion</a>
      <a href="/users/dashboard">Dashboard</a>
    </div>
  </div>

  <NuxtPage />
</template>

<style scoped>
img {
  width: 100px;
}
a {
  text-decoration: none;
  color: white;
}
</style>
