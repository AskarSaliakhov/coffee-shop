import addToCart from './addToCart.js'

const useCustomeDirective = (app) => {
    app.directive('add-to-cart', addToCart)
}

export default useCustomeDirective
