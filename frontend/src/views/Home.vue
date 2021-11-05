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
                <v-flex xs12 md4 align-self-center>
                    <div v-if="userLogIn === false">
                        <span>BIENVENUE SUR LE RÉSEAU SOCIAL DE GROUPOMANIA</span>
                        <h1 class="teal--text text--darken-2">
                            Partagez vos idées.
                        </h1>
                        <p class="d-none d-sm-flex">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita magnam soluta aut blanditiis error, dolor debitis atque. Quo sunt non ipsam nobis nihil! Voluptatum a, quas assumenda ipsa natus nisi! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam iure unde sequi ea natus commodi ad at veniam. Rerum modi temporibus voluptatem sapiente pariatur eveniet ratione velit harum sit. Vitae.
                        </p><br>
                        <v-btn rounded depressed large min-width="200" color="#FFD7D7" class="mx-auto grey--text text--darken-2 font-weight-bold" 
                            v-for="link in links" :key="link.text" router :to="link.route"
                        >
                            {{ link.text }}
                        </v-btn>
                    </div>
                    <div v-if="userLogIn === true">
                        <h2>
                            WELCOME BACK HYEJIN
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
        userLogIn() {
            return false;
        }
    }
}
</script>

<style lang="css" scoped>
h1 {
    font-size: 4em;
}
</style>