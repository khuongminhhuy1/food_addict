<template #body>
    <div v-if="product" class="font-fjalla">
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
                <div class="flex items-center space-x-4">
                    <button @click="decrementQuantity" :disabled="quantity <= 1">-</button>
                    <span>{{ quantity }}</span>
                    <button @click="incrementQuantity">+</button>
                </div>

                <!-- Add to Cart Button -->
                <button @click="addToCart" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
            </div>
        </div>
    </div>
</template>

<script>
import { getProductById } from '../../api/auth';
import { addItemToCart } from '../../api/auth';

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
            const product = await getProductById(productId);
            this.product = product;
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    },
    methods: {
        incrementQuantity() {
            this.quantity++;
        },
        decrementQuantity() {
            if (this.quantity > 1) this.quantity--;
        },
        isAuthenticated() {
            return localStorage.getItem('isLoggedIn') === 'true'; // Return true if the user is logged in
        },
        async addToCart() {
            // Check if the user is authenticated
            const user = JSON.parse(localStorage.getItem("user"));
            const isLoggedIn = this.isAuthenticated();
            if (!isLoggedIn) {
                // Show a simple alert if not logged in
                alert('You need to log in to add items to the cart.');
                return;
            }

            if (!this.product || !this.product.id) {
                console.error("Product ID is missing");
                return;
            }

            try {
                await addItemToCart({
                    userId: user.userId,
                    productId: this.product.id,
                    name: this.product.name,
                    price: this.product.price,
                    quantity: this.quantity,
                });
                alert('Product added to cart');
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        },
    },
}
</script>
