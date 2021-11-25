<template>
    <div class="home">
        <v-container>
            <v-layout row justify-center>
                <v-flex xs12 md8 align-self-center>
                    <v-img
                        alt="Illustration_communication"
                        class="mb-5"
                        :src="require('../assets/illustration_communication.webp')"
                    />
                </v-flex>
                <v-flex xs12 md4 align-self-center justify-center>
                    <div v-if="userLoggedIn === false">
                        <p class="text-center mb-1">BIENVENUE SUR LE RÉSEAU SOCIAL DE GROUPOMANIA</p>
                        <h1 class="text-center teal--text text--darken-2 mb-4">
                            Partagez vos idées.
                        </h1>
                        <!-- <p class="text-center d-none d-sm-flex mb-10">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos veniam enim eius consectetur sunt, explicabo expedita tempora! Consequuntur aperiam veniam quam quia facilis fugit nulla, vel qui hic ullam cumque.    
                        </p> -->
                        <div class="d-flex flex-wrap justify-center">
                            <v-btn rounded depressed large color="#FFD7D7" class="ma-2 grey--text text--darken-2 font-weight-bold" 
                                v-for="link in links" :key="link.text" router :to="link.route"
                            >
                                {{ link.text }}
                            </v-btn>
                        </div>
                    </div>
                    <div v-if="userLoggedIn === true">
                        <h2 class="text-center teal--text text--darken-2 mb-4">
                            Bonjour, <br> Hyejin !
                        </h2>
                    </div>
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
                { text: 'SE CONNECTER', route: '/login' },
                { text: 'S\'INSCRIRE', route: '/signup' }
            ]
        }
    },
    computed: {
        userLoggedIn() {
            // return false;
            return this.$store.state.userLoggedIn
        },
        // userName() {
        //     return this.$store.state.userLoggedIn
        // }
    }
}
</script>

<style lang="css" scoped>
h1, h2 {
    font-size: 4em;
}
@media screen and (max-width: 615px) {
    h1, h2 {
        font-size: 9vw;
    }
    
}
</style>