<template>
  <div class="logo">
    <div class="icons">
      <div class="item" @click="change"></div>
      <div class="item" @click="change"></div>
      <div class="item" @click="change"></div>
    </div>
    <div class="jump">
      <el-icon :size="20" @click="router.back()"><ArrowLeftBold /></el-icon>
      <el-icon :size="20" @click="router.go(+1)"><ArrowRightBold /></el-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { theme } from '@/global/index';
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue';
const { fontSizeColor } = storeToRefs(theme());
name: 'logo';
const router = useRouter();
const change = (e: MouseEventInit): void => {
  console.log(e);
};
</script>

<style lang="less" scoped>
.logo {
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  .icons {
    width: 60%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex: 1;
    height: 100%;
    .item {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
    }
    .item:nth-child(1) {
      background: #ed655a;
    }
    .item:nth-child(2) {
      background: #e0c04c;
    }
    .item:nth-child(3) {
      background: #72be47;
    }
  }

  .jump {
    //计算宽度
    width: 100% - 60%;
    display: flex;
    height: 100%;
    justify-content: space-around;
    align-items: center;
    ::v-deep(.el-icon) {
      cursor: pointer;
      vertical-align: middle;
      color: v-bind(fontSizeColor);
    }
  }
}
</style>
