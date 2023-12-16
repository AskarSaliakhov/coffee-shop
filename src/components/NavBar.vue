<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top border">
        <div class="container">
            <a class="navbar-brand font-bold" href="#">The Coffee king & Tea Lead</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <router-link to="/" class="nav-link"  aria-current="page">ГЛАВНАЯ</router-link>
                    <router-link to="/products" class="nav-link">ПРОДУКТЫ</router-link>
                    <router-link to="/" class="nav-link">НОВОСТИ</router-link>
                </div>
                <div class="navbar-nav ms-auto">
                    <router-link to="/login" class="nav-link">
                        <button class="btn btn-outline-dark">
                            <i class="bi bi-door-open-fill"></i>
                            Войти
                        </button>
                    </router-link>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                           data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src="https://placehold.co/100x100" width="40" height="40" class="rounded-circle" alt="photo">
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <router-link to="/profile" class="dropdown-item"><i class="bi bi-person-circle mx-1"></i>Профиль
                            </router-link>
                            <button class=" dropdown-item text-danger"><i class="bi bi-door-closed-fill mx-1"></i>Выйти
                            </button>
                        </div>
                    </li>
                    <router-link to="/cart" class="nav-link">
                        <button class="btn btn-outline-dark">
                            <i class="bi bi-cart-fill me-1"></i>
                            <span class="badge bg-dark text-white ms-1 rounded-pill"></span>
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

