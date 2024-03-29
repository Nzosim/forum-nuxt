<template>
  <div>
    <NuxtLink to="/" class="btn">Home page</NuxtLink>
    <NuxtLink to="/users/register" class="btn">Register</NuxtLink>
    <NuxtLink to="/users/login" class="btn">Login</NuxtLink>
    <NuxtLink to="/users/dashboard" class="btn">Dashboard user</NuxtLink>

    <NuxtPage  />
  </div>
</template>

<style>
.btn {
  margin: 10px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
  cursor: pointer;
  text-decoration: none;
  color: #333;
}

.btn:hover {
  background-color: #e0e0e0;
}
</style>
