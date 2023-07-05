<template>
    <h1>Products</h1>

</template>

<script>
import { products } from '../temp-data';

export default {
    name: "ProductsPage",
    data () {
        return {
            products,
        }
    }
}
</script>