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
                                    label="prenom"
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
                            <v-alert dense text type="success">
                                I'm a dense alert with the <strong>text</strong> prop and a <strong>type</strong> of success
                            </v-alert>
                            <v-alert dense text type="error">
                                I'm a dense alert with the <strong>text</strong> prop and a <strong>type</strong> of error
                            </v-alert>
                            
                        </v-card-text>
                        <v-card-actions class="justify-center">
                            <v-btn rounded depressed large min-width="200" color="#FFD7D7" class="mx-1 grey--text text--darken-2 font-weight-bold"
                                @click="signup" :loading="btnLoading"> <!-- add button loader while signun form is being submitted -->
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
export default {
    data() {
        return {
            lastName: "",
            firstName: "",
            email: "",
            password: "",
            nameRules: [
                v => v.length >= 3 || 'Minimum length is 3 characters'
            ],
            emailRules: [],
            passwordRules: [],
            showPassword: false,
            btnLoading: false,
            snackbar: false
        }
    },
    methods: {
        signup() {
            // if the form is valid, submit
            if (this.$refs.signupForm.validate()) {
                this.btnLoading = true;
                console.log('form is valid');
                console.log(this.lastName, this.firstName, this.email, this.password)
                const hello = {
                    lastName: this.lastName,
                    firstName: this.firstName,
                    email: this.email,
                    password: this.password
                }
                // add new user into the database
                
                console.log(hello)
                console.log('added to the database');
                
                // stop button roader
                this.btnLoading = false;
                // popup snackbar
                this.snackbar = true;
                // redirect to the home.vue

            } 
            // if the form is not valid, prevent the submission and show error message
            else {
                console.log('form is invalid')
            }
            
        }
    }
}
</script>

<style>

</style>