<template>
    <div class="feed" v-if="userLoggedIn === true">
        <h1 class="text-h6 mb-2">FIL D'ACTUALITÉ</h1>
        <!-- WRITING AREA -->
        <Newpost />
        <!-- DISPLAY AREA -->
        <v-container style="max-width: 900px" class="my-3">
            <!-- FILTERS -->
            <!-- <v-row align="center" class="my-3">
                <v-icon color="grey" class="mr-2 d-none d-sm-flex">mdi-filter</v-icon>  
                <v-btn small depressed color="grey lighten-3 mr-1" @click="sortBy('date')"> 
                    <v-icon left small>mdi-calendar</v-icon>
                    <span class="caption text-uppercase">DATE</span>
                </v-btn>
                <v-btn small depressed color="grey lighten-3 mr-1" @click="sortBy('author')"> 
                    <v-icon left small>mdi-account-circle</v-icon>
                    <span class="caption text-uppercase">AUTHOR</span>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn small depressed fab class="mx-2" color="#FFD7D7">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-row> -->
            <!-- FEEDS -->
            <v-row>
                <v-flex> 
                    <v-card 
                        elevation="2"
                        class="mx-auto my-6"
                        v-for="feed in feeds" :key="feed.title"
                    >
                        <!-- <v-card-title>
                            {{ feed.title }}
                        </v-card-title> -->

                        <!-- FEED HEADER -->
                        <div class="d-flex row align-center mx-1 pt-2">
                            <!-- AUTHOR / DATE -->
                            <div class="d-flex row align-center pl-4">
                                <div>
                                    <v-avatar size="40">
                                        <img src="../assets/icon.png">
                                    </v-avatar>
                                </div>
                                <div>
                                    <v-card-subtitle>
                                        <span class="font-weight-bold">{{ feed.author }}</span><br> 
                                        <span class="caption">{{ feed.date }}</span> <!-- npm date-fns to better format the date -->
                                    </v-card-subtitle>
                                </div>
                            </div>
                            <!-- EDIT BUTTON : visible only for the author-->
                            <div>
                                <v-icon>mdi-dots-vertical</v-icon>
                            </div>
                        </div>

                        <!-- FEED BODY -->
                        <!-- IMAGE -->
                        <v-responsive class="py-2">
                            image goes here
                        </v-responsive>
                        <!-- TEXT -->
                        <v-card-text>
                            {{ feed.content }}
                        </v-card-text>
                        
                        <!-- LIKE / COMMENT -->
                        <v-card-actions>
                            <v-row>
                                <v-col cols="1">
                                    <v-btn small text icon class="ma-2">
                                        <v-icon color="grey lighten-2">mdi-thumb-up</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="11">
                                    <v-form>
                                        <v-text-field
                                            filled rounded dense
                                            placeholder="Ecrivez un commentaire..."
                                            type="text"
                                            class="mr-2"
                                        ></v-text-field>
                                    </v-form>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import Newpost from '../components/NewPost'


export default {
    components: {
        Newpost
    },
    data() {
        return {
            // Temporary dummy data start
            posts: [],
            feeds: [
                { title: 'Hello World 3', author: 'OpenClassrooms', date: '10-11-2021:13:32:50', content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos veniam enim eius consectetur sunt, explicabo expedita tempora! Consequuntur aperiam veniam quam quia facilis fugit nulla, vel qui hic ullam cumque.'}
            ]
            // Temporary dummy data end
        }
    },
    methods: {
        // Filter - The Net Ninja Vuetify #17
        sortBy(prop){
            this.feeds.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
        }
    },
    computed: {
        userLoggedIn() {
            return this.$store.getters.userLoggedIn
        },
        user() {
            return this.$store.getters.user;
        },
        userInitials() {
            const user = this.$store.getters.user;
            const initials = user.firstName.substring(0, 1).toUpperCase() + user.lastName.substring(0, 1).toUpperCase();
            return initials;
        },
        // Show feeds that are created by certain author
        myFeeds() {
            return this.feeds.filter(feed => {
                return feed.author === 'Hyejin Yeo'
            })
        }
    }


}
// Comment
/* Comment */
</script>

<style>
/* Comment */
</style>