import type { RouteRecordRaw } from "vue-router"
const Find: Array<RouteRecordRaw> = [
  {
    path: "/find/personality",
    name: "personality",
    component: (): Promise<any> =>
      import(
        /* webpackChunkName: "personality" */ "@/pages/Mian/find/components/personality.vue"
      ),
  },
  {
    path: "/find/exclusive",
    name: "exclusive",
    component: (): Promise<any> =>
      import(
        /* webpackChunkName: "exclusive" */ "@/pages/Mian/find/components/exclusive.vue"
      ),
  },
  {
    path: "/find/playlist",
    name: "playlist",
    component: (): Promise<any> =>
      import(
        /* webpackChunkName: "playlist" */ "@/pages/Mian/find/components/playlist.vue"
      ),
  },
  {
    path: "/find/ranking",
    name: "ranking",
    component: (): Promise<any> =>
      import(
        /* webpackChunkName: "ranking" */ "@/pages/Mian/find/components/ranking.vue"
      ),
  },
  {
    path: "/find/singer",
    name: "singer",
    component: (): Promise<any> =>
      import(
        /* webpackChunkName: "singer" */ "@/pages/Mian/find/components/singer.vue"
      ),
  },
  {
    path: "/find/newMusic",
    name: "newMusic",
    component: (): Promise<any> =>
      import(
        /* webpackChunkName: "newMusic" */ "@/pages/Mian/find/components/newMusic.vue"
      ),
  },
]
export default Find
