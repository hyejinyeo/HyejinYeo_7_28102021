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
                        </v-card-text>
                        <v-card-actions class="justify-center d-flex flex-wrap">
                            <v-btn rounded depressed large min-width="200" color="#FFD7D7" class="ma-1 grey--text text--darken-2 font-weight-bold" 
                                @click="login" :loading="btnLoading">
                                SE CONNECTER
                            </v-btn> 
                            <!-- TO ADD : 
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
            btnLoading: false
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

                    // Update data in Vuex Store
                    this.$store.dispatch("logIn", response.data.token);
                    // this.$store.dispatch("setUser", response.data.user);
                    // this.$store.dispatch("getUserById", response.data.user.id);


                    this.btnLoading = false;

                    let router = this.$router
                    // Redirect to the main page
                    setTimeout(function() {
                        router.push('/feed');
                    }, 2200)
                    
                }
                // Catch authentication error 
                catch (error) {
                    this.btnLoading = false;
                    console.log(error)
                }
                
            }
            // Login form is not valid
            else {
                console.log('form is invalid')
        
                // this.errorMessage = true;
                // Display form error message
            }        
        }
    }
    // computed: 
}
</script>

<style>
/* DARK GREEN #005C68 */
</style>