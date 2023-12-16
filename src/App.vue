<template>
    <Navbar/>
    <Slider/>
    <NewsLetter/>
    <Footer/>
    <Categories/>
</template>
<script>
import Footer from './components/Footer.vue'
import Slider from "./components/Slider.vue";
import Navbar from "./components/NavBar.vue";
import NewsLetter from "./components/NewsLetter.vue";
import Categories from "./components/Categories.vue";

export default {
    components: {Categories, NewsLetter, Navbar, Slider, Footer}
}
</script>
<style>
</style>
