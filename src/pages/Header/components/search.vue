<template>
  <el-input
    v-model="input1"
    class="search hidden-xs-only"
    size="large"
    placeholder="Please Input"
    :prefix-icon="Search"
  />
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue';
import { theme } from '@/global/index';
const input1 = ref<string>('');
const { color } = storeToRefs(theme());
</script>

<style lang="less" scoped>
@transition: background 0.3s;
@display: all 0.3s;
.search {
  height: 70%;
  width: 20%;
  transition: @display;
  ::v-deep(.el-input__wrapper) {
    background: var(---inputBackground-color);
    transition: @transition;
  }
  ::v-deep(.is-focus) {
    box-shadow: 0 0 0 1px v-bind(color);
  }
}
</style>
