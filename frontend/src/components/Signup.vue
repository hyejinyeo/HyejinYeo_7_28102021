<template>
    <div class="signup">
        <v-container style="max-width: 900px">
            <v-layout row wrap align-center>
                <v-flex>
                    <v-card flat>
                        <v-card-title class=" flat dense dark">
                            <h1 class="text-h6 font-weight-regular">INSCRIPTION</h1>
                        </v-card-title>
                        <v-card-text class="font-weight-light">
                            <v-form ref="signupForm" autocomplete="off" aria-label="Formulaire d'inscription">
                                <v-text-field
                                    label="nom"
                                    v-model="lastName"
                                    type="text"
                                    required
                                    :rules="nameRules"
                                    color="secondary"
                                ></v-text-field>
                                <v-text-field
                                    label="prénom"
                                    v-model="firstName"
                                    type="text"
                                    required
                                    :rules="nameRules"
                                    color="secondary"
                                ></v-text-field>
                                <v-text-field
                                    label="e-mail"
                                    v-model="email"
                                    type="email"
                                    required
                                    :rules="emailRules"
                                    color="secondary"
                                ></v-text-field>
                                <v-text-field
                                    label="mot de passe"
                                    v-model="password"
                                    :append-icon="showPassword ? '$vuetify.icons.eyeon' : '$vuetify.icons.eyeoff'"
                                    @click:append="showPassword = !showPassword"
                                    :type="showPassword ? 'text' : 'password'"
                                    required
                                    :rules="passwordRules"
                                    color="secondary"
                                ></v-text-field>
                            </v-form>
                            <v-alert dense text type="error" v-if="errorMessage !== null" class="my-2">
                                {{ errorMessage }}
                            </v-alert> 
                        </v-card-text>
                        <v-card-actions class="justify-center">
                            <v-btn rounded depressed large min-width="200" color="primary" class="mx-1 grey--text text--darken-2 font-weight-bold"
                                type="button" aria-label="Bouton pour soumettre le formulaire d'inscription" @click.prevent="signup" :loading="btnLoading">
                                S'INSCRIRE
                            </v-btn>
                            <v-snackbar v-model="snackbar" :timeout="2000">
                                <span class="d-flex text-center">Votre inscription a bien été prise en compte ! 😉</span>
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
            nameRules: [
                v => !!v || 'Ce champ est obligatoire.',
                v => v.length <= 20 || 'Entre 1 et 20 caractères.',
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
            snackbar: false,
            errorMessage: null,
        }
    },
    methods: {
        async signup() {
            // Si le formulaire d'inscription est valide
            if (this.$refs.signupForm.validate()) {
                this.btnLoading = true;       
                try {
                    const response = await AuthenticationService.signup({
                        lastName: this.lastName,
                        firstName: this.firstName,
                        email: this.email,
                        password: this.password
                    })
                    this.snackbar = true;
                    this.$store.dispatch("logIn", response.data.token);
                    this.$store.dispatch("setUser", response.data.user);
                    this.btnLoading = false;
                    setTimeout(function() {
                        window.location.href= "./";
                    }, 1500)
                }
                catch (error) {
                    this.btnLoading = false;
                    this.errorMessage = error.response.data.error;
                }
            }
            // Si le formulaire d'inscription n'est pas valide
            else {
                this.errorMessage = 'Oops, votre saisie ne respecte pas le format du formulaire. Veuillez le renseigner 😅';
            }
        }
    }
}
</script>

<style>
</style>