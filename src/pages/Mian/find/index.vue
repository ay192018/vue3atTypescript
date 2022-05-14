<template>
  <div class="find">
    <ul class="list">
      <li
        v-for="(item, index) in routerList"
        :key="index"
        :to="item.url"
        @click="sendRouter(item.url, index)"
        :class="{ active: index === activeRouter }"
      >
        {{ item.name }}
      </li>
    </ul>
    <div class="center">
      <router-view v-slot="{ Component }">
        <transition
          enter-active-class="slide-fade-enter-from"
          leave-active-class="slide-fade-leave-to"
        >
          <component class="child-view" :is="Component">
          </component>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { AsideData } from '@/types/index';
const activeRouter = ref<string | number>(0);
const router = useRouter();
import { theme } from '@/global/index';
const { color } = storeToRefs(theme());
const sendRouter = (
  url: string,
  index: string | number,
) => {
  router.push({
    path: url,
  });
  activeRouter.value = index;
};
const routerList = ref<AsideData[]>([
  {
    name: '个性推荐',
    url: '/find/personality',
  },
  {
    name: '专属定制',
    url: '/find/exclusive',
  },
  {
    name: '歌单',
    url: '/find/playlist',
  },
  {
    name: '排行榜',
    url: '/find/ranking',
  },
  {
    name: '歌手',
    url: '/find/singer',
  },
  {
    name: '最新音乐',
    url: '/find/newMusic',
  },
]);
</script>

<style lang="less" scoped>
.find {
  width: 100%;
  .list {
    display: flex;
    & li {
      margin: 1% 1%;
      cursor: pointer;

      line-height: 40px;
      transition: font-size 0.3s;
    }
  }

  .active {
    border-bottom: 3px v-bind(color) solid;
    font-weight: 900;
    font-size: 18px;
    color: var(---color);
  }
  .center {
    width: 100%;
    height: 75vh;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 10%;
  }
}
</style>
