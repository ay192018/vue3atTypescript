<template>
  <div class="Aside">
    <ul class="list">
      <router-link
        v-for="(item, index) in AsideList"
        :key="index"
        :to="item.url"
        @click="sendRouter(item.url, index)"
      >
        <li :class="{ active: index === activeRouter }">
          {{ item.name }}
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { AsideData } from "@/types/index"
const activeRouter = ref<string | number>(0)

const router = useRouter()
const sendRouter = (url: string, index: string | number) => {
  router.push({
    path: url,
  })
  activeRouter.value = index
}
const AsideList = ref<AsideData[]>([
  {
    name: "发现音乐",
    url: "/find",
  },
  {
    name: "播客",
    url: "/podcast",
  },
  {
    name: "视频",
    url: "/video",
  },
  {
    name: "关注",
    url: "/follow",
  },
  {
    name: "直播",
    url: "/live",
  },

  {
    name: "私人FM",
    url: "/privateFM",
  },
])
</script>

<style lang="less" scoped>
.Aside {
  padding: 20px 0;
  overflow-y: auto;
  .list {
    width: 100%;
    height: 80vh;

    a {
      color: var(---Aside-color);
      width: 100%;
      text-align: left;
      line-height: 50px;
      font-weight: 500;

      li {
        transition: font-size 0.3s;
        padding: 0 10%;
      }
    }
    a:hover li {
      background: var(---AsideActiveBackground-color);
    }
  }
  .active {
    font-weight: 900;
    font-size: 18px;
    background: var(---AsideActiveBackground-color);
    /* background: #f6f6f7; */
  }
}
</style>
