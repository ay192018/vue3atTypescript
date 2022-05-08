<template>
  <div class="user">
    <el-avatar
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      fit="cover"
    />
    <div class="userName">
      宇ovo
      <el-icon :size="20">
        <CaretBottom />
      </el-icon>
      <div class="hidden-xs-only">
        <el-color-picker
          v-model="color"
          show-alpha
          color-format="hex"
          :predefine="predefineColors"
          @active-change="changeColor"
        />
      </div>
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
  </div>
</template>

<script lang="ts" setup>
import { theme } from '@/global/index';
import {
  CaretBottom,
  Setting,
  Moon,
  Sunny,
} from '@element-plus/icons-vue';

//解构响应式
const { color, fontSizeColor } = storeToRefs(theme());
/* const color = ref<string>('rgba(255, 69, 0, 0.68)'); */
const predefineColors = ref([
  'rgb(36, 36, 36)',
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
  'rgb(253,84,78)',
]);
const changeColor = (e: string): void => {
  color.value = e;
  isDark.value = false;
};

const changeTheme = (e: boolean) => {
  /*  console.log(e); */

  if (e) {
    color.value = '#242424';
  } else {
    color.value = '#EC4141';
  }
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
  flex: 0.5;
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
  }
  ::v-deep(.el-icon) {
    cursor: pointer;
    vertical-align: middle;
    transition: color 0.3s;
    color: v-bind(fontSizeColor);
  }
}
</style>
