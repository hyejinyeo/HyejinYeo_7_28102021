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
                                                    <!-- <v-text-field
                                                        v-model="search"
                                                        prepend-icon="mdi-magnify"
                                                        label="Search"
                                                        single-line
                                                        hide-details
                                                        color="#005C68"
                                                    ></v-text-field> -->
                                                </v-card-title>
                                                <v-card-text>gif displays here</v-card-text>
                                            </v-card>
                                        </v-dialog>
                                        <!-- INPUT IMAGE/GIF DISPLAY AREA -->
                                        <div class="imageContainer">
                                            <v-btn fab icon small depressed color="red lighten-2" v-if="selectedFile !== null" class="image--deleteButton" @click="deleteImage">
                                                <v-icon>$vuetify.icons.close</v-icon>
                                            </v-btn>
                                            <img id="output" class="image"> 
                                        </div>
                                        <!-- TEXT -->
                                        <v-textarea label="Message" filled color="#005C68" class="mt-2">
                                        </v-textarea>
                                    </v-form>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="teal darken-2" text block @click="createPost">
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
    data() {
        return {
            dialog: false,
            gifDialog: false,
            selectedFile: null,
            imageButtonDisabled: false,
            gifButtonDisabled: false,

        }
    },
    methods: {
        openImageDialog() {
            document.getElementById('imageDialog').click();
        },
        uploadImage(event) {
            let output = document.getElementById('output');
            output.src = URL.createObjectURL(event.target.files[0]);
            this.selectedFile = event.target.files[0];
            this.gifButtonDisabled = true;
            let property = document.getElementById('imgIcon');
            property.color = "#005C68"
        },
        deleteImage() {
            let output = document.getElementById('output');
            output.src = '';
            this.selectedFile = null;
            this.imageButtonDisabled = false;
            this.gifButtonDisabled = false;
        },
        createPost() {
            console.log(this.selectedFile)
            this.dialog = false;
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
    right: 2px;
    top: 2px;
}
.image {
    max-width: 100%;
}
</style>