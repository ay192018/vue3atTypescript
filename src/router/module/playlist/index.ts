import type { RouteRecordRaw } from 'vue-router';
const playlist: Array<RouteRecordRaw> = [
  {
    path: '/list',
    name: 'list',
    component: (): Promise<any> =>
      import(
        /*  webpackChunkName: "list"  */ '@/components/Details/components/songList.vue'
      ),
  },
  {
    path: '/comment',
    name: 'comment',
    component: (): Promise<any> =>
      import(
        /*  webpackChunkName: "comment"  */ '@/components/Details/components/commentList.vue'
      ),
  },
  {
    path: '/collection',
    name: 'collection',
    component: (): Promise<any> =>
      import(
        /*  webpackChunkName: "collection"  */ '@/components/Details/components/collectionList.vue'
      ),
  },
];
export default playlist;
