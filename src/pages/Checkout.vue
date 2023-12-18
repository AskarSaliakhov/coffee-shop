<template>
    <div class="container my-5 min-vh-100">
        <div class="row g-5">
            <div class="col-md-5 col-lg-4 order-md-last">
                <h4 class="d-flex justify-content-between align-items-center mb-3">
                    <span>Ваша карта</span>
                </h4>
                <ul class="list-group mb-3">
                    <li
                        class="list-group-item d-flex justify-content-between lh-sm"
                        v-for="item in items"
                        :key="item"
                    >
                        <div>
                            <h6 class="my-0">{{ item.title }}</h6>
                            <small class="text-body-secondary">Количество: {{ item.quantity }}</small>
                        </div>
                        <span class="text-body-secondary">${{ item.price * item.quantity }}</span>
                    </li>

                    <li class="list-group-item d-flex justify-content-between">
                        <span>Цена (USD)</span>
                        <strong>${{ total }}</strong>
                    </li>
                </ul>

                <div class="card p-2 mb-3">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Введите промокод">
                        <button type="submit" class="btn btn-outline-secondary">Купить</button>
                    </div>
                </div>
                <div class="card p-2">
                    <textarea class="form-control" id="comment" rows="3"
                              placeholder="Введите примечания к вашему заказу..."
                              v-model="noteInput">

                    </textarea>
                </div>
            </div>
            <div class="col-md-7 col-lg-8">
                <h4 class="mb-3">Адрес доставки</h4>
                <form class="needs-validation" novalidate>
                    <div class="row g-3">
                        <div class="col-sm-6">
                            <label for="name" class="form-label">Имя</label>
                            <input type="text" class="form-control" id="name" placeholder="Введите имя"
                                   v-model="user.name"
                                   required>
                        </div>
                        <div class="col-sm-6">
                            <label for="username" class="form-label">Номер</label>
                            <div class="input-group has-validation">
                                <input type="text" class="form-control" id="username"
                                       placeholder="Введите номер телефона" required>
                            </div>
                        </div>
                        <div class="col-12">
                            <label for="email" class="form-label">Email <span
                                class="text-body-secondary"> по желанию</span></label>
                            <input type="email" class="form-control" id="email" placeholder="you@example.com"
                                   v-model="user.email">
                        </div>
                        <div class="col-12">
                            <label for="address" class="form-label">Адрес</label>
                            <input type="text" class="form-control" id="address" placeholder="Введите адрес..."
                                   v-model="user.shippingAddress" required>
                        </div>
                        <div class="col-12">
                            <label for="address2" class="form-label">Телефон <span
                                class="text-body-secondary"></span></label>
                            <input type="text" class="form-control" id="address2" placeholder="Номер телефона..."
                                   v-model="user.phone">
                        </div>
                    </div>

                    <hr class="my-4">

                    <h4 class="mb-3">Способ оплаты</h4>
                    <div class="my-3">
                        <div class="form-check">
                            <input id="credit" value="Credit card" type="radio" class="form-check-input"
                                   v-model="methodInput" checked>
                            <label class="form-check-label" for="credit">Кредитная карта</label>
                        </div>
                        <div class="form-check">
                            <input id="debit" value="Debit card" type="radio" class="form-check-input"
                                   v-model="methodInput">
                            <label class="form-check-label" for="debit">Дебетовая карта</label>
                        </div>
                        <div class="form-check">
                            <input id="paypal" value="PayPal" type="radio" class="form-check-input"
                                   v-model="methodInput">
                            <label class="form-check-label" for="paypal">PayPal</label>
                        </div>
                    </div>


                    <hr class="my-4">
                    <button class="w-100 btn btn-outline-dark flex-shrink-0 btn-lg" type="button" @click="checkout">
                        Оплатить
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import {userRequest} from "../requestMethod";

export default {
    name: 'Checkout',
    data() {
        return {
            items: [],
            user: {},
            noteInput: '',
            methodInput: 'Paypal',
            total: 0,
            shipping: 9.99,
        }
    },
    beforeCreate() {
        if (!this.$store.getters.getToken) {
            this.$router.push('/login');
            this.$store.dispatch('addNotification', 'Please login to continue!');
        } else if (this.$store.getters.getCart.length === 0) {
            this.$router.push('/products');
            this.$store.dispatch('addNotification', 'Your cart is empty!');
        }
    },
    mounted() {
        this.items = this.$store.getters.getCart;
        this.user = this.$store.getters.getUser;
    },
    methods: {
        checkout() {
            this.calculateTotal();

            let token = this.$store.getters.getToken;
            userRequest(token).post('/orders', {
                customerId: this.user._id,
                items: this.items,
                shipping: 9.99,
                shippingAddress: this.user.shippingAddress,
                note: this.noteInput,
                paymentMethod: this.methodInput,
                total: this.total,
            })
                .then(res => {
                    console.log(res);
                    this.$store.dispatch('addNotification', 'Order placed successfully.');
                    this.$store.dispatch('resetCart');
                    this.$router.push('/receipt/' + res.data._id);
                })
                .catch(err => {
                    console.log(err);
                    this.$store.dispatch('addNotification', 'Order failed.');
                })
        },
        calculateTotal() {
            this.subTotal = this.$store.getters.getCartTotal;
            this.total = this.subTotal + this.shipping;
            this.total = this.total.toFixed(2);
        }
    }
}
</script>

<style>
</style>
