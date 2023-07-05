<template>
    <div class="grid-wrap">
        <div 
            class="product-item"
            v-for="product in products"
            :key="product.id"
            >
                <img :src="product.imageName" />
                <h3 class="product-name">{{ products.name }}</h3>
                <p class="product-price">{{ products.price }}</p> 
                <router-link :to="'/products/' + product.id">
                    <button>View Details</button>
                </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProductsList",
    props: ['products'],
}
</script>