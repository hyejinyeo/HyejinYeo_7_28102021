 <template>
    <nav>
        <v-toolbar app flat color="grey lighten-4">
            <!-- GAUCHE: DROPDOWN MENU POUR NAVIGATION (Ligne #66-77) -->
            <v-app-bar-nav-icon @click="drawer = !drawer" role="navigation" aria-label="Dropdown menu pour navigation. Activé uniquement lorsqu'un utilisateur est connecté" aria-pressed="true">
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
                    <div class="hidden">groupomania</div>
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- DROITE : AVATAR + DROPDOWN MENU POUR UTILISATEUR -->
            <v-menu rounded offset-y role="menu" aria-label="Dropdown menu pour utilisateur. Activé uniquement lorsqu'un utilisateur est connecté" aria-pressed="true">
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on" type="button" aria-label="Bouton qui affiche les éléments de menu liés à l'utilisateur">
                        <!-- userLoggedIn === false -->
                        <v-avatar v-if="userLoggedIn === false" size="36" color="grey lighten-2" aria-hidden="true">
                            <v-icon aria-hidden="true">$vuetify.icons.account</v-icon>
                        </v-avatar> 
                        <!-- userLoggedIn === true -->
                        <v-badge
                            v-if="userLoggedIn === true"
                            bordered bottom dot color="green"
                            offset-x="10" offset-y="10"
                            aria-hidden="true"
                        >
                            <v-avatar v-if="userLoggedIn === true" size="36" color="grey lighten-2" aria-hidden="true">
                                <span v-if="!user.photo" class="font-weight-black" title="Initiales de l'utilisateur"> {{ userInitials }}</span>
                                <img v-if="user.photo" :src="user.photo" alt="Photo de l'utilisateur">
                            </v-avatar>
                        </v-badge>
                    </v-btn>
                </template>
                <v-card v-if="userLoggedIn === true">
                    <v-list-item-content class="justify-center" role="menuitem" aria-label="List items pour utilisateur dropdown menu">
                        <!-- Administrateur uniquement -->
                        <v-btn v-if="user.isAdmin === true" depressed text color="green" :to="`/admin`" 
                            type="Button" aria-label="Bouton vers la page d'administrateur"
                        >
                            <v-icon left aria-hidden="true">$vuetify.icons.admin</v-icon>
                            <span>ADMIN</span>
                        </v-btn>
                        <!-- Tous les utilisateurs -->
                        <v-btn depressed text :to="`/account/${user.id}`" 
                            type="Button" aria-label="Bouton vers la page du profil"
                        > 
                            <v-icon left aria-hidden="true">$vuetify.icons.profil</v-icon>
                            <span>MON PROFIL</span>
                        </v-btn>
                        <v-btn depressed text @click="logOut" 
                            type="Button" aria-label="Bouton pour se déconnecter"
                        >
                            <v-icon left aria-hidden="true">$vuetify.icons.logout</v-icon>
                            <span>DÉCONNEXION</span>
                        </v-btn>
                    </v-list-item-content>
                </v-card>
            </v-menu>
        </v-toolbar>
        <!-- Navigation menu -->
        <v-navigation-drawer temporary app v-model="drawer" v-if="userLoggedIn === true" role="menu" aria-label="List items pour navigation dropdown menu">
            <v-list>
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route" role="menuitem" :aria-label="link.ariaLabel"> 
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

<style scoped>
.hidden {
    display: none;
}
</style>
