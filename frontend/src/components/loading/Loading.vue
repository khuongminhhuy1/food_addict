<template>
    <div class="flex justify-center items-center">
        <span class="loading loading-spinner text-warning"></span>
    </div>
  </template>
  
  <script>
  export default {
    name: "Loading",
  };
  </script>

<style scoped>
.loading-spinner {
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: currentColor;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>