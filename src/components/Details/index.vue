<template>
  <div class="Details">
    <SongData :playlist="playlist" />
    <Playlist :playlist="playlist" />
  </div>
</template>

<script setup lang="ts">
import Playlist from './components/playlist.vue';
import SongData from './components/songData.vue';
import { PlaylistDetail } from '@/service/api/find';
const params = defineProps({
  id: {
    type: String,
    default: '',
    required: true,
  },
});

const playlist = ref<any>({});

onMounted(async () => {
  /*  console.log(params); */

  const { data } = await PlaylistDetail({
    id: params.id,
  });
  playlist.value = data.playlist;

  console.log(playlist.value);
});
</script>

<style scoped lang="less">
.Details {
  height: 80vh;
  overflow-y: auto;
}
</style>
