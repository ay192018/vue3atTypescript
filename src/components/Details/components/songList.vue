<template>
  <div class="songList">
    <el-table
      :data="tableData"
      v-if="loading"
      @cell-dblclick="dblclick"
    >
      <el-table-column type="index" width="50" />
      <el-table-column label="操作" type="selection" />
      <el-table-column prop="name" label="标题">
      </el-table-column>
      <el-table-column prop="ar[0].name" label="歌手">
      </el-table-column>
      <el-table-column prop="al.name" label="专辑">
        <template #empty>
          <div>未知专辑</div>
        </template>
      </el-table-column>
      <el-table-column prop="dt" label="时间" />
    </el-table>
    <el-skeleton :rows="16" animated v-else />
  </div>
</template>

<script setup lang="ts">
import { AllSongList, SongUrl } from '@/service/api/find';
import type { Item } from '@/types/index';
import { theme } from '@/global/index';
import { Audio } from '@/global/index';
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

console.log(playlist.playlist);
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

    data.songs.forEach((item: Dt) => {
      item.dt = formatTime2(item.dt);
    });
    tableData.value = data.songs;
    loading.value = true;
  }
});
const dblclick = async (
  row: any,
  column: any,
  cell: any,
  event: MouseEvent,
) => {
  console.log(row, column, cell, event);
  songs.value = tableData.value;
  const { data } = await SongUrl({
    id: row.id,
  });

  console.log((element.value as HTMLAudioElement).paused);
  if ((element.value as HTMLAudioElement).paused) {
    songData.value.url = data.data[0].url;
    songData.value.songName = row.name;
    songData.value.singerName = row.ar[0].name;
    songData.value.picUrl = row.al.picUrl;
    nextTick(() => {
      songData.value.playing = true;
      (element.value as HTMLAudioElement).play();
    });
  } else {
    songData.value.url = data.data[0].url;
    songData.value.songName = row.name;
    songData.value.singerName = row.ar[0].name;
    songData.value.picUrl = row.al.picUrl;
    nextTick(() => {
      (element.value as HTMLAudioElement).play();

      console.log(1);
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
  }

  ::v-deep(.el-table__cell) {
    background: var(---tableBackground-color-odd);
    transition: background 0.3s;
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
}
</style>
