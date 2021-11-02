<template>
    <v-app>
        <!-- HEADER -->
        <Navbar />
        <!-- MAIN -->
        <v-main class="mx-2 mb-2">
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
