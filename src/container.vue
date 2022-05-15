<template>
  <el-container>
    <!-- 头部 -->
    <el-header class="header">
      <el-col :span="6" class="hidden-xs-only"
        ><Logo
      /></el-col>
      <el-col :span="18"><Mian /></el-col>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="15%" class="hidden-xs-only"
        ><Aside
      /></el-aside>
      <el-container>
        <el-main>
          <router-view v-slot="{ Component }">
            <transition
              enter-active-class="slide-fade-enter-from"
              leave-active-class="slide-fade-leave-to"
            >
              <component class="child-view" :is="Component">
              </component>
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
    <!-- 传送组件 -->
  </el-container>
  <Teleport to="body">
    <Audio />
  </Teleport>
</template>

<script lang="ts" setup>
import Logo from '@/pages/Header/index.vue';
import Mian from '@/pages/Header/components/mian.vue';
import Aside from '@/pages/Aside/index.vue';
import Audio from '@/components/audio/index.vue';
import { theme } from '@/global/index';
const { color } = storeToRefs(theme());
console.log(window, 1);

window.onbeforeunload = function (ev: Event) {
  return false;
  alert('确定要离开吗？');
};
</script>

<style lang="less" scoped>
@transition: background 0.3s;

::v-deep(.el-header) {
  display: flex;
  background: v-bind(color);
  transition: @transition;
}
::v-deep(.el-aside) {
  background: var(---AsideBackground-color);
  border-right: 1px var(---AsideBorderRight-color) solid;
  color: var(---Aside-color);
  transition: @transition;
}
::v-deep(.el-main) {
  position: relative;
  overflow: hidden;
  background: var(---MainBackground-color);
  color: var(---Main-color);
  transition: @transition;
}
</style>
