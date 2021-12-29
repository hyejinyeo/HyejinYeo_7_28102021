<template>
    <div class="admin">
        <h1 class="text-h6 mb-2">ADMIN</h1>
        <!-- USER --> 
        <v-container style="max-width: 900px" v-if="user.isAdmin == false">
            <p class="text-center"> Désolé, vous n'avez pas l'autorisation d'accéder à cette page 😎 </p>
        </v-container>
        <!-- ADMIN ONLY --> 
        <v-container style="max-width: 900px" v-if="user.isAdmin == true">
            <div>
                <h2 class="title mb-8 highlight">GESTION DES UTILISATEURS</h2>
                    <!-- Admin -->
                    <v-divider class="mb-3"></v-divider>
                    <h3 class="mt-2 mb-4">administrateurs</h3>
                    <div v-for="user in users" :key="user.id" :user="user" :id="user.id">
                        <div v-if="user.isAdmin == true" class="ma-2 pa-1 d-flex align-center">
                            <v-avatar size="36" color="grey lighten-2" class="mr-2" aria-hidden="true">
                                <span v-if="!user.photo" class="font-weight-black"> {{ user.firstName.substring(0, 1).toUpperCase() }}{{ user.lastName.substring(0, 1).toUpperCase() }}</span>
                                <img v-if="user.photo" :src="user.photo" >
                            </v-avatar>
                            <span class="subtitle-2 "> {{ user.firstName }} {{ user.lastName.toUpperCase() }} </span>
                            <v-spacer></v-spacer>
                            <div class="editButtons">
                                <v-btn icon depressed class="mx-2" @click="updateAdmin(user.id)">
                                    <v-icon size="20">$vuetify.icons.adminremove</v-icon>
                                </v-btn>
                                <v-btn icon depressed @click="deleteUser(user.id)">
                                    <v-icon size="20">$vuetify.icons.delete</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </div>
                    <v-divider class="mt-8 mb-3"></v-divider>
                    <!-- Utilisateurs -->
                    <h3 class="mt-2 mb-4">non-administrateurs</h3>
                    <div v-for="user in users" :key="user.id" :user="user" :id="user.id">
                        <div v-if="user.isAdmin == false" class="ma-2 pa-1 d-flex align-center">
                            <v-avatar size="36" color="grey lighten-2" class="mr-2" aria-hidden="true">
                                <span v-if="!user.photo" class="font-weight-black"> {{ user.firstName.substring(0, 1).toUpperCase() }}{{ user.lastName.substring(0, 1).toUpperCase() }}</span>
                                <img v-if="user.photo" :src="user.photo" >
                            </v-avatar>                       
                            <span class="subtitle-2 "> {{ user.firstName }} {{ user.lastName.toUpperCase() }} </span>
                            <v-spacer></v-spacer>
                            <div class="editButtons">
                                <v-btn icon depressed class="mx-2" @click="updateAdmin(user.id)">
                                    <v-icon size="20">$vuetify.icons.adminplus</v-icon>
                                </v-btn>
                                <v-btn icon depressed @click="deleteUser(user.id)">
                                    <v-icon size="20">$vuetify.icons.delete</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </div>
                    <v-divider class="mt-8 mb-3"></v-divider>   
            </div>
            <v-alert dense text type="error" v-if="errorMessage !== null" >
                {{ errorMessage }}
            </v-alert> 
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
           errorMessage: null,
        }
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
        users() {
            return this.$store.getters.users;
        }
    },
    beforeMount() {
        this.$store.dispatch("getAllUsers");
    },
    beforeDestroy() {
        this.$store.dispatch("resetUsers");
    },
    methods: {
        updateAdmin(id) {
            const admin = this.$store.getters.user.isAdmin;
            if (admin == true) {
                this.$store.dispatch("updateAdmin", { userId: id });
            } else {
                this.errorMessage = 'Vous n\'avez pas le droit.';
            }
        },
        deleteUser(id) {
            this.$store.dispatch("deleteUser", { userId: id });
        },
    }
}
</script>

<style lang="css" scoped>
.highlight {
    width: 275px;
    background: linear-gradient(
        to bottom, 
        transparent 50%, 
        #FFD7D7 50%
    );
}

</style>