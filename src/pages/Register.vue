<template>
    <div class="container min-vh-100">
        <div class="row my-5">
            <div class="col-md-6 offset-md-3 mb-3">
                <div
                    v-if="errors.length"
                    class="alert alert-danger"
                    role="alert"
                >
                    <ul>
                        <li
                            v-for="e in errors"
                            :key="e"
                        >
                            {{ e }}
                        </li>
                    </ul>
                </div>
                <div class="card">
                    <h5 class="card-header">Зарегистрируйтесь</h5>
                    <div class="card-body">
                        <form>
                            <fieldset>
                                <legend>Информация о пользователе</legend>
                                <div class="mb-2">
                                    <label for="usernameInput">Имя:</label>
                                    <input type="text" class="form-control" name="usernameInput" id="usernameInput"
                                           v-model="usernameInput">
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="mb-2">
                                            <label for="passwordInput">Пароль:</label>
                                            <input type="password" class="form-control" name="passwordInput"
                                                   id="passwordInput" v-model="passwordInput">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-2">
                                            <label for="confirmPasswordInput">Повторите пароль:</label>
                                            <input type="password" class="form-control" name="confirmPasswordInput"
                                                   id="confirmPasswordInput" v-model="confirmPasswordInput">
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend>Информация о доставке</legend>
                                <div class="mb-2">
                                    <label for="nameInput">Полное имя:</label>
                                    <input type="text" class="form-control" name="nameInput" id="nameInput"
                                           v-model="nameInput">
                                </div>
                                <div class="mb-2">
                                    <label for="emailInput">Email :</label>
                                    <input type="email" class="form-control" name="emailInput" id="emailInput"
                                           v-model="emailInput">
                                </div>
                                <div class="mb-2">
                                    <label for="streetAddressInput">Улица доставки:</label>
                                    <input type="text" class="form-control" name="streetAddressInput"
                                           id="streetAddressInput" v-model="streetAddressInput">
                                </div>

                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="mb-2">
                                            <label for="suburbInput">Пригород:</label>
                                            <input type="text" class="form-control" name="suburbInput" id="suburbInput"
                                                   v-model="suburbInput">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-2">
                                            <label for="postcodeInput">Почтовый индекс:</label>
                                            <input type="text" class="form-control" name="postcodeInput"
                                                   id="postcodeInput" v-model="postcodeInput">
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-2">
                                    <label for="mobileNumberInput">Номер мобильного телефона:</label>
                                    <input type="tel" class="form-control" name="mobileNumberInput"
                                           id="mobileNumberInput" v-model="mobileNumberInput">
                                </div>
                            </fieldset>
                            <div class="my-5">
                                <label class="d-flex justify-content-between align-items-center font-weight-bold">
                                    Политика нашего сайта
                                    <a href="#" @click.prevent="showTerms = !showTerms">
                                        <button class="btn btn-secondary" v-if="!showTerms">Показать</button>
                                        <button class="btn btn-secondary" v-else>Скрыть</button>
                                    </a>
                                </label>
                                <div v-if="showTerms" class="alert alert-info my-2">
                                    Условия таковы:
                                </div>
                            </div>
                            <button type="button" class="btn btn-outline-dark float-end" @click="checkForm">
                                Зарегистрироваться
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {publicRequest} from '../requestMethod';

export default {
    data() {
        return {
            errors: [],
            nameInput: '',
            usernameInput: '',
            passwordInput: '',
            confirmPasswordInput: '',
            emailInput: '',
            streetAddressInput: '',
            suburbInput: '',
            postcodeInput: '',
            mobileNumberInput: '',
            showTerms: false
        }
    },
    methods: {
        checkForm(e) {
            let result = true;
            this.errors = [];

            if (!this.usernameInput.trim() || this.usernameInput.trim().length < 3) {
                result = false;
                this.errors.push("Пожалуйста, введите имя пользователя, состоящее как минимум из 3 символов");
            }


            if (!this.passwordInput.trim() || this.passwordInput.trim().length < 8) {
                result = false;
                this.errors.push("Пожалуйста, введите пароль, состоящий не менее чем из 8 символов");
            } else if (!/[!$%^&*]/.test(this.passwordInput.trim())) {
                result = false;
                this.errors.push("Пароль должен содержать по крайней мере один из следующих специальных символов: $, %, ^, & или *");
            }


            if (this.passwordInput !== this.confirmPasswordInput) {
                result = false;
                this.errors.push("Пароли не совпадают.");
            }


            if (!this.emailInput.trim()) {
                result = false;
                this.errors.push("Пожалуйста, введите адрес электронной почты.");
            } else if (!/\S+@\S+\.\S+/.test(this.emailInput.trim())) {
                result = false;
                this.errors.push("Пожалуйста, введите действительный адрес электронной почты.");
            }


            if (this.streetAddressInput.trim() && this.streetAddressInput.trim().length > 40) {
                result = false;
                this.errors.push("Адрес улицы должен содержать не более 40 символов.");
            }


            if (this.suburbInput.trim() && this.suburbInput.trim().length > 20) {
                result = false;
                this.errors.push("Название пригорода должно содержать не более 20 символов.");
            }


            if (!result) {
                e.preventDefault();
                window.scrollTo(0, 0);
                return;
            }

            let shippingAddress = this.streetAddressInput + ', ' + this.suburbInput + ', ' + this.postcodeInput;

            publicRequest.post('/auth/register', {
                username: this.usernameInput,
                password: this.passwordInput,
                fullname: this.nameInput,
                email: this.emailInput,
                phone: this.mobileNumberInput,
                shippingAddress: shippingAddress
            }).then(res => {
                console.log(res);
                this.$store.dispatch('addNotification', 'Успешно зарегистрирован!');
                this.$router.push('/login');
            }).catch(err => {
                console.log(err);
                this.$store.dispatch('addNotification', 'Не удалось зарегистрироваться!');
            });
        }
    }
}
</script>

<style scoped>
</style>
