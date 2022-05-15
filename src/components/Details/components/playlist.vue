<template>
  <div class="playlist">
    <el-tabs
      v-model="activeName"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="歌曲列表" name="first">
        <SongLsit :playlist="params" />
      </el-tab-pane>
      <el-tab-pane label="评论" name="second"
        ><CommentList
      /></el-tab-pane>
      <el-tab-pane label="收藏者" name="third">
        <CollectionList
          :id="params.playlist.id"
          v-if="params.playlist.id"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import type { TabsPaneContext } from 'element-plus';
import SongLsit from './songList.vue';
import CommentList from './commentList.vue';
import CollectionList from './collectionList.vue';
import { theme } from '@/global/index';

const { color } = storeToRefs(theme());
const activeName = ref('first');

const handleClick = (
  tab: TabsPaneContext,
  event: Event,
) => {
  /*   console.log(tab, event); */
};
const params = defineProps({
  playlist: {
    type: Object,
    required: true,
  },
});
/* console.log(params); */
const list = ref([
  {
    title: '歌曲列表',
    component: SongLsit,
  },
  {
    title: '评论',

    component: CommentList,
  },
  {
    title: '收藏者',
    component: CollectionList,
  },
]);
</script>

<style lang="less" scoped>
.playlist {
  ::v-deep(.el-tabs__item, .is-active) {
    color: var(---color);
  }
  ::v-deep(.el-tabs__active-bar) {
    background-color: v-bind(color);
  }
}
</style>
