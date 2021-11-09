<template>
    <div class="login">
        <v-container style="max-width: 1000px">
            <v-layout row wrap align-center>
                <v-flex xs12 md6>
                    <v-img
                        alt="Groupomania Logo"
                        contain
                        :src="require('../assets/icon.png')"
                        width="300px"
                        class="mx-auto"
                    />
                </v-flex>
                <v-flex xs12 md6>
                    <v-card flat>
                    <v-card-title class=" flat dense dark">
                        <h3 class="font-weight-regular">CONNEXION</h3>
                    </v-card-title>
                    <v-card-text class="font-weight-light">
                        <v-form >
                            <v-text-field
                                label="e-mail"
                                prepend-icon="$vuetify.icons.account"
                                type="email"
                                color="#005C68"
                            ></v-text-field>
                            <v-text-field
                                label="mot de passe"
                                prepend-icon="$vuetify.icons.lock"
                                :append-icon="showPassword ? '$vuetify.icons.eyeon' : '$vuetify.icons.eyeoff'"
                                @click:append="showPassword = !showPassword"
                                :type="showPassword ? 'text' : 'password'"
                                color="#005C68"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="justify-center">
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
    data() {
        return {
            showPassword: false
        }
    }
}
</script>

<style>
/* DARK GREEN #005C68 */
</style>