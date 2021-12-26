<template>
    <div class="chat" v-if="userLoggedIn === true">
        <h1 class="text-h6 mb-2">DISCUSSIONS</h1>
        <v-container style="max-width: 900px">
            <v-img
                alt="Illustration_warning"
                class="mb-5"
                :src="require('../assets/illustration_warning.webp')"
                max-width="1000px"
                
            />
            <p class="title text-center teal--text text--darken-2">Désolé, cette page n'est pas disponible. <br> Le service est en cours de développement.</p>
        </v-container>         
   
    </div>
</template>

<script>
export default {
    computed: {
        userLoggedIn() {
            return this.$store.getters.userLoggedIn
        },
    }
}
</script>

<style>
</style>