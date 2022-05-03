<template>
  <div class="Details">
    <Playlist />
    <SongData />
  </div>
</template>

<script setup lang="ts">
import Playlist from './components/playlist.vue';
import SongData from './components/songData.vue';
const params = defineProps({
  id: {
    type: String,
    default: '',
    required: true,
  },
});
</script>

<style scoped lang="less"></style>
