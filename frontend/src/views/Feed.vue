<template>
    <div class="feed">
        <h1 class="text-h6 mb-2">FIL D'ACTUALITÉ</h1>
        <!-- WRITING AREA -->
        
        <!-- DISPLAY AREA -->
        <v-container>
            <!-- FILTERS -->
            <v-layout row class="my-3">
                <v-btn small depressed color="grey lighten-3 mr-1"> 
                    <v-icon left small>mdi-filter</v-icon>
                    <span class="caption text-uppercase">Filter</span>
                </v-btn>
                <v-btn small depressed color="grey lighten-3 mr-1" @click="sortBy('date')"> 
                    <v-icon left small>mdi-calendar</v-icon>
                    <span class="caption text-uppercase">DATE</span>
                </v-btn>
                <v-btn small depressed color="grey lighten-3 mr-1" @click="sortBy('author')"> 
                    <v-icon left small>mdi-account-circle</v-icon>
                    <span class="caption text-uppercase">AUTHOR</span>
                </v-btn>
                <v-btn small depressed fab class="mx-2" color="#FFD7D7">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>


            </v-layout>
            <!-- FEEDS -->
            <v-layout row>
                <v-flex> 
                    <v-card 
                        elevation="2"
                        class="mx-auto my-4 pa-1"
                        max-width="800"
                        v-for="feed in feeds" :key="feed.title"
                    >
                        <!-- <v-card-title>
                            {{ feed.title }}
                        </v-card-title> -->
                        <div class="d-flex row">
                            <v-card-subtitle>
                                {{ feed.author }} | {{ feed.date }} 
                            </v-card-subtitle>
                            <v-btn small depressed fab>
                                <v-icon color="red">mdi-more-vert</v-icon>
                            </v-btn>
                        </div>
                        <v-responsive class="pt-4">image goes here</v-responsive>
                        <v-card-text>
                            {{ feed.content }}
                        </v-card-text>
                        <!-- LIKE / COMMENT -->
                        <v-card-actions>
                            <v-btn small text icon class="ma-2">
                                
                                <v-icon color="grey lighten-2">mdi-thumb-up</v-icon>
                                
                            </v-btn>

                            <v-form >
                                <v-text-field
                                    placeholder="Ecrivez un commentaire"
                                    type="text"
                                    width="auto"
                                ></v-text-field>
                            </v-form>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // Temporary dummy data
            feeds: [
                { title: 'Hello World 1', author: 'Hyejin Yeo', date: '10-11-2021', content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos veniam enim eius consectetur sunt, explicabo expedita tempora! Consequuntur aperiam veniam quam quia facilis fugit nulla, vel qui hic ullam cumque.'},
                { title: 'Hello World 2', author: 'Hyejin Yeo', date: '11-11-2021', content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos veniam enim eius consectetur sunt, explicabo expedita tempora! Consequuntur aperiam veniam quam quia facilis fugit nulla, vel qui hic ullam cumque.'},
                { title: 'Hello World 3', author: 'Another author', date: '12-11-2021', content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos veniam enim eius consectetur sunt, explicabo expedita tempora! Consequuntur aperiam veniam quam quia facilis fugit nulla, vel qui hic ullam cumque.'}
            ]
        }
    },
    methods: {
        // Filter - The Net Ninja Vuetify #17
        sortBy(prop){
            this.feeds.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
        }
    }


}
</script>

<style>

</style>