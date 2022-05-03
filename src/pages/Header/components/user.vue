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
      <el-color-picker
        v-model="color"
        show-alpha
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
  </div>
</template>

<script lang="ts" setup>
import { theme } from '@/global/index';
import { CaretBottom, Setting, Moon, Sunny } from '@element-plus/icons-vue';

//解构响应式
const { color } = storeToRefs(theme());
/* const color = ref<string>('rgba(255, 69, 0, 0.68)'); */
const predefineColors = ref([
  'rgb(236,65,65)',
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
]);
const changeColor = (e: string): void => {
  color.value = e;
  isDark.value = false;
};
const changeTheme = (e: boolean) => {
  if (e) {
    color.value = 'rgb(36, 36, 36)';
  } else {
    color.value = 'rgb(245, 245, 245)';
  }
};
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
    color: var(---color);
    transition: color 0.3s;
  }
  ::v-deep(.el-icon) {
    cursor: pointer;
    vertical-align: middle;
    color: var(---color);
    transition: color 0.3s;
  }
}
</style>
