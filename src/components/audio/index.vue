<template>
  <div class="audio">
    <div class="left">
      <el-image
        style="
          width: 80px;
          height: 80px;
          border-radius: 8px;
        "
        :src="songData.picUrl"
        fit="cover"
      />
      <div class="songData">
        <div class="songName">
          {{ songData.songName }}
        </div>
        <div class="userName">
          {{ songData.singerName }}
        </div>
      </div>
    </div>
    <div class="content">
      <div class="top">
        <el-icon :size="35"><CaretLeft /></el-icon>
        <el-icon
          :size="45"
          v-on:click="toggle"
          v-if="!songData.playing"
        >
          <VideoPlay
        /></el-icon>
        <el-icon v-else :size="45" v-on:click="toggle"
          ><VideoPause
        /></el-icon>
        <el-icon :size="35"><CaretRight /></el-icon>
      </div>
      <div class="bottom">
        <span>{{
          formatTime(songData.currentTime)
            ? formatTime(songData.currentTime)
            : '00:00'
        }}</span
        ><br />
        <el-slider
          v-model="progress"
          size="small"
          :max="durationEnd"
          @change="seek"
        />
        <span>{{ songData.duration }}</span>
      </div>
    </div>
    <div class="right"></div>
    <audio
      :src="songData.url"
      controls
      ref="controls"
      @loadedmetadata="loadedmetadata"
      @ended="ended"
      @error="error"
      @waiting="waiting"
      @playing="playing"
      @timeupdate="onTimeupdate"
      hidden
    ></audio>
  </div>
</template>

<script setup lang="ts">
import { theme, Audio } from '@/global/index';

const { color } = storeToRefs(theme());
const { element, songData } = storeToRefs(Audio());
import { formatTime, throttle } from '@/Utils/Utils';
const controls = ref();
const durationEnd = ref<number>(0);
import {
  CaretRight,
  CaretLeft,
  VideoPlay,
  VideoPause,
} from '@element-plus/icons-vue';
const progress = ref<number>(0);

/* const CuttentTimeCpt = computed(() => {
  return throttle(formatTime(songData.currentTime), 1000);
}); */
onMounted((): void => {
  element.value = controls.value;
});
/* audio加载完毕事件 */
const loadedmetadata = (e: Event): void => {
  songData.value.duration = formatTime(
    (e.target as HTMLAudioElement).duration,
  );
  durationEnd.value = (
    e.target as HTMLAudioElement
  ).duration;
};
/* 播放报错事件 */
const error = (e: Event): void => {
  console.log('error');
};
/* 播放完毕事件 */
const ended = (e: Event): void => {
  songData.value.playing = false;
};
/* 播放器行为事件 */
const waiting = (e: Event): void => {
  console.log('waiting');
};
const playing = (e: Event): void => {
  console.log('playing');
};
const onTimeupdate = (e: Event): void => {
  songData.value.currentTime = (
    e.target as HTMLAudioElement
  ).currentTime;
  progress.value = (
    e.target as HTMLAudioElement
  ).currentTime;
};
const seek = (val: number): void => {
  nextTick(() => {
    (element.value as HTMLAudioElement).currentTime = val;
  });
};
const toggle = (): void => {
  nextTick((): void => {
    if (
      (element.value as HTMLAudioElement).paused &&
      (element.value as HTMLAudioElement).readyState === 4
    ) {
      songData.value.playing = true;
      (element.value as HTMLAudioElement).play();
    } else {
      (element.value as HTMLAudioElement).pause();
      songData.value.playing = false;
    }
  });
};
</script>

<style scoped lang="less">
.audio {
  width: 100%;
  height: 10vh;
  position: fixed;
  left: 0;
  bottom: 0;
  background: var(---audioBackgoud-color);
  border-top: 1px var(---AsideBorderRight-color) solid;
  color: var(---color);
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .songData {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 100%;
      .songName {
        /* 文字不换行 */
        white-space: nowrap;
        overflow-x: auto;
      }
    }
  }
  .content {
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .top {
      width: 50%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 0 auto;
      ::v-deep(.el-icon) {
        cursor: pointer;
      }

      ::v-deep(.el-icon):hover {
        color: v-bind(color);
      }
    }
    .bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      ::v-deep(.el-slider) {
        width: 80%;
        margin: 0 4%;
      }
      ::v-deep(.el-slider__bar) {
        background: v-bind(color);
        transition: all 0.3s;
      }
      ::v-deep(.el-slider__button) {
        border: 2px v-bind(color) solid;
      }
      ::v-deep(.el-slider__button-wrapper) {
        transition: all 0.3s;
      }
    }
  }
  .right {
    width: 30%;
    height: 100%;
  }
}
</style>
