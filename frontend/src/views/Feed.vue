<template>
    <div class="feed" v-if="userLoggedIn === true">
        <h1 class="text-h6 mb-2">FIL D'ACTUALITÉ</h1>
        <!-- COMPOSANT POUR CRÉER UNE NOUVELLE PUBLICATION -->
        <Newpost />
        <!-- ZONE D'AFFICHAGE DES PUBLICATIONS -->
        <v-container style="max-width: 900px" class="my-3">
            <v-row>
                <v-flex> 
                    <!-- POST -->
                    <v-card elevation="2" class="mx-auto my-7" v-for="post in posts" :key="post.id" :post="post" :id="post.id"> 
                        <!-- Entête -->
                        <div class="d-flex row align-center mx-1 pt-2">
                            <!-- Auteur / Date -->
                            <div class="d-flex row align-center pl-4">
                                <v-avatar size="40" color="grey lighten-2">
                                    <v-icon v-if="post.User == null">$vuetify.icons.account</v-icon>
                                    <img v-if="post.User !== null && post.User.photo" :src="post.User.photo" alt="Photo de l'auteur">
                                    <span v-if="post.User !== null && !post.User.photo" class="font-weight-bold subtitle-2" title="Initiales de l'auteur">{{ post.User.firstName.substring(0, 1).toUpperCase() }}{{ post.User.lastName.substring(0, 1).toUpperCase() }} </span>
                                </v-avatar>
                                <v-card-subtitle>
                                    <span v-if="post.User == null" class="font-weight-bold" title="Utilisateur supprimé">Utilisateur Anonyme</span>
                                    <span v-if="post.User !== null" class="font-weight-bold" title="Prénom et nom de l'auteur">{{ post.User.firstName }} {{ post.User.lastName }}</span>                 
                                    <br> 
                                    <span class="caption" title="Date et l'heure">{{ new Date(post.createdAt).toLocaleDateString("fr-FR") + ' à ' + new Date(post.createdAt).toLocaleTimeString("fr-FR") }}</span>
                                </v-card-subtitle>    
                            </div>
                            <!-- Boutons : Visible uniquement pour l'auteur ou les administrateurs-->
                            <div v-if="$store.state.user.id == post.user_id || $store.state.user.isAdmin == true">
                                <v-menu rounded offset-y role="menu" aria-label="Dropdown menu pour modifier la publication. Author or Admin only">
                                    <template v-slot:activator="{ on }">
                                        <v-btn icon v-on="on" type="button" aria-pressed="true">
                                            <v-icon>$vuetify.icons.more</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-card v-if="userLoggedIn === true">
                                        <v-list-item-content class="justify-center" role="listitem" aria-label="List items pour pub modification ou suppression">
                                            <v-btn depressed text color="grey darken-1" @click="modifyPost(post.id)" type="button" aria-label="Bouton pour modifier la publication"> 
                                                <v-icon left aria-hidden="true">$vuetify.icons.modifyPost</v-icon>
                                                <span>Modifier</span>
                                            </v-btn>
                                            <v-btn depressed text color="grey darken-1" @click="deletePost(post.id)" type="button" aria-label="Bouton pour supprimer la publication">
                                                <v-icon left aria-hidden="true">$vuetify.icons.deletePost</v-icon>
                                                <span>Supprimer</span>
                                            </v-btn>
                                        </v-list-item-content>
                                    </v-card>
                                </v-menu>
                            </div>
                        </div>
                        <!-- Corp -->
                        <!-- Image / Giphy -->
                        <div class="mt-3 py-2" v-if="post.imageUrl !== null">
                            <img class="image" :src="post.imageUrl" alt="Image de la publication"/>
                        </div>
                        <div class="mt-3 py-2" v-if="post.giphyUrl !== null">
                            <img class="image" :src="post.giphyUrl" alt="Gif de la publication"/>
                        </div>
                        <!-- Lien / Message -->
                        <v-card-text class="mb-3">
                            <div v-if="post.link !== null" class="mb-2">
                                <span class="link d-flex align-center">
                                    <v-icon small class="mr-2" aria-hidden="true">$vuetify.icons.selectedlink</v-icon>
                                    <span class="linkText" @click="openLink(post.link)" title="Lien qui ouvre la page sur un nouvel onglet">{{ post.link }}</span>
                                </span>            
                            </div>
                            <div v-if="post.message !== null" class="mt-3 py-2">{{ post.message }}</div>
                        </v-card-text>
                        <!-- Compteur de likes et de commentaires -->
                        <div class="d-flex mb-2">
                            <v-spacer></v-spacer>
                            <div class="mr-7" v-if="post.Likes.length > 0">
                                <v-menu width="150px" top :offset-y="offset" dark>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-badge overlap color="grey" :content="post.Likes.length">
                                            <v-btn icon v-bind="attrs" v-on="on" type="button" aria-label="Bouton qui affiche les utilisateurs qui ont aimé la publication">
                                                <v-icon small aria-hidden="true">$vuetify.icons.like</v-icon>
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
                            <div class="mr-7" v-if="post.Comments.length > 0">
                                <v-badge overlap color="grey" :content="post.Comments.length">
                                    <v-btn icon type="button" aria-label="Bouton qui ouvre le bloc d'affichage des commentaires" @click="openCommentsContainer(post.id)">
                                        <v-icon small aria-hidden="true">$vuetify.icons.comment</v-icon>
                                    </v-btn>
                                </v-badge>  
                            </div>
                        </div>
                        <!-- Boutons : Like & Commentaire -->
                        <v-divider></v-divider>
                        <v-card-actions>  
                            <v-row>
                                <v-col cols="6">
                                    <v-btn small text width="100%" :class="likeButtonColor(post.id)" @click="likePost(post.id)"
                                        type="button" aria-label="Bouton pour soumettre un like ou l'annuler"
                                    >
                                        <v-icon left aria-hidden="true">$vuetify.icons.like</v-icon>
                                        <span class="caption">J'aime</span>
                                    </v-btn>
                                </v-col>
                                <v-col cols="6">
                                    <v-btn small text width="100%" @click="openCommentsContainerAndFocusInput(post.id)"
                                        type="button" aria-label="Bouton pour ouvrir le bloc d'affichage des commentaires et pour faire le focus sur le champ de saisie"
                                    >
                                        <v-icon left aria-hidden="true">$vuetify.icons.comment</v-icon>
                                        <span class="caption">Commenter</span>
                                    </v-btn>
                                </v-col>
                            </v-row>   
                        </v-card-actions>
                        <v-divider></v-divider>
                        <!-- Commentaire -->
                        <v-container :id="'commentsContainer'+post.id" style="display: none" class="commentsContainer">
                            <div class="closeCommentsBtn">
                                <v-btn small plain @click="closeCommentsContainer(post.id)"
                                    type="button" aria-label="Bouton pour fermer le bloc d'affichage des commentaires"
                                >
                                    <v-icon aria-hidden="true">$vuetify.icons.up</v-icon>
                                </v-btn>
                            </div>
                            <!-- Commentaire : Zone d'affichage -->
                            <div class="comments mt-8">
                                <div v-for="comment in post.Comments" :key="comment.id" :comment="comment" class="d-flex align-top mb-3">
                                    <v-avatar size="34" color="grey lighten-2" aria-hidden="true">
                                        <v-icon v-if="comment.User == null">$vuetify.icons.account</v-icon>
                                        <img v-if="comment.User !== null && comment.User.photo" :src="comment.User.photo" alt="Photo de l'auteur du commentaire">
                                        <span v-if="comment.User !== null && !comment.User.photo" class="font-weight-bold subtitle-2" title="Initiales de l'auteur du commentaire">{{ comment.User.firstName.substring(0, 1).toUpperCase() }}{{ comment.User.lastName.substring(0, 1).toUpperCase() }} </span>
                                    </v-avatar>
                                    <v-spacer></v-spacer>
                                    <div class="grey lighten-4 rounded ml-2 pa-2 commentBox">
                                        <v-btn icon v-if="$store.state.user.id == comment.user_id || $store.state.user.isAdmin == true" class="commentDeleteButton" @click="deleteComment(comment.id)"
                                            type="button" aria-label="Bouton pour supprimer le commentaire"
                                        >
                                            <v-icon small aria-hidden="true">$vuetify.icons.delete</v-icon>
                                        </v-btn>
                                        <p class="caption font-weight-bold mb-0"> 
                                            <span v-if="comment.User == null">Utilisateur Anonyme</span>
                                            <span v-if="comment.User !== null">{{ comment.User.firstName }} {{ comment.User.lastName }}</span>
                                        </p>
                                        <p class="caption mb-0"> {{ comment.message }} </p>   
                                    </div>
                                </div>
                            </div>
                            <!-- Commentaire : Zone d'écriture -->
                            <div class="newComment d-flex align-top row pl-3 mt-4">
                                <div class="d-flex fullWidth">
                                    <v-avatar size="34" color="grey lighten-2" aria-hidden="true">
                                        <span v-if="!user.photo" class="font-weight-black" title="Initiales de l'utilisateur"> {{ userInitials }}</span>
                                        <img v-if="user.photo" :src="user.photo" alt="Photo de l'utilisateur">
                                    </v-avatar>                      
                                    <v-form aria-label="Formulaire d'un commentaire">
                                        <v-text-field
                                            filled rounded dense
                                            placeholder="Ecrivez un commentaire ..."
                                            type="text"
                                            class="mx-2"
                                            color="grey"
                                            required
                                            v-model="commentInput"
                                            :id="'commentInput'+post.id"
                                            :append-outer-icon="'$vuetify.icons.send'"
                                            @click:append-outer.prevent="submitComment(post.id)"
                                            aria-label="Saisie d'un commentaire"
                                        ></v-text-field>
                                    </v-form>
                                </div>
                            </div>
                            <v-alert dense text type="error" v-if="errorMessage !== null" >
                                {{ errorMessage }}
                            </v-alert> 
                        </v-container>
                    </v-card>
                </v-flex>
            </v-row>
            <!-- Bouton pour faire défiler vers le haut -->
            <v-btn fixed bottom right color="grey lighten-4" class="mb-2 mr-2" @click="scrollToTop"
                type="button" aria-label="Bouton pour faire défiler vers le haut"
            >
                <v-icon size="30" aria-hidden="true">$vuetify.icons.up</v-icon>
            </v-btn>
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
            commentInput: null,
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
        userInitials() {
            const user = this.$store.getters.user;
            const initials = user.firstName.substring(0, 1).toUpperCase() + user.lastName.substring(0, 1).toUpperCase();
            return initials;
        },
        posts() {
            return this.$store.getters.posts;
        }
    },
    beforeMount() {
        this.$store.dispatch("getAllPosts");
        this.likeButtonColor();
    },
    beforeDestroy() {
        this.$store.dispatch("resetPosts");
    },
    methods: {
        likeButtonColor(id) {
            const userId = this.$store.getters.user.id;
            const postId = id;
            let findPost = this.posts.find(post => parseInt(post.id) === parseInt(postId));
            let mapLikes = findPost.Likes.map(like => like.user_id);
            if (mapLikes.includes(userId)) {
                return "red lighten-5";
            } else {
                return "";
            }
        },
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
            this.$store.dispatch("likePost", id);
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
            console.log(this.commentInput);
            if (this.commentInput == null) {
                this.errorMessage = 'Uh-oh 😮 Il semble que vous n\'avez rien écrit.';
            } else {
                console.log('comment contains string')
                this.$store.dispatch("commentPost", {
                    postId: id,
                    message: this.commentInput
                });
                this.commentInput = null;
                this.errorMessage = null; 
            }     
        },
        deleteComment(id) {
            console.log('commentid: ' + id)
            this.$store.dispatch("deleteComment", id);
        },
        scrollToTop() {
            window.scrollTo(0,0)
        }
    },
}
</script>

<style lang="css" scoped>
img {
    width: 100%;
}
.linkText {
    font-weight: bold;
    font-style: italic;
    text-decoration: underline;
    cursor: pointer;
    width: 80%;
}
.commentsContainer {
    position: relative;
}
.comments {
    width: 100%;
}
.closeCommentsBtn {
    position: absolute;
    top: 10px;
    right: 1px;
}
.commentBox {
    position: relative;
    width: 100%;
}
.commentDeleteButton {
    position: absolute;
    top: 1px;
    right: 1px;
}
.newComment { 
    width: auto;
}
.v-form, .fullWidth {
    width: 100%;   
}
</style>