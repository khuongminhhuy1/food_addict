<!-- src/layouts/Main.vue -->
<template #body>
    <div class="font-fjalla w-full flex flex-col items-center justify-evenly ">
        <div class="flex flex-col justify-center items-center h-[500px] w-full bg-gif-background border bg-cover ">
            <h1 class="text-7xl py-5 animate-fade-down whitespace-nowrap">Food Addict.</h1>
            <h2 class="pb-5 text-3xl">Est. since 2024</h2>
        </div>

    </div>

    <div class="pt-10">
        <NewProductBar />
    </div>
    <div class="">

    </div>
</template>
  
<script>
export default {
    name: 'Main',
    components: { NewProductBar, Categories }
};
import NewProductBar from '../components/product/newProductBar.vue';
import Categories from '../components/product/Categories.vue';
</script>
  