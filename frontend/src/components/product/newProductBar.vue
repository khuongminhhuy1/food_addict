<template #body>
    <div class="font-fjalla">
        <div class="flex flex-row items-center justify-between pb-10">
            <h1 class="text-6xl">Latest Products</h1>
            <div class="w-8/12 h-[1px] bg-black"></div>
        </div>
        <!-- Container for the products list -->
        <div class="carousel carousel-center bg-neutral rounded-box p-4 w-full">
            <!-- Loop through products and display each one -->
            <div v-for="product in products" :key="product.id" @click="gotoProduct(product.id)"
                class="carousel-item bg-white w-[200px] rounded-md flex flex-col items-center p-1 mr-4">
                <img :src="product.image" :alt="product.name" class="w-[150px] h-[150px] mb-4" />
                <div class="text-center w-full bg-neutral rounded-lg">
                    <h2 class="text-lg text-white">{{ product.name }}</h2>
                    <p class="text-white">{{ product.price }} $</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { GetProducts } from "../../api/auth"
export default {
    name: "Products",
    data() {
        return {
            products: []
        }
    },
    methods: {
        gotoProduct(id) {
            this.$router.push({ name: 'singleProduct', params: { id } });
        },
        fetchData() {
            GetProducts().then(response => {
                console.log('Full Response:', response); // Logs full response
                if (response && response.data) {
                    this.products = response.data; // Assigning the data to products array
                } else {
                    console.error("Unexpected response structure: ", response);
                }
            })
                .catch(error => {
                    console.log('Error fetching items: ', error);
                });
        },
    },
    mounted() {
        this.fetchData(); // Fetches products when component is mounted
    }
}
</script>