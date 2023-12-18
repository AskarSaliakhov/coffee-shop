<template>
    <div class="container min-vh-100">
        <div class="row my-5 justify-content-center">
            <div class="col-md-5 mb-3">
                <div
                    v-if="errors.length"
                    class="alert alert-danger"
                    role="alert"
                >
                    <ul>
                        <li
                            v-for="e in errors "
                            :key="'error'+e"
                        >
                            {{ e }}
                        </li>
                    </ul>
                </div>
                <div class="card">
                    <h5 class="card-header">Войти в аккаунт</h5>
                    <div class="card-body">
                        <form>
                            <div class="mb-3">
                                <label for="usernameInput" class="form-label">Имя</label>
                                <input type="text" class="form-control" name="usernameInput" id="usernameInput"
                                       v-model="usernameInput" placeholder="Введите имя...">
                            </div>
                            <div class="mb-3">
                                <label for="passwordInput" class="form-label">Пароль</label>
                                <input type="password" class="form-control" name="passwordInput" id="passwordInput"
                                       v-model="passwordInput" placeholder="Введите пароль...">
                            </div>
                            <button type="button"
                                    class="btn btn-outline-dark float-end"
                                    @click="checkForm"
                                    :disabled="isLoading"
                            >
                                Войти
                            </button>
                        </form>
                    </div>
                    <div class="card-footer text-center d-flex justify-content-between">
                        <small>
                            <router-link to="/register">Нет аккаунта</router-link>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {publicRequest} from "../requestMethod";

export default {
    name: 'Login',
    data() {
        return {
            errors: [],
            usernameInput: '',
            passwordInput: '',
            isLoading: false,
        }
    },
    methods: {
        checkForm(e) {
            let result = true;
            this.errors = [];

            if (!this.usernameInput.trim()) {
                result = false;
                this.errors.push("Пожалуйста, введите имя пользователя.");
            }


            if (!this.passwordInput.trim()) {
                result = false;
                this.errors.push("Пожалуйста, введите пароль.");
            }

            if (!result) {
                e.preventDefault();
                window.scrollTo(0, 0);
            } else {
                this.handleLogin();
            }
        },

        handleLogin() {
            this.isLoading = true;
            const data = {
                username: this.usernameInput,
                password: this.passwordInput
            }
            publicRequest.post('/auth/login', data)
                .then(response => {
                    this.$store.dispatch('setUser', response.data);
                    this.$store.dispatch('addNotification', "Вы вошли в систему.");
                    this.$router.push('/profile');
                })
                .catch(error => {
                    console.log(error);
                    this.isLoading = false;
                    this.$store.dispatch('addNotification', "Ошибка входа.");
                })
        }
    }
}
</script>

<style scoped>
</style>
