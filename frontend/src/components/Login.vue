<template>
    <div class="login-signup">
        <v-container>
            <v-layout row>
                <v-card flat>
                    <v-card-title class=" flat dense dark">
                        <h1 class="font-weight-regular titre">CONNEXION</h1>
                    </v-card-title>
                    <v-card-text class="font-weight-light">
                        <v-form >
                            <v-text-field
                                label="email"
                                type="email"
                                color="#005C68"
                            ></v-text-field>
                            <v-text-field
                                label="mot de passe"
                                type="password"
                                color="#005C68"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn rounded large min-width="200" dark color="#005C68">
                            SE CONNECTER
                        </v-btn>
                    </v-card-actions>
                    <v-card-actions>
                        <v-btn depressed plain class="font-weight-regular"> 
                            Vous n'avez pas d'un compte ? S'inscrire en cliquant ici :)
                            <!-- "SingUp.vue" on click -->
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>