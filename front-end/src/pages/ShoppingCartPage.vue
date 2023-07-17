<template>
    <h1>Shopping Cart</h1>
    <div v-if="cartItems.length > 0">
        <ShoppingCartList @remove-from-cart="removeFromCart($event)" :products="cartItems" />
        <button class="checkout-button">Proceed to Checkout</button>
    </div>
    <div v-if="cartItems.length === 0">
        You currently have no items in your cart!
    </div>
</template>

<script>
import ShoppingCartList from '../components/ShoppingCartList.vue';
import axios from 'axios';

export default {
    name: "ShoppingCartPage",
    props: ['user'],
    components: {
        ShoppingCartList,
    },
    data () {
        return {
            cartItems: [],
        }
    },
    watch: {
        async user(newUserValue) {
            if (newUserValue) {
                const cartResponse = await axios.get(`/api/users/${newUserValue.uid}/cart/`);
                // const cartResponse = await axios.get('/api/users/12345/cart/');
                const cartItems = cartResponse.data;
                this.cartItems = cartItems;
            }            
        }
    },    
    methods: {
        async removeFromCart(productId) {
            const response = await axios.delete(`/api/users/${this.user.uid}/cart/${productId}`);
            const udpatedCart = response.data;
            this.cartItems = udpatedCart;
        }
    },
    async created() {
        if (this.user){
            const response = await axios.get(`/api/users/${this.user.uid}/cart`);
            const cartItems = response.data;
            this.cartItems = cartItems;
        }
    }    
}
</script>