<!-- src/layouts/Main.vue -->
<template #body>
    <div class="w-full flex flex-row items-center justify-center relative h-[600px]">
        <div class="font-fjalla relative z-10 ">
            <h1 class="text-9xl py-5 animate-fade-down absolute whitespace-nowrap inset-0 flex items-center justify-center">
                Food Addict.
            </h1>
        </div>
    </div>

    <div class="pt-10">
        <NewProductBar />
    </div>
    <div class="pt-10">
        <Categories />
    </div>
</template>
  
<script>
import NewProductBar from '../components/product/newProductBar.vue';
import Categories from '../components/product/Categories.vue';

export default {
    name: 'Main',
    components: { NewProductBar, Categories }
};
</script>

<style scoped>
h1 {
    position: absolute;
    inset: 0;
    z-index: 10;
}

img,
p,
a {
    z-index: 20;
}
</style>
