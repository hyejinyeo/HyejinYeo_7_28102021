<template>
    <div class="account">
        <h1 class="text-h6 mb-2">MON PROFIL</h1>
        <v-container style="max-width: 900px">
            <v-layout row wrap align-center>
                <v-flex>
                    <!-- User Profil -->
                    <v-card elevation="2" class="my-3 pa-1">
                        <!-- User Avatar + file uploader -->
                        <div class="text-center mt-2 pa-2">
                            <v-avatar size="220" color="grey lighten-3" class="my-4">
                                <v-img
                                    v-if="user.photo"
                                    :src="user.photo"
                                    alt="User profil photo"                                
                                />
                                <span v-if="!user.photo" class="text-center"><v-icon large>$vuetify.icons.addphoto</v-icon></span>
                            </v-avatar>
                            <v-file-input prepend-icon="$vuetify.icons.file" placeholder="Ajouter ou changer votre photo en cliquant ici"
                                accept="image/*" counter show-size v-model="userPhoto" @change="uploadImage">
                            </v-file-input>
                        </div>
                        <!-- User Info - champs du nom et prénom modifiables -->
                        <v-card-text>
                            <v-form ref="profilUpdateForm" autocomplete="off">
                                <v-text-field
                                    label="nom"
                                    v-model="lastName"
                                    type="text"
                                    required
                                    :rules="nameRules"
                                ></v-text-field>
                                <v-text-field
                                    label="prénom"
                                    v-model="firstName"
                                    type="text"
                                    required
                                    :rules="nameRules"
                                ></v-text-field>
                                <!-- Email readonly -->
                                <v-text-field
                                    label="e-mail"
                                    v-model="email"
                                    type="email"
                                    readonly
                                    aria-readonly="true"
                                    hint="* ce champ n'est pas modifiable"
                                    persistent-hint
                                ></v-text-field>
                                <!-- ***** Mot de passe modification a ajoute plus tard ***** -->
                                <!-- <v-text-field
                                    label="mot de passe"
                                    v-model="password"
                                    :append-icon="showPassword ? '$vuetify.icons.eyeon' : '$vuetify.icons.eyeoff'"
                                    @click:append="showPassword = !showPassword"
                                    :type="showPassword ? 'text' : 'password'"
                                    required
                                    :rules="passwordRules"
                                    @keyup="activateButton"
                                ></v-text-field> -->
                            </v-form>
                            <v-alert dense text type="error" v-if="errorMessage !== null" class="my-2 ">
                                {{ errorMessage }}
                            </v-alert> 
                        </v-card-text>
                        <v-card-actions class="d-flex justify-center">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn depressed rounded v-bind="attrs" v-on="on" class="mx-2 px-3 grey--text text--darken-2 font-weight-bold" color="#FFD7D7" @click="updateAccount">
                                            METTRE À JOUR
                                        </v-btn>
                                        <v-snackbar v-model="snackbar" :timeout="2000">
                                            <span>Vos modifications ont bien été prises en compte ! 😊</span>
                                        </v-snackbar>     
                                    </template>
                                    <span>Sauvegarder les modifications</span>
                                </v-tooltip>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn depressed rounded v-bind="attrs" v-on="on" class="mx-2" @click.stop="dialog = true" >
                                            <v-icon dense>
                                                $vuetify.icons.delete
                                            </v-icon>
                                        </v-btn>
                                        <v-dialog v-model="dialog" max-width="280">
                                            <v-card>
                                                <v-card-title class="text-h5"></v-card-title>
                                                <v-card-text>
                                                    ⚠️ Cette action est irréversible. Voulez-vous vraiment supprimer votre compte ?
                                                </v-card-text>
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn text @click="dialog = false">
                                                        NON
                                                    </v-btn>
                                                    <v-btn color="red" text @click="deleteAccount(user.id)">                                             
                                                        OUI
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                            </v-dialog>
                                    </template>
                                    <span>Supprimer mon compte</span>
                                </v-tooltip>
                            
                        </v-card-actions>                      
                        
                    </v-card>
                </v-flex>
            </v-layout> 
        </v-container>
    </div>
</template>

<script>
// import AuthenticationService from '@/services/AuthenticationService'

export default {
    data() {
        return {
            lastName: this.$store.getters.user.lastName,
            firstName: this.$store.getters.user.firstName,
            email: this.$store.getters.user.email,
            // password: 'mot de passe',
            // showPassword: false,
            userPhoto: this.$store.getters.user.photo,
            selectedFile: null,
            dialog: false,
            nameRules: [
                v => !!v || 'Ce champ est obligatoire.',
                v => v.length <= 20 || 'Entre 1 et 20 caractères.',
                v => /^[a-zA-ZàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ ,.'-]+$/u.test(v) || 'Ce champ peut contenir les caractères alphabétiques qui sont utilisés dans la langue française et [ . ] [ \' ] [ - ].'
            ],
            // emailRules: [
            //     v => !!v || 'Ce champ est obligatoire.',
            //     v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Veuillez saisir une adresse e-mail valide.'
            // ],
            // passwordRules: [
            //     v => !!v || 'Ce champ est obligatoire.',
            //     v => /(^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64}$)/.test(v) || 'Un mot de passe doit être d\'une longueur minimale de 8 caractères comprenant au moins un majuscule, un miniscule, un chiffre et un caractère spécial.'
            // ],
            snackbar: false,
            errorMessage: null,
        }
    },
    computed: {
        userLoggedIn() {
            return this.$store.getters.userLoggedIn
        },
        user() {
            return this.$store.getters.user;
        },
    },
    methods: {
        uploadImage(files) {
            this.selectedFile = files
            console.log(this.selectedFile)
        },
        updateAccount() {
            if (this.$refs.profilUpdateForm.validate()) {
                const formData = new FormData();
                formData.append('lastName', this.lastName);
                formData.append('firstName', this.firstName);
                if (this.selectedFile !== null) {
                    formData.append('image', this.selectedFile);
                }
                this.snackbar = true;
                this.$store.dispatch("updateAccount", formData);
                // this.$store.dispatch("getUserById", this.user.id);
                setTimeout(function() {
                    window.location.reload;
                    //window.location.href = "/";
                }, 1500)   
            }
            else {
                this.errorMessage = 'Oops, votre saisie ne respecte pas le format du formulaire. Veuillez le renseigner 😅';
                console.log('error level account vue');
            }
        },
        deleteAccount(id) {
            this.$store.dispatch("deleteAccount", id);
            this.$store.dispatch("logOut");
            setTimeout(() => {
                window.location.href = "/";
            }, 1500);
        }    
    }
}
</script>

<style lang="css" scoped>
</style>