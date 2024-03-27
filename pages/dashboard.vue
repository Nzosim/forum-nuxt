<template>
    <h1>Dashboard page</h1>
    <div>
        <p>Dashboard of {{ name }}</p>
        <button @click="logout">Logout</button>
    </div>
</template>

<script setup>
const name = ref('')
const getUser = async () => {
    const { session } = await useSession()
    name.value = session.value.user
}
getUser()

const logout = async () => {
    const { reset } = await useSession()
    reset()
    navigateTo('/login')
}

definePageMeta({
    middleware: async function (to, from) {
        const { session } = await useSession()
        const value = session.value.user
        if (!value) { 
            return navigateTo('/login');
        }
    }
});
</script>