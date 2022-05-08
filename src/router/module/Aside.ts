import type { RouteRecordRaw } from 'vue-router';
import Find from './find/index';

import Playlist from './playlist/index';
const Aside: Array<RouteRecordRaw> = [
  {
    path: '/find',
    name: 'find',
    component: (): Promise<any> =>
      import(
        /* webpackChunkName: "find" */ '@/pages/Mian/find/index.vue'
      ),
    meta: {
      title: '发现音乐',
      keepAlive: true,
    },
    redirect: '/find/personality',

    children: [...Find],
  },
  {
    path: '/podcast',
    name: 'podcast',
    component: (): Promise<any> =>
      import(
        /* webpackChunkName: "podcast" */ '@/pages/Mian/podcast/index.vue'
      ),
    meta: {
      title: '播客',
      keepAlive: true,
    },
  },
  {
    path: '/video',
    name: 'video',
    component: (): Promise<any> =>
      import(
        /* webpackChunkName: "video" */ '@/pages/Mian/video/index.vue'
      ),
    meta: {
      title: '视频',
      keepAlive: true,
    },
  },
  {
    path: '/follow',
    name: 'follow',
    component: (): Promise<any> =>
      import(
        /* webpackChunkName: "follow" */ '@/pages/Mian/follow/index.vue'
      ),
    meta: {
      title: '关注',
      keepAlive: true,
    },
  },
  {
    path: '/live',
    name: 'live',
    component: (): Promise<any> =>
      import(
        /* webpackChunkName: "live" */ '@/pages/Mian/live/index.vue'
      ),
    meta: {
      title: '直播',
      keepAlive: true,
    },
  },
  {
    path: '/privateFM',
    name: 'privateFM',
    component: (): Promise<any> =>
      import(
        /* webpackChunkName: "privateFM" */ '@/pages/Mian/privateFM/index.vue'
      ),
    meta: {
      title: '私人FM',
      keepAlive: true,
    },
  },
  {
    //动态路由传参
    path: `/Details/:id`,
    name: 'Details',
    component: (): Promise<any> =>
      import(
        /* webpackChunkName: "Details" */ '@/components/Details/index.vue'
      ),
    props: true,
  },
];
export default Aside;
