<template>
  <div class="songList">
    <el-table
      :data="tableData"
      v-if="loading"
      cell-class-name="active"
      lazy
    >
      <el-table-column type="index" width="50" />

      <el-table-column prop="name" label="标题">
        <template #default="scope">
          <div
            class="ellipsis"
            :class="{
              active:
                songs?.[songData.index]?.id ===
                scope.row.id,
            }"
            @dblclick="play(scope.row.id, scope.$index)"
          >
            <el-icon :size="20"><star /></el-icon
            >&nbsp;&nbsp;{{ scope.row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="ar[0].name" label="歌手">
        <template #default="scope">
          <div
            class="ellipsis"
            :class="{
              active:
                songs?.[songData.index]?.id ===
                scope.row.id,
            }"
            style="display: flex; align-items: center"
            @dblclick="play(scope.row.id, scope.$index)"
          >
            <div
              v-for="(item, index) in scope.row.ar"
              :key="index"
            >
              <span v-if="index !== 0">&nbsp;/&nbsp;</span
              >{{ item.name }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="al.name" label="专辑">
        <template #default="scope">
          <div
            class="ellipsis"
            :class="{
              active:
                songs?.[songData.index]?.id ===
                scope.row.id,
            }"
            @dblclick="play(scope.row.id, scope.$index)"
          >
            &nbsp;&nbsp;{{ scope.row.al.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="dt" label="时间">
        <template #default="scope">
          <div
            class="ellipsis"
            :class="{
              active:
                songs?.[songData.index]?.id ===
                scope.row.id,
            }"
            @dblclick="play(scope.row.id, scope.$index)"
          >
            &nbsp;&nbsp;{{ formatTime2(scope.row.dt) }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-skeleton :rows="16" animated v-else />
  </div>
</template>

<script setup lang="ts">
import { AllSongList, SongUrl } from '@/service/api/find';
import type { Item } from '@/types/index';

import { Audio, theme } from '@/global/index';
/* import { playAudio } from '@/Utils/Utils'; */
import { Star } from '@element-plus/icons-vue';
const { element, songData, songs } = storeToRefs(Audio());
import { formatTime2 } from '@/Utils/Utils';

const { color } = storeToRefs(theme());
const loading = ref<boolean>(false);
const playlist = defineProps({
  playlist: {
    type: Object,
    required: true,
  },
});

interface Dt {
  dt: number | string;
}
watchEffect(async () => {
  if (playlist?.playlist?.playlist?.trackIds) {
    const result: string =
      playlist?.playlist?.playlist?.trackIds
        .map((item: Item) => {
          return item.id;
        })
        .join();

    const { data } = await AllSongList({
      ids: result,
    });
    tableData.value = data.songs;
    loading.value = true;
  }
});
const play = async (id: number, index: number) => {
  songs.value = tableData.value;

  const { data } = await SongUrl({
    id,
  });
  if ((element.value as HTMLAudioElement).paused) {
    songData.value.index = index;
    songData.value.url = data.data[0].url;
    nextTick(() => {
      songData.value.playing = true;
      (element.value as HTMLAudioElement).play();
    });
  } else {
    songData.value.index = index;
    songData.value.url = data.data[0].url;

    nextTick(() => {
      (element.value as HTMLAudioElement).play();
    });
  }
};

const tableData = ref<any>([]);
</script>

<style lang="less" scoped>
.songList {
  ::v-deep(.el-table__row):nth-child(odd) {
    background: var(---tableBackground-color-odd);
  }
  ::v-deep(.el-table__row):hover .songList {
    display: none;
  }
  ::v-deep(.el-table__row):nth-child(even) {
    background: var(---tableBackground-color-even);
  }
  ::v-deep(.el-table__row) {
    transition: background 0.3s;
    color: var(---color);
  }

  ::v-deep(.el-table__cell) {
    background: var(---tableBackground-color-odd);
    transition: background 0.3s;
    cursor: pointer;
  }
  ::v-deep(.is-checked),
  ::v-deep(.el-checkbox__inner) {
    border: 1px v-bind(color) solid;
    background: v-bind(color);
  }
  ::v-deep(.el-skeleton.is-animated .el-skeleton__item) {
    background: var(---SkeletonBackground);
    animation: el-skeleton-loading 1.4s ease infinite;
  }
  ::v-deep(.el-icon) {
    vertical-align: middle;
  }
  .active {
    color: v-bind(color);
  }
}
</style>
