<template>
    <div class="signup">
        <v-container style="max-width: 900px">
            <v-layout row wrap align-center>
                <v-flex>
                    <v-card flat>
                        <v-card-title class=" flat dense dark">
                            <h4 class="font-weight-regular">INSCRIPTION</h4>
                        </v-card-title>
                        <v-card-text class="font-weight-light">
                            <v-form >
                                <v-text-field
                                    label="nom"
                                    type="text"
                                    color="#005C68"
                                ></v-text-field>
                                <v-text-field
                                    label="prenom"
                                    type="text"
                                    color="#005C68"
                                ></v-text-field>
                                <v-text-field
                                    label="e-mail"
                                    type="email"
                                    color="#005C68"
                                ></v-text-field>
                                <v-text-field
                                    label="mot de passe"
                                    :append-icon="showPassword ? '$vuetify.icons.eyeon' : '$vuetify.icons.eyeoff'"
                                    @click:append="showPassword = !showPassword"
                                    :type="showPassword ? 'text' : 'password'"
                                    color="#005C68"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions class="justify-center">
                            <v-btn rounded depressed large min-width="200" color="#FFD7D7" class="mx-1 grey--text text--darken-2 font-weight-bold">
                                S'INSCRIRE
                            </v-btn>     
                        </v-card-actions>
                    </v-card>
                   
                </v-flex>
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

</style>