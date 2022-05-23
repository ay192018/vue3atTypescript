<template>
  <el-container>
    <!-- 头部 -->
    <el-header class="header">
      <el-col :span="6" class="hidden-xs-only"
        ><Logo
      /></el-col>
      <el-col :span="width > 768 ? 18 : 24"
        ><Mian
      /></el-col>
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
import { loginStatus } from '@/service/api/login';
import Audio from '@/components/audio/index.vue';
import { theme, resizeSpan, User } from '@/global/index';
import { useWindowResize } from '@/hooks/index';
const { cookie, profile } = storeToRefs(User());
const { color } = storeToRefs(theme());
const { span, collectionSpan } = storeToRefs(resizeSpan());
const [width, height] = useWindowResize();
import { ElNotification, ElMessage } from 'element-plus';
watch(
  () => width.value,
  (val) => {
    if (val < 1650 && val > 1150) {
      span.value = 4;
    } else if (val < 1150 && val > 630) {
      span.value = 6;
      collectionSpan.value = 8;
    } else if (val < 630 && val > 450) {
      span.value = 8;
    } else if (val < 450) {
      collectionSpan.value = 12;
      span.value = 12;
    } else {
      span.value = 3;
      collectionSpan.value = 6;
    }
  },
  {
    immediate: true,
  },
);
//取消网页右键
document.oncontextmenu = function (e: Event) {
  e.preventDefault();
};
//自定义Storage接口

interface Storage {
  setItem(key: string, value: any): void;
  getItem(key: any): string | null;
  removeItem(key: string): void;
  clear(): void;
}

onMounted(async () => {
  if (
    JSON.parse(localStorage.getItem('cookie') as any) ===
    null
  ) {
    return ElMessage({
      showClose: true,
      message: '没有cookie，请登录',
      type: 'error',
    });
  }
  const { data } = await loginStatus({
    timerstamp: Date.now(),
    cookie: JSON.parse(
      localStorage.getItem('cookie') as any,
    ),
  });
  profile.value = data.data.profile;
  ElNotification({
    title: '自动登录',
    message: `欢迎回来，${profile?.value?.nickname}`,
    position: 'top-right',
  });
});
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
