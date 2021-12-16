<template>
    <div class="newpost">
        <v-container style="max-width: 900px" class="mt-5">
            <v-row>
                <v-flex>
                    <v-dialog max-width="800px" v-model="dialog">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn block rounded depressed color="#FFD7D7" v-bind="attrs" v-on="on" >
                                <v-icon left>$vuetify.icons.plus</v-icon>
                                Partagez vos idées
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">Créer une publication</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-form>
                                        <!-- IMAGE -->
                                        <v-btn depressed rounded class="mr-2" :disabled="imageButtonDisabled" @click="openImageDialog">
                                            <v-icon color="grey darken-2">
                                                $vuetify.icons.image
                                            </v-icon>
                                        </v-btn>
                                        <input id="imageDialog" type="file" accept="image/*" hidden @change="uploadImage" />
                                        <!-- GIF -->
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
                                                    <img class="gif" v-for="gif in gifs" :key="gif.id" :gif="gif" :src="gif.images.original.url" @click="selectGif"/>
                                                </v-card-text>
                                            </v-card>
                                        </v-dialog>
                                         <!-- LINK -->
                                        <v-btn depressed rounded class="mr-2" @click="linkDialog = true">
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
                                                    <v-btn color="teal darken-2" text @click="submitLink">
                                                        AJOUTER
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
                                        
                                        <!-- INPUT DISPLAY AREA -->
                                        <div class="imageContainer mt-3">
                                            <img id="output" class="image"> 
                                            <v-btn fab icon small depressed color="red lighten-2" v-if="selectedImageFile !== null" class="image--deleteButton" @click="deleteImage">
                                                <v-icon>$vuetify.icons.close</v-icon>
                                            </v-btn>
                                        </div>
                                        <div class="gifContainer">
                                            <img class="image" :src="selectedGifFile"> 
                                            <v-btn fab icon small depressed color="red lighten-2" v-if="selectedGifFile !== null" class="gif--deleteButton" @click="deleteGif">
                                                <v-icon>$vuetify.icons.close</v-icon>
                                            </v-btn>
                                        </div>
                                        <div class="linkContainer mt-3" v-if="linkOutput !== null">
                                            <span class="link d-flex align-center">
                                                <v-icon small class="mr-2">$vuetify.icons.selectedlink</v-icon>
                                                <span class="linkText">{{ linkOutput }}</span>
                                            </span>
                                            <v-btn fab icon small depressed color="red lighten-2" v-if="linkUrl !== null" class="link--deleteButton" @click="deleteLink">
                                                <v-icon>$vuetify.icons.close</v-icon>
                                            </v-btn>
                                        </div>
                                        <!-- TEXT -->
                                        <v-textarea label="Message" filled color="#005C68" class="mt-2" ref="messageInput" autocomplete="off" :rules="messageRules" v-model="inputMessage">
                                        </v-textarea>
                                    </v-form>
                                    <v-alert dense text type="error" v-if="errorMessage !== null" class="my-2 ">
                                        {{ errorMessage }}
                                    </v-alert> 
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="teal darken-2" text block @click.prevent="createPost">
                                    Publier
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
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
            dialog: false,
            gifDialog: false,
            linkDialog: false,
            selectedImageFile: null,
            searchInput: null,
            timeout: null,
            gifs: [],
            selectedGifFile: null,
            linkUrl: null,
            linkOutput: null,
            inputMessage: null,
            imageButtonDisabled: false,
            gifButtonDisabled: false,
            messageRules: [
                v => !!v || 'Ce champ est obligatoire.',
            ],
            errorMessage: null,            
        }
    },
    computed: {
        user() {
            return this.$store.getters.user;
        }
    },
    methods: {
        openImageDialog() {
            document.getElementById('imageDialog').click();
        },
        uploadImage(event) {
            let output = document.getElementById('output');
            output.src = URL.createObjectURL(event.target.files[0]);
            this.selectedImageFile = event.target.files[0];
            this.gifButtonDisabled = true;
        },
        deleteImage() {
            let output = document.getElementById('output');
            output.src = '';
            this.selectedImageFile = null;
            this.selectedGifFile = null;
            this.imageButtonDisabled = false;
            this.gifButtonDisabled = false;
        },
        // GIPHY API 
        // L1GdpfNaiyZu93ykfOGu4vsf7JBVS8Qn
        // It will call the GET request fuction "gifSearch" after 0.5 seconds of the last search input, i
        gifInput() {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(()=> {
                this.gifSearch()
            }, 500);
        },
        // GET Request to Giphy search endpoint
        gifSearch() {
            fetch( `https://api.giphy.com/v1/gifs/search?api_key=L1GdpfNaiyZu93ykfOGu4vsf7JBVS8Qn&q=${this.searchInput}&limit=30`)
            .then(response => response.json())
            .then(result => {
                this.gifs = result.data;
            })
            .catch(error => console.log(error))
        },
        selectGif(event) {
            this.selectedGifFile = event.srcElement.currentSrc;
            this.imageButtonDisabled = true;
            this.gifDialog = false;            
        },
        deleteGif() {
            this.selectedImageFile = null;
            this.selectedGifFile = null; 
            this.imageButtonDisabled = false;
            this.gifButtonDisabled = false;
        },
        submitLink() {
            this.linkOutput = this.linkUrl;
            this.linkDialog = false;
        },
        deleteLink() {
            this.linkUrl = null;
            this.linkOutput = null;
        },
        createPost() {
            if (this.$refs.messageInput.validate()) {
                const formData = new FormData();
                // user id
                formData.append('userId', this.user.id);
                formData.append('message', this.inputMessage);
                if (this.selectedImageFile !== null) {
                    formData.append('imageUrl', this.selectedImageFile);
                }
                if (this.selectedGifFile !== null) {
                    formData.append('giphyUrl', this.selectedGifFile);
                }
                if (this.linkUrl !== null) {
                    formData.append('link', this.linkUrl);
                }
                console.log(formData)
                this.$store.dispatch("createPost", formData);
                
                // Reset data
                this.selectedImageFile = null;
                let output = document.getElementById('output');
                output.src = '';
                this.selectedGifFile = null;
                this.linkUrl = null;
                this.linkOutput = null;
                this.inputMessage = null;
                // Reactivate buttons
                this.imageButtonDisabled = false;
                this.gifButtonDisabled = false;
                // Relocate to the post page and close the dialog
                // window.location.href = "/";
                this.dialog = false;
            } 
            else {
                this.errorMessage = 'Uh-oh 😮 Il semble que vous n\'avez rien écrit. Le champ de message est obligatoire.';
            }               
        },    
    }
}
</script>

<style lang="css" scoped>
.imageContainer {
    max-width: 800px;
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
    max-width: 800px;
    position: relative;
}
.gif--deleteButton {
    position: absolute;
    right: 1px;
    top: 1px;
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
    max-width: 800px;
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
</style>