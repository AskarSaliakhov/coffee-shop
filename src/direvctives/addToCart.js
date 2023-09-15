

export default {
    mounted (el, binding) {
        el.addEventListener('click', function () {
            const value = binding.value

            const store = value.$store
            const item = value.item

            let totalPrice = item.price
            if(item.choosedType) {
                totalPrice+=type.price
            } else item.choosedType = item.types[0]

            if(item.choosedOptions) {
                options.forEach(option => {
                    totalPrice+=option.price
                });
            } else item.choosedOptions = []

            if(totalPrice <= 0) {
                store.dispatch('addNotification', "Вы не можете добавить товар с нулевой ценой в свою корзину.")
                return
            } else {
                item.totalPrice = totalPrice
                store.dispatch('addToCart', item)
                store.dispatch('addNotification', "Вы добавили товар в корзину")
            }
        });
    }
}
