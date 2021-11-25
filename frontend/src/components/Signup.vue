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
                            <v-form ref="signupForm" autocomplete="off">
                                <v-text-field
                                    label="nom"
                                    v-model="lastName"
                                    type="text"
                                    required
                                    :rules="nameRules"
                                    color="#005C68"
                                ></v-text-field>
                                <v-text-field
                                    label="prénom"
                                    v-model="firstName"
                                    type="text"
                                    required
                                    :rules="nameRules"
                                    color="#005C68"
                                ></v-text-field>
                                <v-text-field
                                    label="e-mail"
                                    v-model="email"
                                    type="email"
                                    required
                                    :rules="emailRules"
                                    color="#005C68"
                                ></v-text-field>
                                <v-text-field
                                    label="mot de passe"
                                    v-model="password"
                                    :append-icon="showPassword ? '$vuetify.icons.eyeon' : '$vuetify.icons.eyeoff'"
                                    @click:append="showPassword = !showPassword"
                                    :type="showPassword ? 'text' : 'password'"
                                    required
                                    :rules="passwordRules"
                                    color="#005C68"
                                ></v-text-field>
                            </v-form>
                            
                            <!-- <v-alert dense text type="error" v-if="errorMessage === true">
                                Form is invalid
                            </v-alert> -->
                            <!-- <div v-html="errorMessage" class="error" /> -->
                            
                        </v-card-text>
                        <v-card-actions class="justify-center">
                            <v-btn rounded depressed large min-width="200" color="#FFD7D7" class="mx-1 grey--text text--darken-2 font-weight-bold"
                                @click.prevent="signup" :loading="btnLoading"> <!-- add button loader while signun form is being submitted -->
                                S'INSCRIRE
                            </v-btn>
                            <v-snackbar v-model="snackbar" :timeout="2000">
                                <span>Votre inscription a bien été prise en compte ! 😉</span>
                            </v-snackbar>     
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout> 
        </v-container>
    </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
    data() {
        return {
            lastName: "",
            firstName: "",
            email: "",
            password: "",
            // error: null,
            nameRules: [
                v => !!v || 'Ce champ est obligatoire.',
                v => /^[a-zA-ZàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ ,.'-]+$/u.test(v) || 'Ce champ peut contenir les caractères alphabétiques qui sont utilisés dans la langue française et [ . ] [ \' ] [ - ].'
            ],
            emailRules: [
                v => !!v || 'Ce champ est obligatoire.',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Veuillez saisir une adresse e-mail valide.'
            ],
            passwordRules: [
                v => !!v || 'Ce champ est obligatoire.',
                v => /(^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64}$)/.test(v) || 'Un mot de passe doit être d\'une longueur minimale de 8 caractères comprenant au moins un majuscule, un miniscule, un chiffre et un caractère spécial.'
            ],
            showPassword: false,
            btnLoading: false,
            snackbar: false
        }
    },
    methods: {
        async signup() {
            // If sign-up form is valid
            if (this.$refs.signupForm.validate()) {
                // Start button loader 
                this.btnLoading = true;
                // Send the form inputs to API (axios-sequelize-mysql)           
                try {
                    const response = await AuthenticationService.signup({
                        lastName: this.lastName,
                        firstName: this.firstName,
                        email: this.email,
                        password: this.password
                    })
                    console.log(response.data)
                    // Stop button roader 
                    this.btnLoading = false;
                    // Pop-up snackbar
                    this.snackbar = true;
                    // change userLoggedIn into true
                    // return this.$store.state.userLoggedIn = true;
                    // Redirect to the main page after 2.2 seconds
                    setTimeout(function() {
                        window.location.href= "./";
                    }, 2200)
                }
                // Catch authentication error 
                catch (error) {
                    // Stop button roader 
                    this.btnLoading = false;
                    // Display authentication error message
                    // this.error = error.response.data.error
                }
                
            }
            // If sign-up form is not valid
            else {
                console.log('form is invalid')
                // this.errorMessage = true;
                // Display form error message
            }
        }
    }
}
</script>

<style scoped>
</style>