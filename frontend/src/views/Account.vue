<template>
    <div class="account">
        <h1 class="text-h6 mb-2">MON PROFIL</h1>
        <v-container style="max-width: 900px">
            <v-layout row wrap align-center>
                <v-flex>
                    <!-- PROFIL DE L'UTILISATEUR -->
                    <v-card elevation="2" class="my-3 pa-1">
                        <!-- Photo + file input -->
                        <div class="text-center mt-2 pa-2">
                            <v-avatar size="220" color="grey lighten-3" class="my-4">
                                <v-img
                                    v-if="user.photo"
                                    :src="user.photo"
                                    alt="Photo de l'utilisateur"                                
                                />
                                <span v-if="!user.photo" class="text-center"><v-icon large>$vuetify.icons.addphoto</v-icon></span>
                            </v-avatar>
                            <v-file-input prepend-icon="$vuetify.icons.file" placeholder="Ajouter ou changer votre photo en cliquant ici" color="secondary" aria-label="Téléchargeur de fichiers"
                                accept="image/*" counter show-size v-model="userPhoto" @change="uploadImage">
                            </v-file-input>
                        </div>
                        <!-- Formulaire de profil -->
                        <v-card-text>
                            <v-form ref="profilUpdateForm" autocomplete="off" aria-label="Profil de l'utilisateur">
                                <!-- Nom et prénom : modifiables -->
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
                                <!-- Email : readonly -->
                                <v-text-field
                                    label="e-mail"
                                    v-model="email"
                                    type="email"
                                    readonly
                                    aria-readonly="true"
                                    hint="* ce champ n'est pas modifiable"
                                    persistent-hint
                                    color="secondary"
                                ></v-text-field>
                            </v-form>
                            <v-alert dense text type="error" v-if="errorMessage !== null" class="my-2 ">
                                {{ errorMessage }}
                            </v-alert> 
                        </v-card-text>
                        <!-- Boutons -->
                        <v-card-actions class="d-flex justify-center">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn depressed rounded class="mx-2 px-3 grey--text text--darken-2 font-weight-bold" color="primary" 
                                        v-bind="attrs" v-on="on" @click="updateAccount"
                                        type="button" aria-label="Bouton pour sauvegarder les modifications">
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
                                    <v-btn depressed rounded v-bind="attrs" v-on="on" class="mx-2 grey--text text--darken-2 font-weight-bold"  
                                        type="button" aria-label="Bouton pour supprimer un compte" @click.stop="dialog = true">
                                        <v-icon dense aria-hidden="true">
                                            $vuetify.icons.delete
                                        </v-icon>
                                    </v-btn>
                                    <v-dialog v-model="dialog" max-width="280">
                                        <v-card>
                                            <v-card-title class="text-h5"></v-card-title>
                                            <v-card-text>
                                                Cette action est irréversible. Voulez-vous vraiment supprimer votre compte ?
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn text @click="dialog = false" type="button" aria-label="Bouton pour annuler la suppression d'un compte">
                                                    NON
                                                </v-btn>
                                                <v-btn color="red" text @click="deleteAccount(user.id)" type="button" aria-label="Bouton pour confirmer la suppression d'un compte">                                             
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
export default {
    data() {
        return {
            lastName: this.$store.getters.user.lastName,
            firstName: this.$store.getters.user.firstName,
            email: this.$store.getters.user.email,
            userPhoto: this.$store.getters.user.photo,
            selectedFile: null,
            dialog: false,
            nameRules: [
                v => !!v || 'Ce champ est obligatoire.',
                v => v.length <= 20 || 'Entre 1 et 20 caractères.',
                v => /^[a-zA-ZàâäéèêëîïôöùûüÿçæœA-ZÀÂÄÉÈÊËÎÏÔÖÙÛÜŸÇÆ ,.'-]+$/u.test(v) || 'Ce champ peut contenir les caractères alphabétiques qui sont utilisés dans la langue française et [ . ] [ \' ] [ - ].'
            ],
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
                this.$store.dispatch("updateAccount", formData);
                this.$store.dispatch("getAccount");
                this.snackbar = true;
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

<style>
</style>