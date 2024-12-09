<template>
    <component :is="icon" />
  </template>
  
  <script setup>
  
  const props = defineProps({
    icon: {
      type: Object,
      required: true
    }
  });
  </script>