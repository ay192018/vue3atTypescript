<template>
  <div class="Details">
    <Playlist :playlist="playlist" />
    <SongData :playlist="playlist" />
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
  const { data } = await PlaylistDetail({
    id: params.id,
  });
  playlist.value = data.playlist;
  console.log(data);
});
</script>

<style scoped lang="less"></style>
