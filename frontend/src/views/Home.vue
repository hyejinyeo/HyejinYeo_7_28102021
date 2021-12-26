<template>
    <div class="home">
        <v-container>
            <v-layout row justify-center>
                <v-flex xs12 md6 align-self-center>
                    <v-img
                        alt="Illustration_communication"
                        aria-hidden="true"
                        class="mb-5"
                        :src="require('../assets/illustration_communication.webp')"
                    />
                </v-flex>
                <v-flex xs12 md6 align-self-center justify-center>
                    <div v-if="userLoggedIn === false">
                        <p class="text-center mb-1">BIENVENUE SUR LE RÉSEAU SOCIAL DE GROUPOMANIA</p>
                        <h1 class="text-center teal--text text--darken-2 mb-4" aria-hidden="true">
                            Partagez vos idées.
                        </h1>
                        <!-- <p class="text-center d-none d-sm-flex mb-10">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos veniam enim eius consectetur sunt, explicabo expedita tempora! Consequuntur aperiam veniam quam quia facilis fugit nulla, vel qui hic ullam cumque.    
                        </p> -->
                        <div class="d-flex flex-wrap justify-center">
                            <v-btn rounded depressed large color="#FFD7D7" class="ma-2 grey--text text--darken-2 font-weight-bold" 
                                v-for="link in links" :key="link.text" router :to="link.route" :aria-label="link.ariaLabel" role="button"
                            >
                                {{ link.text }}
                            </v-btn>
                        </div>
                    </div>
                    <div v-if="userLoggedIn === true">
                        <h2 class="text-center teal--text text--darken-2 mb-4">
                            Bonjour, <br> {{ user.firstName }} !
                        </h2>
                    </div>
                    <!-- Floating Action Button "Contact" -->
                    <!-- <v-btn fab small color="#FFD7D7" right absolute class="mt-10" @click="contactDialog = !contactDialog">
                        <v-icon small color="grey darken-2">mdi-help</v-icon>
                    </v-btn>
                    <v-dialog v-model="contactDialog" max-width="500px">
                        <v-card>
                            <v-card-text>
                                Avez-vous rencontré des difficultés ? Nous restons à votre disposition. Veuillez nous contacter à <span>"admin@groupomania.com"</span>                 
                            </v-card-text>

                        </v-card>
                    </v-dialog> -->
                </v-flex>
            </v-layout>
        </v-container>  
    </div>
</template>

<script>
export default {
    name: 'Home',
    components: {
       
    },
    data() {
        return {
            links: [
                { text: 'SE CONNECTER', route: '/login', ariaLabel: 'Bouton pour se connecter' },
                { text: 'S\'INSCRIRE', route: '/signup', ariaLabel: 'Bouton pour s\'inscrire' }
            ],
            contactDialog: false,
        }
    },
    computed: {
        userLoggedIn() {
            // return false;
            return this.$store.state.userLoggedIn
        },
        user() {
            return this.$store.getters.user;
        },
    }
}
</script>

<style lang="css" scoped>
h1, h2 {
    font-size: 4em;
}
@media screen and (min-width: 616px) and (max-width: 1263px ) {
    h2 {
        font-size: 3.5em;
    } 
}
@media screen and (max-width: 615px) {
    h1, h2 {
        font-size: 9vw;
    } 
}
</style>