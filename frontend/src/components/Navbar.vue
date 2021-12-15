<template>
    <nav>
        <v-toolbar app flat color="grey lighten-4">
            <!-- LEFT: DROPDOWN MENU -->
            <v-app-bar-nav-icon @click="drawer = !drawer" role="navigation" aria-label="Dropdown menu pour navigation. Activé uniquement lorsqu'un utilisateur est connecté">
            </v-app-bar-nav-icon>
            <v-spacer class="d-lg-none"></v-spacer>

            <!-- LOGO -->
            <v-toolbar-title role="button" aria-label="Bouton vers la page d'accueil">
                <router-link to="/">
                    <v-img
                        alt="Groupomania Logo"
                        class="shrink mr-2"
                        contain
                        to="/"
                        :src="require('../assets/groupomania_logo_text.webp')"
                        width="200"
                        max-width="60vw"
                    />
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <!-- RIGHT: AVATAR + DROPDOWN MENU -->
            <v-menu rounded offset-y role="menu" aria-label="Dropdown menu pour utilisateur. Activé uniquement lorsqu'un utilisateur est connecté">
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <!-- userLoggedIn === false -->
                        <v-avatar v-if="userLoggedIn === false" size="36" color="grey lighten-2" aria-hidden="true">
                            <v-icon>$vuetify.icons.account</v-icon>
                        </v-avatar> 
                        <!-- userLoggedIn === true -->
                        <v-badge
                            v-if="userLoggedIn === true"
                            bordered bottom dot color="green"
                            offset-x="10" offset-y="10"
                            aria-hidden="true"
                        >
                            <v-avatar v-if="userLoggedIn === true" size="36" color="grey lighten-2" aria-hidden="true">
                                <span v-if="!user.photo" class="font-weight-black"> {{ userInitials }}</span>
                                <img v-if="user.photo" :src="user.photo" >
                            </v-avatar>
                        </v-badge>
                    </v-btn>
                </template>
                <v-card v-if="userLoggedIn === true">
                    <v-list-item-content class="justify-center" roll="listitem" aria-label="List items pour utilisateur dropdown menu">
                        <!-- ADMIN ONLY -->
                        <v-btn v-if="user.isAdmin === true" depressed text color="green" :to="`/admin`" role="Bouton vers la page d'admin" aria-label="Accessible uniquement pour l'utilisateur administrateur">
                            <v-icon left aria-hidden="true">$vuetify.icons.admin</v-icon>
                            <span>ADMIN</span>
                        </v-btn>
                        <!-- ALL USERS -->
                        <v-btn depressed text :to="`/account/${user.id}`" role="Bouton vers la page du profil"> 
                            <v-icon left aria-hidden="true">$vuetify.icons.profil</v-icon>
                            <span>MON PROFIL</span>
                        </v-btn>
                        <v-btn depressed text @click="logOut" role="Bouton pour se déconnecter">
                            <v-icon left aria-hidden="true">$vuetify.icons.logout</v-icon>
                            <span>DÉCONNEXION</span>
                        </v-btn>
                    </v-list-item-content>
                </v-card>
            </v-menu>

        </v-toolbar>

        <v-navigation-drawer temporary app v-model="drawer" v-if="userLoggedIn === true" roll="listitem" aria-label="List items pour navigation dropdown menu">
            <v-list>
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route" role="button" :aria-label="link.ariaLabel"> 
                    <v-list-item-action>
                        <v-icon aria-hidden="true">{{ link.icon }}</v-icon>
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
                { icon: '$vuetify.icons.accueil', text: 'ACCUEIL', route: '/', ariaLabel: 'Bouton vers la page d\'accueil' },
                { icon: '$vuetify.icons.feed', text: 'FIL D\'ACTUALITÉ', route: '/feed', ariaLabel: 'Bouton vers la page du fil d\'actualité' },
                { icon: '$vuetify.icons.chat', text: 'DISCUSSIONS', route: '/chat', ariaLabel: 'Bouton vers la page des discussions' }
            ]
        }
    },
    computed: {
        // Vuex: Get login status (true/false)
        userLoggedIn() {
            return this.$store.getters.userLoggedIn
        },
        user() {
            return this.$store.getters.user;
        },
        userInitials() {
            const user = this.$store.getters.user;
            const initials = user.firstName.substring(0, 1).toUpperCase() + user.lastName.substring(0, 1).toUpperCase();
            return initials;
        }
    },
    methods: {
        logOut() {
            this.$store.dispatch("logOut");
            window.location.href = "/";
        }
    }
}
</script>

<style lang="css" scoped>

</style>