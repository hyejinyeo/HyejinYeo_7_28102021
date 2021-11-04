<template>
    <div class="home">
        <!-- <h1 class="text-h6 mb-2">ACCUEIL</h1> -->
        <v-container>
            <v-layout row justify-center>
                <v-flex xs12 md8 align-self-center>
                    <v-img
                        alt="Illustration"
                        class="mb-5"
                        :src="require('../assets/5267.jpg')"
                    />
                </v-flex>
                <v-flex xs12 md4>
                    <h1>
                        Welcome to the internal network service of Groupomania
                    </h1>
                    <p>
                        Log in if you are already a member or Sign up
                    </p>
                    <v-btn rounded depressed large min-width="200" dark color="#005C68" class="mx-1">SE CONNECTER</v-btn>
                    <v-btn rounded depressed large min-width="200" class="mx-1">S'INSCRIRE</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
        
        
        <!-- <v-container>
            <v-layout row justify-center>
                <v-flex xs12 md6 align-self-center>
                    <v-img
                        alt="Groupomania Logo"
                        contain
                        :src="require('../assets/icon.png')"
                        width="300px"
                    />
                </v-flex>
                <v-flex xs12 md6>
                    <h2>Bienvenue !</h2>           
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, soluta. Laborum illum tempora error possimus, optio adipisci quaerat corporis quasi! Et deserunt distinctio molestiae dignissimos. Voluptatem quibusdam cum at cupiditate.</p>
                </v-flex>

            </v-layout>
            
        </v-container> -->
        
    </div>
</template>

<script>
export default {
    name: 'Home',

    components: {
       
    }
}
</script>

