<template>
    <nav>
        <v-toolbar app>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase grey--text">
                <span class="font-weight-light">HELLO</span>
                <span>WORLD</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn>
                <v-icon left>mdi-login</v-icon>
                <span>Sign In</span>
            </v-btn>
        </v-toolbar>

        <v-navigation-drawer app v-model="drawer" color="indigo lighten-4">
            <p class="font-weight-bold">DASHBOARD</p>
            <v-icon>mdi-home-outline</v-icon> HOME <br>
            <v-icon>mdi-bell-outline</v-icon> FEED <br>
            <v-icon>mdi-comment-text-outline</v-icon> CHAT <br><br>
            <p class="font-weight-bold">ACCOUNT</p>
            <v-icon>mdi-account-circle-outline</v-icon> SETTING <br>
            <v-icon>mdi-logout</v-icon> LOG OUT
        </v-navigation-drawer>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            drawer: false
        }
    }
}
</script>

<style>

</style>