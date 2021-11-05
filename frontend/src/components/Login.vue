<template>
    <div class="login">
        <v-container>
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
                    <v-card flat>
                    <v-card-title class=" flat dense dark">
                        <h2 class="font-weight-regular titre">CONNEXION</h2>
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
                        <v-btn rounded depressed large min-width="200" color="#FFD7D7" class="mx-1 grey--text text--darken-2 font-weight-bold">
                            SE CONNECTER
                        </v-btn>
                    </v-card-actions>
                </v-card>
                </v-flex>

            </v-layout>
            
        </v-container>
        <v-container>
            <v-layout row>
                



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