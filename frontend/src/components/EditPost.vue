<template>
    <div class="editpost">
        <h1 class="text-h6 mb-2">MODIFIER LA PUBLICATION</h1>
        <v-container style="max-width: 900px" class="mt-5">
            <v-row>
                <v-flex>
                    <v-card elevation="2" class="mx-auto my-7">
                        <v-card-text>
                            <v-form aria-label="Formulaire de publication">
                            <!-- La date et l'heure -->
                                <div class="mb-5 text-right">
                                    <span>Publiée le {{ new Date(this.$store.getters.post.createdAt).toLocaleDateString("fr-FR") + ' à ' + new Date(this.$store.getters.post.createdAt).toLocaleTimeString("fr-FR") + 'h'}}  || </span>
                                    <span>Modifiée le {{ new Date(this.$store.getters.post.updatedAt).toLocaleDateString("fr-FR") + ' à ' + new Date(this.$store.getters.post.updatedAt).toLocaleTimeString("fr-FR") }} </span>  
                                </div>
                            <!-- Boutons : Image / Giphy / Lien -->
                                <v-btn depressed rounded class="mr-2" :disabled="imageButtonDisabled" 
                                    type="button" aria-label="Bouton pour télécharger une image depuis l'appareil de l'utilisateur" @click="openImageDialog"
                                >
                                    <v-icon color="grey darken-2" aria-hidden="true">
                                        $vuetify.icons.image
                                    </v-icon>
                                </v-btn>
                                <input id="imageDialog" type="file" accept="image/*" hidden @change="uploadNewImage" />
                                <v-btn depressed rounded class="mr-2" :disabled="gifButtonDisabled" 
                                    type="button" aria-label="Bouton pour rechercher un gif à partir de Giphy" @click="gifDialog = true"
                                >
                                    <v-icon color="grey darken-2" aria-hidden="true">
                                        $vuetify.icons.gif
                                    </v-icon>
                                </v-btn>
                                <v-dialog v-model="gifDialog" max-width="700" class="pa-2">
                                    <v-card>
                                        <v-card-title>
                                            <v-text-field v-model="searchInput" prepend-icon="$vuetify.icons.search" label="Search" single-line hide-details color="secondary" @input="gifInput">
                                            </v-text-field>
                                        </v-card-title>
                                        <v-card-text>
                                            <img class="gif" v-for="gif in gifs" :key="gif.id" :gif="gif" :src="gif.images.original.url" @click="selectNewGif" alt="Résultats de recherche de gif" />
                                        </v-card-text>
                                    </v-card>
                                </v-dialog>
                                <v-btn depressed rounded class="mr-2" :disabled="linkButtonDisabled" 
                                    type="button" aria-label="Bouton pour ajouter un lien vers une page web" @click="linkDialog = true"
                                >
                                    <v-icon color="grey darken-2" aria-hidden="true">
                                        $vuetify.icons.link
                                    </v-icon>
                                </v-btn>
                                <v-dialog v-model="linkDialog" max-width="700" class="pa-2">
                                    <v-card>
                                        <v-card-text>
                                            <input type="url" v-model="linkUrl" placeholder="https://example.com" pattern="https://.*" class="mt-4 linkInputArea">
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="teal darken-2" text 
                                                type="button" aria-label="Bouton pour soumettre un lien" @click="submitNewLink"
                                            >
                                                AJOUTER
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            <!-- Zone d'affichage -->
                                <!-- Image originale -->
                                <div class="imageContainer mt-3" v-if="this.$store.getters.post.imageUrl !== null">
                                    <img class="image" :src="this.$store.getters.post.imageUrl" /> 
                                    <v-btn fab icon small depressed color="red lighten-2" class="image--deleteButton" 
                                        type="button" aria-label="Bouton pour supprimer l'image originale" @click="deletePostImage"
                                    >
                                        <v-icon aria-hidden="true">$vuetify.icons.close</v-icon>
                                    </v-btn>
                                </div>
                                <!-- Nouvelle image -->
                                <div class="imageContainer mt-3">
                                    <img id="output" class="image" /> 
                                    <v-btn fab icon small depressed color="red lighten-2" class="image--deleteButton" v-if="newImage == true" 
                                        type="button" aria-label="Bouton pour supprimer la nouvelle image" @click="deleteNewImage"
                                    >
                                        <v-icon aria-hidden="true">$vuetify.icons.close</v-icon>
                                    </v-btn>
                                </div>
                                <!-- Gif original -->
                                <div class="gifContainer mt-3" v-if="this.$store.getters.post.giphyUrl !== null">
                                    <img class="image" :src="this.$store.getters.post.giphyUrl" /> 
                                    <v-btn fab icon small depressed color="red lighten-2" class="image--deleteButton" 
                                        type="button" aria-label="Bouton pour supprimer le gif original" @click="deletePostGif"
                                    >
                                        <v-icon aria-hidden="true">$vuetify.icons.close</v-icon>
                                    </v-btn>
                                </div>
                                <!-- Nouveau gif -->
                                <div class="gifContainer mt-3" v-if="newGifFile !== null">
                                    <img class="image" :src="newGifFile" /> 
                                    <v-btn fab icon small depressed color="red lighten-2" class="image--deleteButton" 
                                        type="button" aria-label="Bouton pour supprimer le nouveau gif" @click="deleteNewGif"
                                    >
                                        <v-icon aria-hidden="true">$vuetify.icons.close</v-icon>
                                    </v-btn>
                                </div>
                                <!-- Lien original -->
                                <div class="linkContainer mt-3" v-if="this.$store.getters.post.link !== null">
                                    <span class="link d-flex align-center">
                                        <v-icon small class="mr-2" aria-hidden="true">$vuetify.icons.selectedlink</v-icon>
                                        <span class="linkText">{{ this.$store.getters.post.link }}</span>
                                    </span>
                                    <v-btn fab icon small depressed color="red lighten-2" class="link--deleteButton" 
                                        type="button" aria-label="Bouton pour supprimer le lien original" @click="deletePostLink"
                                    >
                                        <v-icon aria-hidden="true">$vuetify.icons.close</v-icon>
                                    </v-btn>
                                </div>
                                <!-- Nouveau lien -->
                                <div class="linkContainer mt-3" v-if="linkOutput !== null">
                                    <span class="link d-flex align-center">
                                        <v-icon small class="mr-2" aria-hidden="true">$vuetify.icons.selectedlink</v-icon>
                                        <span class="linkText">{{ linkOutput }}</span>
                                    </span>
                                    <v-btn fab icon small depressed color="red lighten-2" v-if="linkUrl !== null" class="link--deleteButton" 
                                        type="button" aria-label="Bouton pour supprimer le nouveau lien" @click="deleteNewLink"
                                    >
                                        <v-icon aria-hidden="true">$vuetify.icons.close</v-icon>
                                    </v-btn>
                                </div>
                                <!-- Message d'origine -->
                                <div class="messageContainer mt-3 grey lighten-3 pa-3 rounded" v-if="this.$store.getters.post.message !== null">
                                    <span>{{ this.$store.getters.post.message }}</span>
                                    <v-btn fab icon small depressed color="red lighten-2" class="message--deleteButton" 
                                        type="button" aria-label="Bouton pour supprimer le message d'origine" @click="deletePostMessage"
                                    >
                                        <v-icon aria-hidden="true">$vuetify.icons.close</v-icon>
                                    </v-btn>
                                </div>
                                <!-- Nouveau message -->
                                <v-textarea label="Message" filled color="secondary" class="mt-3" ref="newMessageInput" autocomplete="off" :rules="messageRules" v-if="textarea == true" v-model="newMessage"> 
                                </v-textarea>
                            </v-form>
                            <v-alert dense text type="error" v-if="errorMessage !== null" class="my-2 ">
                                {{ errorMessage }}
                            </v-alert> 
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="teal darken-2" text block :loading="btnLoading"
                                type="button" aria-label="Bouton pour soumettre les modifications" @click.prevent="updatePost" 
                            >
                                Modifier
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-row>            
        </v-container>
    </div>
</template>

<script>
export default {
    props: {
        gif: Object,
    },
    data() {
        return {       
            gifDialog: false,
            linkDialog: false,
            postImageDeleted: false,   
            newImage: false,
            newImageFile: null,
            searchInput: null,
            timeout: null,
            gifs: [],
            postGifDeleted: false,
            newGifFile: null,
            postLinkDeleted: false,
            linkUrl: null,
            linkOutput: null,
            postMessageDeleted: false,
            newMessage: null,
            messageRules: [
                v => !!v || 'Ce champ est obligatoire.',
            ],
            imageButtonDisabled: false,
            gifButtonDisabled: false,
            linkButtonDisabled: false,
            textarea: false,
            btnLoading: false,
            errorMessage: null,               
        }
    },
    created() {
        let id = this.$route.params.id;
        this.$store.dispatch("getPostById", id);
    },
    beforeDestroy() {
        this.$store.dispatch("resetPost");
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
        post() {
            return this.$store.getters.post;
        }
    },
    methods: {
        deletePostImage() {
            this.$store.getters.post.imageUrl = null;
            this.postImageDeleted = true;
            this.gifButtonDisabled = false;
            this.imageButtonDisabled = false;
        },
        deletePostGif() {
            this.$store.getters.post.giphyUrl = null;
            this.postGifDeleted =  true;
            this.gifButtonDisabled = false;
            this.imageButtonDisabled = false;
        },
        deletePostLink() {
            this.$store.getters.post.link = null;
            this.postLinkDeleted = true;
            this.linkButtonDisabled = false;
        },
        deletePostMessage() {
            this.$store.getters.post.message = null;
            this.postMessageDeleted = true;
            this.textarea = true;
        },
        openImageDialog() {
            document.getElementById('imageDialog').click();
        },
        uploadNewImage(event) {
            this.$store.getters.post.imageUrl = null;
            this.$store.getters.post.giphyUrl = null;
            this.postImageDeleted = true;
            this.postGifDeleted =  true;
            let output = document.getElementById('output');
            output.src = URL.createObjectURL(event.target.files[0]);
            this.newImage = true;
            this.newImageFile = event.target.files[0];
            this.gifButtonDisabled = true;
        },
        deleteNewImage() {
            let output = document.getElementById('output');
            output.src = '';
            this.newImage = false;
            this.newImageFile = null;
            this.newGifFile = null; 
            this.imageButtonDisabled = false;
            this.gifButtonDisabled = false;
        },
        gifInput() {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(()=> {
                this.gifSearch()
            }, 500);
        },
        gifSearch() {
            fetch( `https://api.giphy.com/v1/gifs/search?api_key=L1GdpfNaiyZu93ykfOGu4vsf7JBVS8Qn&q=${this.searchInput}&limit=30`)
                .then(response => response.json())
                .then(result => {
                    this.gifs = result.data;
                })
                .catch(error => console.log(error));
        },
        selectNewGif(event) {
            this.$store.getters.post.imageUrl = null;
            this.$store.getters.post.giphyUrl = null;
            this.postImageDeleted = true;
            this.postGifDeleted =  true;
            this.newGifFile = event.srcElement.currentSrc;
            this.imageButtonDisabled = true;
            this.gifDialog = false;            
        },
        deleteNewGif() {
            this.newImageFile = null;
            this.newGifFile = null; 
            this.imageButtonDisabled = false;
            this.gifButtonDisabled = false;
        },
        submitNewLink() {
            this.$store.getters.post.link = null;
            this.linkOutput = this.linkUrl;
            this.linkDialog = false;
        },
        deleteNewLink() {
            this.linkUrl = null;
            this.linkOutput = null;
        },
        updatePost() {
            this.btnLoading = true;
            try {
                const formData = new FormData();
                if (this.newImageFile !== null) {
                    formData.append('imageUrl', this.newImageFile);
                } else if (this.$store.getters.post.imageUrl == null && this.postImageDeleted == true && this.newImageFile == null) {
                    formData.append('imageUrl', null);
                }
                if (this.newGifFile !== null) {
                    formData.append('giphyUrl', this.newGifFile);
                } else if (this.$store.getters.post.giphyUrl == null && this.postGifDeleted == true && this.newGifFile == null) {
                    formData.append('giphyUrl', null);
                }
                if (this.linkUrl !== null) {
                    formData.append('link', this.linkUrl);
                } else if (this.$store.getters.post.link == null && this.postLinkDeleted == true && this.linkUrl == null) {
                    formData.append('link', null);
                }
                if (this.newMessage !== null && this.postMessageDeleted == true) {
                    if (this.$refs.newMessageInput.validate()) {
                        console.log('message validation done');
                        formData.append('message', this.newMessage);
                    } else {
                        this.errorMessage = 'Uh-oh 😮 Il semble que vous n\'avez rien écrit. Le champ de message est obligatoire.';
                    }         
                }
                this.$store.dispatch("updatePost", formData);
                this.btnLoading = false;
                window.location.reload();
            }
            catch (error) {
                this.errorMessage = error.response.data.error;
            }       
        },
        backToFeed(id) {
            console.log(id);
        }
    }
}
</script>

<style lang="css" scoped>
.imageContainer {
    max-width: 900px;
    position: relative;
}
.image--deleteButton {
    position: absolute;
    right: 1px;
    top: 1px;
}
.image {
    max-width: 100%;
    width: 100%;
}
.gifContainer {
    max-width: 900px;
    position: relative;
}
.gif {
    width: 100%;
}
.linkInputArea {
    width: 100%;
    padding: 5px; 
    border: 1px solid lightgray;
}
.linkContainer {
    max-width: 900px;
    position: relative;
}
.link--deleteButton {
    position: absolute;
    right: 1px;
    top: 0px;
}
.link {
    height: 40px;
    margin: auto 10px;
}
.linkText {
    font-style: italic;
    text-decoration: underline;
}
.messageContainer {
    max-width: 900px;
    min-height: 100px;
    position: relative;
}
.message--deleteButton {
    position: absolute;
    right: 1px;
    top: 0px;
}
</style>