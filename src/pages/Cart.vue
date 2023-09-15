<template>
    <div class="container my-5">
        <div class="row min-vh-100">
            <div class="col-md-8">
                <h1>Корзина покупок</h1>
                <hr>
                <CartItem
                    v-for="item in cart"
                    :key="item.id"
                    :item="item"
                />
                <p v-if="cart.length === 0">Добавьте товары в корзину</p>
            </div>
            <div class="col-md-4">
                <div class="card mb-3 sticky-top summary">
                    <div class="card-body">
                        <h5 class="card-title">Информация </h5>
                        <ul class="list-group list-group-flush my-3">
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Общая стоимость
                                <span>{{ subTotal.toFixed(2) }}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Доставка
                                <span>{{ shipping }}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                Скидка
                                <span>0</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center"
                                placeholder="Note your order">
                                <strong>Сумма</strong>
                                <strong>${{ total }}</strong>
                            </li>
                        </ul>
                        <router-link to="/checkout">
                            <button  type="button" class="btn btn-outline-dark flex-shrink-0 float-end">ПЕРЕЙТИ К
                                ОФОРМЛЕНИЮ ЗАКАЗА
                            </button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CartItem from '../components/CartItem.vue';

export default {
    components: {
        CartItem
    },
    data() {
        return {
            cart: [],
            shipping: 0,
            subTotal: 0,
            total: 0
        }
    },
    created() {
        this.cart = this.$store.getters.getCart;
        this.calculateTotal();
    },
    methods: {
        calculateTotal() {
            this.subTotal = this.$store.getters.getCartTotal;
            this.total = this.subTotal + this.shipping;
            this.total = this.total.toFixed(2);
        },
    },
    watch: {
        '$store.getters.getCartSize': function () {
            this.calculateTotal();
        }
    }
}
</script>

<style scoped>
.summary {
    top: 80px;
}
</style>
