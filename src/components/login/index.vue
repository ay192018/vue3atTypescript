<template>
  <div class="login">
    <keep-alive>
      <component
        @switchState="changeLogin"
        :is="loginType ? QrCode : Phone"
      ></component>
    </keep-alive>
    <el-icon :size="40" @click="loginShow = false"
      ><CloseBold
    /></el-icon>
  </div>
</template>

<script setup lang="ts">
import { theme, login } from '@/global/index';
import Phone from './components/Phone.vue';
import QrCode from './components/QrCode.vue';
const loginType = ref<boolean>(false);
import { CloseBold } from '@element-plus/icons-vue';
const changeLogin = () => {
  loginType.value = !loginType.value;
};
const { loginShow } = storeToRefs(login());
const { color } = storeToRefs(theme());
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 600px;
  background: var(---AsideBackground-color);
  z-index: 999;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 50px 35px;
  text-align: center;
  box-sizing: border-box;
  color: var(---color);
  ::v-deep(.el-icon) {
    position: absolute;
    top: 0.5%;
    right: 1%;
    color: var(---color) !important;
  }
}
</style>
