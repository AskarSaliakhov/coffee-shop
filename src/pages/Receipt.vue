<script setup>
import {userRequest} from '../requestMethod';
import Spinner from '../components/Spinner.vue';
</script>

<template>
    <div class="container my-5">
        <div class="row min-vh-100 d-flex justify-content-center">
            <Spinner v-if="isLoading"/>
            <div v-else class="col-lg-10 col-xl-8">
                <div class="card" style="border-radius: 10px;">
                    <div class="card-header px-4 py-3">
                        <h5 class="text-muted mb-0 text-center">Спасибо за ваш заказ, <span>{{ user.fullname }}</span>!
                        </h5>
                    </div>
                    <div class="card-body p-4">
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <p class="lead fw-normal mb-0">Чек</p>
                            <p class="small text-muted mb-0">ID: {{ order._id }}</p>
                        </div>
                        <div class="card shadow-0 border mb-4">
                            <div class="card-body">
                                <div class="row mb-1"
                                     v-for="(product,index) in products"
                                     :key="product+index"

                                >
                                    <div class="col-md-2">
                                        <img :src="product.img"
                                             class="img-fluid"
                                             :alt="product.title"
                                        >
                                    </div>
                                    <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                                        <p class="text-muted mb-0">{{ product.title }}</p>
                                    </div>
                                    <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                                        <p class="text-muted mb-0 small">Small</p>
                                    </div>
                                    <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                                        <p class="text-muted mb-0 small">Options: None</p>
                                    </div>
                                    <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                                        <p class="text-muted mb-0 small">Количество: {{ product.quantity }}</p>
                                    </div>
                                    <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                                        <p class="text-muted mb-0 small">${{ product.quantity * product.price }}</p>
                                    </div>
                                </div>
                                <hr class="mb-4" style="background-color: #e0e0e0; opacity: 1;">
                                <div class="row d-flex align-items-center">
                                    <div class="col-md-2">
                                        <p class="text-muted mb-0 small">Отслеживать порядок</p>
                                    </div>
                                    <div class="col-md-10">
                                        <div class="progress" style="height: 6px; border-radius: 16px;">
                                            <div class="progress-bar bg-dark" role="progressbar"
                                                 style="width: 33%; border-radius: 16px" aria-valuenow="33"
                                                 aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <div class="d-flex justify-content-around mb-1">
                                            <p class="text-muted mt-1 mb-0 small ms-xl-5">Ожидаемый</p>
                                            <p class="text-muted mt-1 mb-0 small ms-xl-5">Доставка</p>
                                            <p class="text-muted mt-1 mb-0 small ms-xl-5">Доставлен</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="d-flex justify-content-between pt-2">
                            <p class="fw-bold mb-0">Информация о заказе</p>
                            <p class="text-muted mb-0"><span class="fw-bold me-4">Промежуточный итог</span>
                                ${{ order.total }}</p>
                        </div>

                        <div class="d-flex justify-content-between pt-2">
                            <p class="text-muted mb-0">Дата выставления счета : {{
                                    new Date(order.createdAt).toLocaleString()
                                }}</p>
                            <p class="text-muted mb-0"><span class="fw-bold me-4">Скидка</span> $00.00</p>
                        </div>

                        <div class="d-flex justify-content-between mb-5">
                            <p class="text-muted mb-0">Адрес доставки: {{ order.shippingAddress }}</p>
                            <p class="text-muted mb-0"><span class="fw-bold me-4">Доставка</span> $00.00</p>
                        </div>

                        <div class="d-flex justify-content-between mb-5">
                            <p class="text-muted mb-0">Статус заказа: {{ order.status }}</p>
                        </div>
                    </div>
                    <div class="card-footer border-0 px-4 py-3 bg-dark">
                        <h5 class="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">Обшая
                            сумма: <span class="mb-0 ms-2">${{ order.total }}</span></h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Receipt',
    data() {
        return {
            isLoading: true,
            user: this.$store.getters.getUser,
            order: {},
            products: []
        }
    },

    mounted() {
        if (!this.$store.getters.getUser) {
            this.$router.push('/login')
            return;
        }
        let id = this.$route.params.id
        let uid = this.$store.getters.getUser._id;
        let token = this.$store.getters.getToken;
        this.items = userRequest(token).get('/orders/find/' + uid + '/' + id)
            .then((response) => {
                this.order = response.data
                let items = response.data.items;
                items.forEach(item => {
                    let product = this.$store.getters.getProductById(item.pid);

                    if (!product) {
                        product = {
                            title: 'Deleted Product',
                            img: 'https://via.placeholder.com/150',
                            price: 0,
                            quantity: 0
                        }
                    }

                    product.quantity = item.quantity;
                    this.products.push(product)
                });
                this.isLoading = false;
                console.log(this.products)
            })
            .catch((error) => {
                console.log(error)
            })
    }
}
</script>

<style scoped>

</style>

