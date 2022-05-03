<template>
  <el-scrollbar class="personality" :noresize="true" height="100%">
    <Banner />
    <Recommended />
  </el-scrollbar>
</template>

<script lang="ts" setup>
import Banner from "./personality/banner.vue"
import Recommended from "./personality/recommended.vue"
</script>

<style lang="less" scoped>
.personality {
}
</style>
