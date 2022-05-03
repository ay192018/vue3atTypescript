<template>
  <div class="banner">
    <el-carousel :interval="3000" type="card" height="200px" trigger="click">
      <el-carousel-item v-for="(item, index) in banner" :key="index">
        <div class="item">
          <img :src="item.imageUrl" :alt="item.typeTitle" draggable="false" />
          <div class="title">{{ item.typeTitle }}</div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts" setup>
import { Banner } from '@/service/api/find';
import { ElLoading } from 'element-plus';
import { theme } from '@/global/index';
const banner = ref([]);
const { color } = storeToRefs(theme());
onMounted(async () => {
  const { data }: any = await Banner();

  banner.value = data.banners;
});
</script>

<style lang="less" scoped>
.banner {
  width: 100%;
  overflow: hidden;
  ::v-deep(.el-carousel__item) {
    border-radius: 15px;
    .item {
      width: 100%;
      height: 100%;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .title {
        position: absolute;
        width: 60px;
        height: 23px;
        background: red;
        right: 0;
        bottom: 0;
        border-top-left-radius: 15px;
        font-size: 13px;
        text-align: center;
        line-height: 21px;
        color: #fff;
        font-weight: bold;
      }
    }
  }
  ::v-deep(.el-carousel__indicators--outside button) {
    background: v-bind(color);
  }
}
</style>
