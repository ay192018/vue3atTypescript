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
        color-format="hex"
        :predefine="predefineColors"
        @active-change="changeColor"
        class="color-picker"
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
  .color-picker {
    top: 60px;
  }
}
</style>
