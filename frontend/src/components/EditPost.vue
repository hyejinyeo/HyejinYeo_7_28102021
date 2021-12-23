<template>
    <div class="editpost">
        <h1 class="text-h6 mb-2">MODIFIER LA PUBLICATION</h1>
        <v-container style="max-width: 900px" class="mt-5">
            <v-row>
                <v-flex>
                    <v-card elevation="2" class="mx-auto my-7">
                        <v-card-text>
                            <v-form>
                            <!-- CREATED / UPDATED -->
                                <div class="mb-5 text-right">
                                    <!-- <v-btn icon plain @click="backToFeed(this.$store.getters.post.id)">
                                        <v-icon>
                                            mdi-arrow-left
                                        </v-icon>    
                                    </v-btn>
                                    
                                    <div> -->
                                        <span>Publiée le {{ new Date(this.$store.getters.post.createdAt).toLocaleDateString("fr-FR") + ' à ' + new Date(this.$store.getters.post.createdAt).toLocaleTimeString("fr-FR") + 'h'}}  || </span>
                                        <span>Modifiée le {{ new Date(this.$store.getters.post.updatedAt).toLocaleDateString("fr-FR") + ' à ' + new Date(this.$store.getters.post.updatedAt).toLocaleTimeString("fr-FR") }} </span>
                                    <!-- </div> -->
                                </div>
                            <!-- FILE/LINK UPLOAD BUTTONS -->
                                <v-btn depressed rounded class="mr-2" :disabled="imageButtonDisabled" @click="openImageDialog">
                                    <v-icon color="grey darken-2">
                                        $vuetify.icons.image
                                    </v-icon>
                                </v-btn>
                                <input id="imageDialog" type="file" accept="image/*" hidden @change="uploadNewImage" />
                                <v-btn depressed rounded class="mr-2" :disabled="gifButtonDisabled" @click="gifDialog = true">
                                    <v-icon color="grey darken-2">
                                        $vuetify.icons.gif
                                    </v-icon>
                                </v-btn>
                                <v-dialog v-model="gifDialog" max-width="700" class="pa-2">
                                    <v-card>
                                        <v-card-title>
                                            <v-text-field v-model="searchInput" prepend-icon="$vuetify.icons.search" label="Search" single-line hide-details color="#005C68" @input="gifInput">
                                            </v-text-field>
                                        </v-card-title>
                                        <v-card-text>
                                            <img class="gif" v-for="gif in gifs" :key="gif.id" :gif="gif" :src="gif.images.original.url" @click="selectNewGif"/>
                                        </v-card-text>
                                    </v-card>
                                </v-dialog>
                                <v-btn depressed rounded class="mr-2" :disabled="linkButtonDisabled" @click="linkDialog = true">
                                    <v-icon color="grey darken-2">
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
                                            <v-btn color="teal darken-2" text @click="submitNewLink">
                                                AJOUTER
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            <!-- POST DISPLAY -->
                                <!-- original image -->
                                <div class="imageContainer mt-3" v-if="this.$store.getters.post.imageUrl !== null">
                                    <img class="image" :src="this.$store.getters.post.imageUrl"> 
                                    <v-btn fab icon small depressed color="red lighten-2" class="image--deleteButton" @click="deletePostImage">
                                        <v-icon>$vuetify.icons.close</v-icon>
                                    </v-btn>
                                </div>
                                <!-- new image -->
                                <div class="imageContainer mt-3">
                                    <img id="output" class="image"> 
                                    <v-btn fab icon small depressed color="red lighten-2" class="image--deleteButton" v-if="newImage == true" @click="deleteNewImage">
                                        <v-icon>$vuetify.icons.close</v-icon>
                                    </v-btn>
                                </div>
                                <!-- original gif -->
                                <div class="gifContainer mt-3" v-if="this.$store.getters.post.giphyUrl !== null">
                                    <img class="image" :src="this.$store.getters.post.giphyUrl"> 
                                    <v-btn fab icon small depressed color="red lighten-2" class="image--deleteButton" @click="deletePostGif">
                                        <v-icon>$vuetify.icons.close</v-icon>
                                    </v-btn>
                                </div>
                                <!-- new gif -->
                                <div class="gifContainer mt-3" v-if="newGifFile !== null">
                                    <img class="image" :src="newGifFile"> 
                                    <v-btn fab icon small depressed color="red lighten-2" class="image--deleteButton" @click="deleteNewGif">
                                        <v-icon>$vuetify.icons.close</v-icon>
                                    </v-btn>
                                </div>
                                <!-- original link -->
                                <div class="linkContainer mt-3" v-if="this.$store.getters.post.link !== null">
                                    <span class="link d-flex align-center">
                                        <v-icon small class="mr-2">$vuetify.icons.selectedlink</v-icon>
                                        <span class="linkText">{{ this.$store.getters.post.link }}</span>
                                    </span>
                                    <v-btn fab icon small depressed color="red lighten-2" class="link--deleteButton" @click="deletePostLink">
                                        <v-icon>$vuetify.icons.close</v-icon>
                                    </v-btn>
                                </div>
                                <!-- new link -->
                                <div class="linkContainer mt-3" v-if="linkOutput !== null">
                                    <span class="link d-flex align-center">
                                        <v-icon small class="mr-2">$vuetify.icons.selectedlink</v-icon>
                                        <span class="linkText">{{ linkOutput }}</span>
                                    </span>
                                    <v-btn fab icon small depressed color="red lighten-2" v-if="linkUrl !== null" class="link--deleteButton" @click="deleteNewLink">
                                        <v-icon>$vuetify.icons.close</v-icon>
                                    </v-btn>
                                </div>
                                <!-- original message -->
                                <div class="messageContainer mt-3 grey lighten-3 pa-3 rounded" v-if="this.$store.getters.post.message !== null">
                                    <span>{{ this.$store.getters.post.message }}</span>
                                    <v-btn fab icon small depressed color="red lighten-2" class="message--deleteButton" @click="deletePostMessage">
                                        <v-icon>$vuetify.icons.close</v-icon>
                                    </v-btn>
                                </div>
                                <!-- new message -->
                                <v-textarea label="Message" filled color="#005C68" class="mt-3" ref="newMessageInput" autocomplete="off" :rules="messageRules" v-if="textarea == true" v-model="newMessage"> 
                                </v-textarea>
                            </v-form>
                            <v-alert dense text type="error" v-if="errorMessage !== null" class="my-2 ">
                                {{ errorMessage }}
                            </v-alert> 
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="teal darken-2" text block @click.prevent="updatePost" :loading="btnLoading">
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
    // beforeMount() {
        // this.setButtons();
        // if ( this.$store.getters.post.imageUrl == null && this.$store.getters.post.giphyUrl == null ) {
        //     this.imageButtonDisabled = false;
        //     this.gifButtonDisabled = false;    
        // }
        // if ( this.$store.getters.post.imageUrl !== null || this.$store.getters.post.giphyUrl !== null ) {
        //     this.imageButtonDisabled = true;
        //     this.gifButtonDisabled = true;    
        // }
        // if ( this.$store.getters.post.link == null) {
        //     this.linkButtonDisabled = false;
        // } 
    // },
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
        setButtons() {
            // if ( this.$store.getters.post.imageUrl == null && this.$store.getters.post.giphyUrl == null ) {
            //     this.imageButtonDisabled = false;
            //     this.gifButtonDisabled = false;    
            // }
            // if ( this.$store.getters.post.imageUrl !== null || this.$store.getters.post.giphyUrl !== null ) {
            //     this.imageButtonDisabled = true;
            //     this.gifButtonDisabled = true;    
            // }
            // if ( this.$store.getters.post.link == null) {
            //     this.linkButtonDisabled = false;
            // } 
            // if ( this.post.imageUrl == null && this.post.giphyUrl == null ) {
            //     this.imageButtonDisabled = false;
            //     this.gifButtonDisabled = false;    
            // }
            // // if ( this.post.imageUrl !== null || this.post.giphyUrl !== null ) {
            // //     this.imageButtonDisabled = true;
            // //     this.gifButtonDisabled = true;    
            // // }
            // if ( this.post.link == null) {
            //     this.linkButtonDisabled = false;
            // } 
        },
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
                // formData.append('userId', this.user.id);
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