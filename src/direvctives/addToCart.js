// addToCart.js

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
                store.dispatch('addNotification', "You can't add zero-priced item to your cart.")
                return
            } else {
                item.totalPrice = totalPrice
                store.dispatch('addToCart', item)
                store.dispatch('addNotification', "You added item(s) to your cart.")
            }
        });
    }
}
