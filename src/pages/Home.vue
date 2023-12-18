<template>
    <Slider />
    <div class="container my-5">
        <Categories />
        <hr/>
        <section class="product-lists mt-5">
            <div class="row text-center">
                <div class="col-md-12 mb-2">
                    <h3 class="fw-bold">Популярные продукты</h3>
                </div>
                <BarChart
                    v-if="!products.isLoading"
                    :products="products.data"
                />
                <Products :filter="{limit:5}" />
            </div>
        </section>
        <hr/>
        <section class="our-story mt-5">
            <div class="row text-center">
                <div class="col-md-12 mb-2">
                    <h1 class="fw-bold">Наша история</h1>
                </div>
                <div class="col-md-7 my-auto p-5 bg-light rounded shadow-sm">
                    <p>Американская компания по продаже кофе и одноимённая сеть кофеен. Основана в Сиэтле (штат Вашингтон) в 1971 году. На сентябрь 2020 года сеть The Coffee king & Tea Lead объединяла свыше 32 тысяч торговых точек в 75 странах мира (из них 8 тысяч работают в США). </p>

                </div>
                <div class="col-md-5">
                    <img src="/images/our-story.png" alt="Our Story Image" class="rounded img-fluid">
                </div>
            </div>
        </section>
    </div>

    <Newsletter />
</template>

<script>
import Slider from '../components/Slider.vue';
import Categories from '../components/Categories.vue';
import Newsletter from '../components/Newsletter.vue';
import Products from '../components/Products.vue';
import BarChart from '../components/BarChart.vue';
import { mapState } from 'vuex';

export default {
    components: {
        Slider,
        Categories,
        Newsletter,
        Products,
        BarChart
    },
    computed: {
        ...mapState({
            products: state => state.products
        })
    },
}
</script>

<style scoped>
</style>
