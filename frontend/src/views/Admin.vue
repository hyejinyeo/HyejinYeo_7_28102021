<template>
    <div class="admin">
        <v-container style="max-width: 900px" v-if="user.isAdmin === false">
            You don't have access to this page
        </v-container>
        <v-container style="max-width: 900px" v-if="user.isAdmin === true">
            Admin user page
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // user: 
        }
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
    },
}
</script>

<style>

</style>