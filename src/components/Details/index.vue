<template>
  <div class="Details">动态路由{{ params.id }}</div>
</template>

<script setup lang="ts">
const params = defineProps({
  id: {
    type: String,
    default: "",
    required: true,
  },
})
</script>

<style scoped lang="less"></style>
