<template>
    <!-- Modal -->
    <div class="modal fade" :id="modalId" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Вы уверены?</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Вы собираетесь удалить <strong>{{ item.title }}</strong> из вашей корзины.
                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отменить</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="remove(item.pid)">
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- Item -->
    <div class="card mb-3">
        <div class="row g-0">
            <div class="col-md-3">
                <img :src="item.img" class="img-fluid">
            </div>
            <div class="col-md-9">
                <div class="card-body">
                    <h5 class="card-title">{{ item.title }}</h5>
                    <p class="card-text">{{ item .desc }}</p>


                    <p class="card-text" v-if="item.choosedType">
                            <small class="text-muted">Тип: {{ item.choosedType.name }}</small>
                    </p>
                    <p class="card-text" v-if="item.choosedOptions.length">
                        <small class="text-muted">Options: {{
                                item.choosedOptions.map(item => item.name).join(', ')
                            }}</small>
                    </p>


                    <p class="card-text"><small class="text-muted">Price: ${{ item.price }}</small></p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary">-</button>
                            <button type="button" class="btn btn-sm btn-outline-secondary">{{ item.quantity }}</button>
                            <button type="button" class="btn btn-sm btn-outline-secondary"  @click="addOneMore">+</button>
                        </div>
                        <button type="button" class="btn btn-sm btn-outline-danger" data-bs-toggle="modal"
                                :data-bs-target="'#' + modalId">
                            Удалить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            modalId: 'areYouSure' + '-' + this.item.pid
        }
    },
    methods: {
        remove(id) {
            this.$store.dispatch('removeFromCart', id);
            this.$store.dispatch('addNotification', "Вы удалили товар из своей корзины.");
        },
        addOneMore() {
            this.item.quantity++;
        }
    }
}
</script>

<style scoped>
</style>
