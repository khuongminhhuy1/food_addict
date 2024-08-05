<template>
  <template v-if="noHeader">
    <div class="min-h-screen">
      <RouterView />
    </div>
  </template>
  <template v-else>
    <div class=" min-h-screen bg-orange-200">
      <Layout>
        <template #body>
          <RouterView />
        </template>
      </Layout>
    </div>
  </template>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router';
import Layout from './layouts/Layout.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
const route = useRoute();
const noHeader = computed(() => route.meta.noHeader)
</script>