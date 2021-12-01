<template>
    <div class="account">
        <h1 class="text-h6 mb-2">MON PROFIL</h1>
        <!-- <v-container v-if="userLoggedIn === true">
            <v-card elevation="2">
                <v-avatar>
                    <img 
                        v-if="user.photo"
                        :src="user.photo"
                        alt="User's profil photo"
                    />
                    <v-icon v-if="!user.photo">mdi-image</v-icon> 
                </v-avatar>
                
            </v-card>



        </v-container> -->
        <v-container style="max-width: 900px">
            <v-layout row wrap align-center>
                <!-- <v-flex xs12 md6>
                    <v-img
                        v-if="user.photo"
                        :src="user.photo"
                        alt="User's profil photo"
                        width="260px"
                        max-height="30vh"
                        class="mx-auto my-2"
                        background-color="pink"
                    />
                    <div 
                        v-if="!user.photo"
                        width="260px"
                        max-height="30vh"
                    >
                        No photo
                    </div>
                    
                </v-flex> -->
                <!-- <v-flex xs12 md6> -->
                <v-flex>
                    <v-card elevation="2" class="pa-1">
                        <div class="text-center">
                        <v-btn depressed fab class="mx-auto my-3" width="220" height="220">
                            <v-img
                                v-if="user.photo"
                                :src="user.photo"
                                alt="User's profil photo"                                
                            />
                            <p v-if="!user.photo" class="text-center"><v-icon large>$vuetify.icons.addphoto</v-icon></p>
                        </v-btn>
                        </div>
                        <v-card-text>
                            <v-layout row>
                                <v-col cols="12" md="4">
                                    <v-card-title> Nom </v-card-title>
                                    <v-card-subtitle> {{ user.lastName}} </v-card-subtitle>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-card-title> Prénom </v-card-title>
                                    <v-card-subtitle> {{ user.firstName }} </v-card-subtitle>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-card-title> E-mail </v-card-title>
                                    <v-card-subtitle> {{ user.email }} </v-card-subtitle>
                                </v-col>
                            </v-layout>
                            <!-- Nom: {{ user.lastName}} <br>
                            Prenom: {{ user.firstName }} <br>
                            Email: {{ user.email }} -->

                        </v-card-text>
                        <!-- <div v-html="errorMessage" class="error" /> -->
                        <v-card-actions>
                            <v-btn depressed color="primary" class="my-2">MODIFIER</v-btn>
                            <v-btn depressed color="error" class="my-2">Supprimer mon compte</v-btn>
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
        
    }
}
</script>

<style lang="css" scoped>
.user-photo {
    width: 250px;
    border-radius: 50%;
    background-color: lightgray;
}

</style>