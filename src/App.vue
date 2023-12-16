<script setup>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import Notifications from './components/Notifications.vue';
</script>

<template>
    <NavBar />
    <router-view />
    <Footer />
    <Notifications />
</template>

<script>
import { userRequest } from './requestMethod.js';

export default {
    beforeCreate() {
        this.$store.dispatch('loadProducts');

        this.$store.dispatch('resetNotifications');
    },
    mounted() {

        let token = this.$store.getters.getToken;
        if(token === null || token === undefined) return;

        userRequest(token).get('/auth/test')
            .catch(err => {
                console.log(err);
                this.$store.dispatch('addNotification', "Invalid Token");
                this.$store.dispatch('logout');
                this.$router.push('/login');
            })
    }
}
</script>

<style scoped>
</style>
