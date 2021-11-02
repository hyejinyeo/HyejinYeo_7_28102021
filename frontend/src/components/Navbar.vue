<template>
    <nav>
        <v-toolbar app flat color="grey lighten-4">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-spacer class="d-lg-none"></v-spacer>
            <v-toolbar-title>
                <router-link to="/">
                    <v-img
                        alt="Groupomania Logo"
                        class="shrink mr-2"
                        contain
                        to="/"
                        :src="require('../assets/groupomania_logo_text.png')"
                        width="210"
                    />
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-avatar size="36" color="grey lighten-2">
                <v-icon>mdi-account-circle-outline</v-icon>
            </v-avatar>
        </v-toolbar>

        <v-navigation-drawer temporary app v-model="drawer" color="grey lighten-3">
            <v-list>
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route"> 
                    <v-list-item-action>
                        <v-icon>{{ link.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{ link.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            drawer: false,
            links: [
                { icon: 'mdi-home-outline', text: 'ACCUEIL', route: '/' },
                { icon: 'mdi-bell-outline', text: 'FIL D\'ACTUALITÉ', route: '/feed' },
                { icon: 'mdi-comment-text-outline', text: 'DISCUSSIONS', route: '/chat' }
            ]
        }
    }
}
</script>

<style>

</style>