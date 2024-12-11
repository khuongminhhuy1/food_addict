<template>
    <div class="container mx-auto p-6">
        <h1 class="text-3xl font-bold mb-6">Categories</h1>

        <!-- Categories List -->
        <div class="flex flex-wrap gap-4 mb-8">
            <button v-for="category in categories" :key="category.id" @click="fetchProducts(category.id)"
                class="px-4 py-2 bg-blue-500 text-white rounded">
                {{ category.name }}
            </button>
        </div>

        <!-- Products for Selected Category -->
        <div v-if="products.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="product in products" :key="product.id" class="border rounded p-4">
                <img :src="product.image" :alt="product.name" class="w-full h-[200px] object-cover rounded mb-4" />
                <h2 class="text-xl font-semibold">{{ product.name }}</h2>
                <p class="text-gray-600">Price: ${{ product.price }}</p>
                <p class="text-gray-700 mb-4">{{ product.description }}</p>
                <button @click="addToCart(product)" class="bg-green-500 text-white px-4 py-2 rounded">Add to Cart</button>
            </div>
        </div>

        <!-- Empty State -->
        <div v-else>
            <p class="text-gray-600">No products available in this category.</p>
        </div>
    </div>
</template>
<script>
import { GetCategories } from '../../api/auth';
import { GetProducts } from '../../api/auth';
export default {
    name: "CategoryPage",
    data() {
        return {
            categories: [],
            products: []
        }
    },
    methods: {

    }
}
</script>
