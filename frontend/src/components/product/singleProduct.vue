<template #body>
    <div v-if="product">
        <h1 class="text-3xl font-bold mb-6">Product Details</h1>
        <div class="flex flex-wrap md:flex-row gap-4 items-center justify-evenly">
            <!-- Product Image -->
            <div class="bg-white rounded-lg shadow-md p-4 flex flex-col items-center w-full md:w-1/4">
                <img :src="product.image" :alt="product.name" class="w-[300px] h-[300px] rounded" />
            </div>

            <!-- Product Details and Quantity Selector -->
            <div class="mt-4 w-[500px] border rounded flex flex-col justify-evenly p-6">
                <h2 class="text-xl font-semibold">{{ product.name }}</h2>
                <p class="text-gray-600 text-lg mb-4">${{ product.price }}</p>
                <p class="text-gray-700 mb-4">{{ product.description }}</p>

                <!-- Quantity Control -->
                <div class="flex items-center space-x-4 mb-4">
                    <button @click="decreaseQuantity" :disabled="quantity <= 1"
                        class="px-4 py-2 bg-gray-300 rounded text-gray-800 hover:bg-gray-400 disabled:opacity-50">
                        -
                    </button>
                    <span class="text-xl font-semibold">{{ quantity }}</span>
                    <button @click="increaseQuantity" class="px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-600">
                        +
                    </button>
                </div>
                <!-- Add to Cart Button -->
                <button @click="addToCart" class="px-6 py-2 bg-green-500 rounded text-white hover:bg-green-600">
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { getProductById } from '../../api/auth';
export default {
    name: "singleProduct",
    data() {
        return {
            product: null,
            quantity: 1,
        }
    },
    async created() {
        const productId = this.$route.params.id;
        try {
            this.product = await getProductById(productId);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    },
    methods: {
        increaseQuantity() {
            this.quantity += 1;
        },
        decreaseQuantity() {
            if (this.quantity > 1) {
                this.quantity -= 1;
            }
        },
        addToCart() {
            console.log(`Added ${this.quantity} of ${this.product.name} to cart`);
        },
    },
    mounted() {

    }
}
</script>