<template>
    <div class="admin">
        <h1 class="text-h6 mb-2">ADMIN</h1>
        <!-- USER --> 
        <v-container style="max-width: 900px" v-if="user.isAdmin === false">
            <p class="text-center"> Désolé, vous n'avez pas l'autorisation d'accéder à cette page 😎 </p>
        </v-container>
        <!-- ADMIN ONLY --> 
        <v-container style="max-width: 900px" v-if="user.isAdmin === true">
            <div>
                <h2 class="title">Utilisateurs</h2>
                <v-card flat>
                    <v-card-title>
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                        ></v-text-field>
                    </v-card-title>
                    <v-data-table
                    :headers="headers"
                    :items="desserts"
                    :search="search"
                    ></v-data-table>
                </v-card>
            </div>
            <div>
                <h2 class="title">Publications</h2>
                <v-card flat>
                    <v-card-title>
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                        ></v-text-field>
                    </v-card-title>
                    <v-data-table
                    :headers="headers"
                    :items="desserts"
                    :search="search"
                    ></v-data-table>
                </v-card>
            </div>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // user: 
        }
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
    },
}
</script>

<style>

</style>