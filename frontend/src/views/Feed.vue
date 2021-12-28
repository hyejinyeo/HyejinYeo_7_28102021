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
                                        <span class="caption">{{ new Date(post.createdAt).toLocaleDateString("fr-FR") + ' à ' + new Date(post.createdAt).toLocaleTimeString("fr-FR") }}</span>
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
                            <div class="mr-7" v-if="post.Likes.length > 0">
                                <v-menu width="150px" top :offset-y="offset" dark>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-badge overlap color="grey" :content="post.Likes.length">
                                            <v-btn icon v-bind="attrs" v-on="on">
                                                <v-icon small>$vuetify.icons.like</v-icon>
                                            </v-btn>
                                        </v-badge> 
                                    </template>
                                    <v-card>
                                        <v-card-text>
                                            <v-list v-for="like in post.Likes" :key="like.id" :like="like" class="my-0 py-0">
                                                <v-list-item-content class="caption my-0 py-0">
                                                    {{ like.User.firstName }} {{ like.User.lastName }}
                                                </v-list-item-content>
                                            </v-list>
                                        
                                        </v-card-text>
                                    </v-card>
                                </v-menu>
                            </div>
                            <div class="mr-7">
                                <v-badge overlap color="grey" content="1">
                                    <v-btn icon>
                                        <v-icon small @click="openCommentsContainer(post.id)">$vuetify.icons.comment</v-icon>
                                    </v-btn>
                                </v-badge>  
                            </div>
                        </div>
                        <!-- Users liked the post for hover box -->
                        <!-- <v-list v-for="like in post.Likes" :key="like.id" :like="like">
                            <v-list-item-content>
                                {{ like.User.firstName }} {{ like.User.lastName }}
                            </v-list-item-content>
                        </v-list> -->
                        
                        <!-- LIKE & COMMENT BUTTONS -->
                        <v-divider></v-divider>
                        <v-card-actions>  
                            <v-row>
                                <v-col cols="6" >
                                    <v-btn small text width="100%" :color="isLiked" @click="likePost(post.id)">
                                        <v-icon left>$vuetify.icons.like</v-icon>
                                        <span>J'aime</span>
                                    </v-btn>
                                </v-col>
                                <v-col cols="6" >
                                    <v-btn small text width="100%" @click="openCommentsContainerAndFocusInput(post.id)">
                                        <v-icon left>$vuetify.icons.comment</v-icon>
                                        <span>Commenter</span>
                                    </v-btn>
                                </v-col>
                            </v-row>   
                        </v-card-actions>
                        <v-divider></v-divider>
                        <!-- COMMENT DISPLAY & INPUT -->
                        <v-container :id="'commentsContainer'+post.id" style="display: none" class="commentsContainer">
                            <div class="closeCommentsBtn">
                                <v-btn small plain @click="closeCommentsContainer(post.id)">
                                    <v-icon>mdi-chevron-up</v-icon>
                                </v-btn>
                            </div>
                            <div class="comments">
                                <p class="moreComments grey--text text--darken-2 font-weight-bold">Voir les commentaires précédents</p>
                                <!-- <v-btn small plain>lire plus...</v-btn> -->

                                <div>
                                    other comments display here with v-for
                                </div>
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
                                            placeholder="Ecrivez un commentaire ..."
                                            type="text"
                                            class="mr-2"
                                            color="grey"
                                            :id="'commentInput'+post.id"
                                            :append-outer-icon="'mdi-send'"
                                            @click:append-outer="submitComment(post.id)"
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
    props: {
        post: {
            type: Object
        }
    },
    data() {
        return {
            // Temporary dummy data end
            // showComments: true,
            // commentInput: null,
        
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
        isLiked() {
            // const userId = this.$store.getters.user.id;
            return "";
            // let userLiked = this.post.Like.map((a) => a.userId);
            // if (userLiked.includes(userId)) {
            //     return "pink accent-2";
            // }
            // else {
            //     return "";
            // }
        }
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
    beforeDestroy() {
        this.$store.dispatch("resetPosts");
    },

    methods: {
        // Filter - The Net Ninja Vuetify #17
        // sortBy(prop){
        //     this.feeds.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
        // },
        modifyPost(id) {
            this.$router.push(`feed/${id}`)
        },
        deletePost(id) {
            this.$store.dispatch("deletePost", id);
            window.location.reload();
        },
        openLink(linkUrl) {
            window.open(linkUrl);
        },
        likePost(id) {
            // const userId = this.$store.getters.user.id;
            // console.log(userId);
            // const postId = id;
            // console.log(postId);

            // const formData = new FormData();
               
            // formData.append('user_id', userId);
            // formData.append('post_id', postId);

            // console.log(formData);

            this.$store.dispatch("likePost", id);



            // const userId = this.$store.getters.user.id;
            // console.log(userId);
            // const postId = id;
            // console.log(postId);

            // const formData = new FormData();
               
            // formData.append('user_id', userId);
            // formData.append('post_id', postId);

            // console.log(formData);

            // this.$store.dispatch("likePost", formData);
        },
        openCommentsContainer(id) {
            document.getElementById("commentsContainer"+id).style.display = "block";
        },
        openCommentsContainerAndFocusInput(id) {
            document.getElementById("commentsContainer"+id).style.display = "block";
            document.getElementById("commentInput"+id).focus();
        },
        closeCommentsContainer(id) {
            document.getElementById("commentsContainer"+id).style.display = "none";
        },
        submitComment(id) {
            console.log(id);
            // console.log(this.commentInput);
            const commentInput = document.getElementById("commentInput"+id).value;
            console.log(commentInput);
        },
        
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
.commentsContainer {
    position: relative;
}
.closeCommentsBtn {
    position: absolute;
    top: 10px;
    right: 1px;
}
.moreComments:hover {
    text-decoration: underline;
    cursor: pointer;
}

</style>