<template>
    <div class="container mx-auto p-6 font-fjalla">
        <h1 class="text-3xl font-bold mb-6">Your Cart</h1>

        <div v-if="cartItems.length > 0" >
            <!-- Cart Items -->
            <div v-for="item in paginatedItems" :key="item.id" class="border p-4 rounded mb-4">
                <h2 class="text-xl font-semibold">{{ item.name }}</h2>
                <div class="flex flex-row justify-evenly">
                    <img :src="item.image" :alt="item.name" class="w-[100px] h-[100px] rounded" />
                    <div>
                        <p class="text-gray-600">Price: ${{ item.price }}</p>
                        <p class="text-gray-600">Quantity: {{ item.quantity }}</p>
                        <p class="text-gray-600">Total: ${{ (item.price * item.quantity).toFixed(2) }}</p>
                    </div>
                    <button @click="removeItem(item.id)" class="bg-red-500 text-white px-4 py-2 rounded">Remove
                        Item</button>
                </div>
            </div>

            <div class="flex justify-center space-x-4 mt-4">
                <button class="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400" :disabled="currentPage === 1"
                    @click="prevPage">
                    Previous
                </button>
                <span>Page {{ currentPage }} of {{ totalPages }}</span>
                <button class="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
                    :disabled="currentPage === totalPages" @click="nextPage">
                    Next
                </button>
            </div>
            <div class="text-right mt-6">
                <p class="text-xl font-bold">Total Charge: ${{ totalCharge.toFixed(2) }}</p>
            </div>
        </div>

        <!-- Empty Cart Message -->
        <div v-else>
            <p class="text-gray-600">Your cart is empty.</p>
        </div>
    </div>
</template>

<script>
import { fetchCart } from '../../api/auth';
import { removeItemFromCart } from '../../api/auth';
export default {
    name: "cartPage",
    data() {
        return {
            cartItems: [], // Full list of cart items
            totalCharge: 0,
            currentPage: 1, // Current page
            itemsPerPage: 5, // Items per page
        };
    },
    computed: {
        totalPages() {
            // Calculate total pages
            return Math.ceil(this.cartItems.length / this.itemsPerPage);
        },
        paginatedItems() {
            // Get items for the current page
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.cartItems.slice(start, end);
        },
    },
    methods: {
        fetchCartItems() {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user.userId) {
                console.error("User ID not found");
                return;
            }
            fetchCart(user.userId)
                .then(response => {
                    if (response && response.data) {
                        // Map cart items to include product details
                        this.cartItems = response.data.cartItems.map(item => ({
                            id: item.id,
                            name: item.Product.name, // Access product name
                            price: item.Product.price, // Access product price
                            image: item.Product.image, // Access product image
                            quantity: item.quantity,
                        }));
                        this.totalCharge = response.data.totalCharge;
                    } else {
                        console.error("Unexpected response structure:", response);
                    }
                })
                .catch(error => {
                    console.error("Error fetching cart items:", error);
                });
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        removeItem(cartItemId) {
            removeItemFromCart(cartItemId)
                .then(() => {
                    // Update the cartItems list after removal
                    this.cartItems = this.cartItems.filter(item => item.id !== cartItemId);

                    // Recalculate the total charge
                    this.totalCharge = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

                    console.log(`Item with ID ${cartItemId} removed successfully.`);
                })
                .catch(error => {
                    console.error("Error removing cart item:", error);
                });
        },
    },
    mounted() {
        this.fetchCartItems();
    }
}
</script>