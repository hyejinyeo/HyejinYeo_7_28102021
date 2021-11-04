<template>
    <v-app>
        <!-- HEADER -->
        <Navbar />
        <!-- MAIN -->
        <v-main class="mx-4 my-4">
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
    name: 'App',
    components: { 
        Navbar 
    },
    data: () => ({
        //
    }),
};
</script>
