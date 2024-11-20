<template>
    <div class="font-fjalla">
        <div class="flex flex-row items-center justify-between pb-10">

            <div class="w-8/12 h-[1px] bg-black"></div>
            <h1 class="text-6xl ">Categories</h1>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="category in categories" :key="category.id" class="card glass w-[300px] text-white">
                <div class="card-body text-black flex items-center justify-center">
                    <div class=" flex flex-col items-center">
                        <h2 class="card-title uppercase text-6xl pb-3">{{ category.name }}</h2>
                    </div>

                    <div class="card-actions justify-end">
                        <button class="btn">More</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from '../../layouts/Header.vue';
import Footer from '../../layouts/Footer.vue';
import { GetCategories } from '../../api/auth';
export default {
    name: "Categories",
    data() {
        return {
            categories: []
        }
    },
    methods: {
        fetchData() {
            GetCategories().then(response => {
                console.log('fs :', response);
                if (response && response.data) {
                    this.categories = response.data;
                } else {
                    console.log("Unexpected response structure: ", response)
                }
            })
                .catch(error => {
                    console.log('Error fetching items: ', error)
                })
        }
    },
    mounted() {
        this.fetchData(); // Fetches products when component is mounted
    }
}

</script>