<template>
    <div class="login">
        <v-container style="max-width: 900px">
            <v-layout row wrap align-center>
                <v-flex xs12 md6>
                    <v-img
                        alt="Groupomania Logo"
                        contain
                        :src="require('../assets/icon.png')"
                        width="260px"
                        max-height="30vh"
                        class="mx-auto"
                    />
                </v-flex>
                <v-flex xs12 md6>
                    <v-card flat>
                        <v-card-title class=" flat dense dark">
                            <h4 class="font-weight-regular">CONNEXION</h4>
                        </v-card-title>
                        <v-card-text class="font-weight-light">
                            <v-form ref="loginForm" autocomplete="off">
                                <v-text-field
                                    label="e-mail"
                                    v-model="email"
                                    prepend-icon="$vuetify.icons.account"
                                    type="email"
                                    required
                                    :rules="emailRules"
                                    color="#005C68"
                                ></v-text-field>
                                <v-text-field
                                    label="mot de passe"
                                    v-model="password"
                                    prepend-icon="$vuetify.icons.lock"
                                    :append-icon="showPassword ? '$vuetify.icons.eyeon' : '$vuetify.icons.eyeoff'"
                                    @click:append="showPassword = !showPassword"
                                    :type="showPassword ? 'text' : 'password'"
                                    required
                                    :rules="passwordRules"
                                    color="#005C68"
                                ></v-text-field>
                            </v-form>
                            <v-alert dense text type="error" v-if="errorMessage !== null" class="my-2 ">
                                {{ errorMessage }}
                            </v-alert> 
                        </v-card-text>
                        <v-card-actions class="justify-center d-flex flex-wrap">
                            <v-btn rounded depressed large min-width="200" color="#FFD7D7" class="ma-1 grey--text text--darken-2 font-weight-bold" 
                                @click="login" :loading="btnLoading">
                                SE CONNECTER
                            </v-btn> 
                            <!-- TO ADD : Find password
                            <v-btn rounded depressed small min-width="200" min-height="45" color="white" class="ma-1 grey--text text--darken-2">
                                Vous avez oublié votre mot de passe ?
                            </v-btn>
                            -->         
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
            email: "",
            password: "",
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
            errorMessage: null,
        }
    },
    methods: {
        async login() {
            // Login form is valid
            if (this.$refs.loginForm.validate()) {
                this.btnLoading = true;
                try {
                    const response = await AuthenticationService.login({
                        email: this.email,
                        password: this.password
                    })
                    console.log(response.data)
                    // Store token in Local Storage for Auto Login

                    // Update data in Vuex Store
                    this.$store.dispatch("logIn", response.data.token);
                    this.$store.dispatch("setUser", response.data.user);
                    this.$store.dispatch("getUserById", response.data.user.id);

                    this.btnLoading = false;

                    // Redirect to the main page
                    // let router = this.$router
                    // router.push('/');

                    // Redirect to the main page + reload the entire page (to update Navbar component)
                    window.location.href = "/";
                    
                }
                // Catch authentication error 
                catch (error) {
                    this.btnLoading = false;
                    this.errorMessage = error.response.data.error;

                }
                
            }
            // Login form is not valid
            else {
                this.errorMessage = 'Oops, votre saisie ne respecte pas le format du formulaire. Veuillez le renseigner 😅';
            }        
        }
    }
    // computed: 
}
</script>

<style>
/* DARK GREEN #005C68 */
</style>