<template>
    <div class="p-4">
      <h2 class="text-2xl">Welcome, {{ username }}!</h2>
      <button class="btn btn-secondary mt-4" @click="$emit('logout')">Logout</button>
    </div>
  </template>
  
  <script>
  export default {
    props: ['username'],
  };
  </script>
  