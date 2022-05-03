<template>
  <div class="songData">
    <el-row :gutter="20">
      <el-col :span="4"
        ><div class="grid-content">
          <img :src="playlist.coverImgUrl" /></div
      ></el-col>
      <el-col :span="15"
        ><div class="grid-content">
          <el-tag class="mx-1">专辑</el-tag>
          <span class="title">{{ playlist.name }}</span>
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { theme } from '@/global/index';
const { color } = storeToRefs(theme());
const result = defineProps({
  playlist: {
    type: Object,
    //必须的
    required: true,
  },
});
const { playlist } = toRefs(result);
</script>

<style lang="less" scoped>
.songData {
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    ::v-deep(.el-tag) {
      color: var(---color);
      background: none;
      border: 1px v-bind(color) solid;
    }
    img {
      width: 100%;
      height: width;
      border-radius: 8px;
    }

    .title {
      font-size: 25px;
      color: var(---color);
      font-weight: bold;
      vertical-align: middle;
      margin-left: 5px;
    }
  }
}
</style>
