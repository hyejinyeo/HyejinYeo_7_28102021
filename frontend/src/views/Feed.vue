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
                    <v-card elevation="2" class="mx-auto my-7" v-for="post in posts" :key="post.id" :post="post" :id="post.id"> 
                        <!-- FEED HEADER -->
                        <div class="d-flex row align-center mx-1 pt-2">
                            <!-- AUTHOR / DATE -->
                            <div class="d-flex row align-center pl-4">
                                <div>
                                    <v-avatar size="40">
                                        <img :src="post.User.photo">
                                    </v-avatar>
                                </div>
                                <div>
                                    <v-card-subtitle>
                                        <span class="font-weight-bold">{{ post.User.firstName }} {{ post.User.lastName }}</span><br> 
                                        <span class="caption">{{ post.createdAt }}</span> <!-- npm date-fns to better format the date -->
                                    </v-card-subtitle>
                                </div>
                            </div>
                            <!-- EDIT BUTTON : visible only for the author-->
                            <div v-if="$store.state.user.id == post.User.id || $store.state.user.isAdmin == true">
                                <v-menu rounded offset-y role="menu" aria-label="Dropdown menu pour modifier la publication. Author or Admin only">
                                    <template v-slot:activator="{ on }">
                                        <v-btn icon v-on="on">
                                            <v-icon>$vuetify.icons.more</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-card v-if="userLoggedIn === true">
                                        <v-list-item-content class="justify-center" roll="listitem" aria-label="List items pour pub modification ou suppression">
                                            <v-btn depressed text color="grey darken-1" @click="modifyPost(post.id)" role="Bouton pour modifier la publication"> 
                                                <v-icon left aria-hidden="true">$vuetify.icons.modifyPost</v-icon>
                                                <span>Modifier</span>
                                            </v-btn>
                                            <v-btn depressed text color="grey darken-1" @click="deletePost(post.id)" role="Bouton pour supprimer la publication">
                                                <v-icon left aria-hidden="true">$vuetify.icons.deletePost</v-icon>
                                                <span>Supprimer</span>
                                            </v-btn>
                                        </v-list-item-content>
                                    </v-card>
                                </v-menu>
                            </div>
                        </div>
                        <!-- FEED BODY -->
                        <!-- IMAGE -->
                        <div class="mt-3 py-2" v-if="post.imageUrl !== null">
                            <img class="image" :src="post.imageUrl" />
                        </div>
                        <div class="mt-3 py-2" v-if="post.giphyUrl !== null">
                            <img class="image" :src="post.giphyUrl" />
                        </div>
                        <!-- TEXT -->
                        <v-card-text class="mb-3">
                            <div v-if="post.link !== null" class="mb-2">
                                <span class="link d-flex align-center">
                                    <v-icon small class="mr-2">$vuetify.icons.selectedlink</v-icon>
                                    <span class="linkText" @click="openLink(post.link)">{{ post.link }}</span>
                                </span>            
                            </div>
                            <div v-if="post.message !== null" class="mt-3 py-2">{{ post.message }}</div>
                        </v-card-text>
                        <!-- LIKE & COMMENT COUNTER -->
                        <div class="d-flex mb-2">
                            <v-spacer></v-spacer>
                            <!-- <v-btn small icon fab> -->
                            <div class="mr-7">
                                <v-badge overlap color="grey" content="100">
                                <v-icon small class="pr-3">$vuetify.icons.like</v-icon>
                                </v-badge> 
                            </div>
                            <!-- </v-btn> -->
                            <!-- <v-btn small icon fab> -->
                            <div class="mr-7">
                                <v-badge overlap color="grey" content="24">
                                <v-icon small class="pr-3">$vuetify.icons.comment</v-icon>
                                </v-badge>  
                            </div>
                            <!-- </v-btn> -->
                        </div>
                        <!-- LIKE & COMMENT BUTTONS -->
                        <v-divider></v-divider>
                        <v-card-actions>  
                            <v-row>
                                <v-col cols="6" >
                                    <v-btn small text width="100%">
                                        <v-icon left>$vuetify.icons.like</v-icon>
                                        <span>J'aime</span>
                                    </v-btn>
                                </v-col>
                                <v-col cols="6" >
                                    <v-btn small text width="100%" id="showCommentBtn" @click="showComments = !showComments">
                                        <v-icon left>$vuetify.icons.comment</v-icon>
                                        <span>Commenter</span>
                                    </v-btn>
                                </v-col>
                            </v-row>   
                        </v-card-actions>
                        <v-divider></v-divider>
                        <!-- COMMENT DISPLAY & INPUT -->
                        <v-container v-if="showComments == true">
                            <div class="comments--v-for-to-be-added">
                                other comments display here
                            </div>
                            <div class="newComment d-flex align-top row pl-2 mt-3">
                                <div class="mr-2">
                                    <v-avatar size="40">
                                        <span v-if="!user.photo" class="font-weight-black"> {{ userInitials }}</span>
                                        <img v-if="user.photo" :src="user.photo" >
                                    </v-avatar>
                                </div>
                                <v-flex grow>
                                    <v-form>
                                        <v-text-field
                                            filled rounded dense autogrow
                                            placeholder="Ecrivez un commentaire et appuyez sur 'entrée' pour le publier."
                                            type="text"
                                            class="mr-2"
                                        ></v-text-field>
                                    </v-form>
                                </v-flex>
                                
                            </div>
                        </v-container>
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
            // Temporary dummy data end
            showComments: false,
        
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
        // 
        posts() {
            return this.$store.getters.posts;
        },
                // posts() {
        //     return this.$store.getters.posts;
        // },
        // Show feeds that are created by certain author
        // myFeeds() {
        //     return this.feeds.filter(feed => {
        //         return feed.author === 'Hyejin Yeo'
        //     })
        // }

    },
    beforeMount() {
        this.$store.dispatch("getAllPosts");
    },

    methods: {
        // Filter - The Net Ninja Vuetify #17
        // sortBy(prop){
        //     this.feeds.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
        // },
        modifyPost(id) {
            this.$router.push(`feed/${id}`)
        },
        deletePost() {

        },
        openLink(linkUrl) {
            window.open(linkUrl);
        }
    },


}

/* Comment */
</script>

<style lang="css" scoped>
img {
    width: 100%;
    /* max-height: 1000px; */
}
.linkText {
    font-weight: bold;
    font-style: italic;
    text-decoration: underline;
    cursor: pointer;
}

.red {
    background-color: red;
}
</style>