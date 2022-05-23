<template>
  <div class="user" :calss="{ active: width > 768 }">
    <el-avatar
      :src="
        profile?.avatarUrl
          ? profile.avatarUrl
          : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      "
      fit="cover"
    />
    <div class="userName" @click="open">
      <div>
        {{ (profile?.nickname as string)? profile.nickname : '未登录' }}
        <el-icon :size="20">
          <CaretBottom />
        </el-icon>
      </div>
    </div>
    <div class="weather">
      11111111111111111111111111111111111111111111111111111
    </div>
    <div class="hidden-xs-only">
      <el-color-picker
        v-model="color"
        show-alpha
        color-format="hex"
        :predefine="predefineColors"
        @active-change="changeColor"
      />
    </div>
    <el-switch
      v-model="isDark"
      class="mt-2"
      active-color="rgb(47,47,47)"
      inline-prompt
      :width="50"
      :active-icon="Sunny"
      :inactive-icon="Moon"
      @change="changeTheme"
    />
    <el-icon :size="20">
      <Setting />
    </el-icon>
    <transition
      enter-active-class="slide-fade-enter-from"
      leave-active-class="slide-fade-leave-to"
    >
      <Login v-if="loginShow" />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { theme, login, User } from '@/global/index';
import Login from '@/components/login';
import {
  CaretBottom,
  Setting,
  Moon,
  Sunny,
} from '@element-plus/icons-vue';
import { useWindowResize } from '@/hooks/index';
import { ElMessageBox, ElMessage } from 'element-plus';

//解构响应式
const { color, fontSizeColor } = storeToRefs(theme());
const { loginShow } = storeToRefs(login());
const { profile } = storeToRefs(User());
const [width, height] = useWindowResize();

const predefineColors = ref([
  'rgb(236,65,65)',
  'rgb(255,92,138)',
  'rgb(255,122,158)',
  'rgb(113,127,249)',
  'rgb(71,145,235)',
  'rgb(57,175,234)',
  'rgb(43,182,105)',
  'rgb(106,204,25)',
  'rgb(226,171,18)',
  'rgb(255,143,87)',
  'rgb(253,114,109)',
]);
const changeColor = (e: string): void => {
  color.value = e;
  isDark.value = false;
};

const open = () => {
  if (
    JSON.parse(localStorage.getItem('cookie') as string)
  ) {
    return;
  }
  loginShow.value = true;
};

const changeTheme = (e: boolean) => {
  e ? (color.value = '#242424') : (color.value = '#EC4141');
};
watch(
  () => color.value,
  (val: string) => {
    if (val !== 'rgb(245, 245, 245)') {
      fontSizeColor.value = '#fff';
    } else {
      fontSizeColor.value = '#000';
    }
  },
);
const isDark = useDark({
  selector: 'body',
  attribute: 'color-scheme',
  valueDark: 'dark',
  valueLight: 'light',
});
</script>

<style lang="less" scoped>
.user {
  flex: 1.5;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .userName {
    flex: 0.5;
    cursor: pointer;
    color: v-bind(fontSizeColor);
    transition: color 0.3s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .weather {
      display: none;
    }
  }
  ::v-deep(.el-icon) {
    cursor: pointer;
    vertical-align: middle;
    transition: color 0.3s;
    color: v-bind(fontSizeColor);
  }
  .active {
    flex: 1.5;
  }
}
</style>
