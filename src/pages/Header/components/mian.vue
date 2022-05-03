<template>
  <div class="mian">
    <Search />
    <User />
  </div>
</template>

<script lang="ts" setup>
import Search from "./search.vue"
import User from "./user.vue"
</script>

<style lang="less" scoped>
.mian {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
