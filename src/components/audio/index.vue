<template>
  <div class="audio">
    <div class="left" v-if="songData.index !== null">
      <el-image
        style="
          width: 20%;
          border-radius: 8px;
          cursor: pointer;
        "
        :src="songs?.[songData.index]?.al.picUrl"
        fit="cover"
        @click="drawer = true"
        lazy
      />
      <div class="songData">
        <div class="songName">
          {{ songs?.[songData.index]?.name }}
        </div>
        <div
          class="userName"
          style="display: flex; align-items: center"
        >
          <span
            v-for="(item, index) in songs?.[songData.index]
              ?.ar"
            :key="index"
            >{{ item.name }}&nbsp;&nbsp;</span
          >
        </div>
      </div>
    </div>
    <div class="content">
      <div class="top">
        <div
          class="icon nav-icon-4"
          @mouseover="activeLeft = true"
          @mouseout="activeLeft = false"
          :class="{ open: activeLeft }"
        >
          <span style="background: var(---color)"></span>
          <span style="background: var(---color)"></span>
          <span style="background: var(---color)"></span>
        </div>
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

        <div
          class="icon nav-icon-3"
          @mouseover="activeRight = true"
          @mouseout="activeRight = false"
          :class="{ open: activeRight }"
        >
          <span style="background: var(---color)"></span>
          <span style="background: var(---color)"></span>
          <span style="background: var(---color)"></span>
        </div>
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
  <el-drawer
    v-model="drawer"
    title="I am the title"
    :with-header="false"
    direction="btt"
    size="70%"
    :append-to-body="true"
  >
    <span>Hi there!</span>
  </el-drawer>
</template>

<script setup lang="ts">
import { theme, Audio } from '@/global/index';
import { SongUrl } from '@/service/api/find';
import { log } from 'console';
const { color } = storeToRefs(theme());
const { element, songData, songs } = storeToRefs(Audio());
import { formatTime } from '@/Utils/Utils';
import { ElNotification } from 'element-plus';
const controls = ref();
const durationEnd = ref<number>(0);
const direction = ref('rtl');
import {
  CaretRight,
  CaretLeft,
  VideoPlay,
  VideoPause,
} from '@element-plus/icons-vue';
const activeLeft = ref<boolean>(false);
const activeRight = ref<boolean>(false);
const progress = ref<number>(0);
const drawer = ref(false);
onMounted((): void => {
  element.value = controls.value;
});
watch(
  () => songs?.value?.[songData?.value?.index]?.id,
  (v, o) => {
    if (v !== o) {
      ElNotification({
        title: songs?.value[songData?.value.index]?.name,
        message: h(
          'i',
          { style: `color:v-bind(color.value)` },
          songs?.value[songData.value?.index]?.ar[0]?.name,
        ),
      });
    }
  },
);

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
  /*   ElNotification({
    title: 'Error',
    message: 'This is an error message',
    type: 'error',
  }); */
};
/* 播放完毕事件 */
const ended = async (e: Event) => {
  nextTick(() => {
    songData.value.playing = false;
    (element.value as HTMLAudioElement).pause();
  });

  songData.value.index++;
  const { data } = await SongUrl({
    id: songs.value?.[songData.value.index]?.id,
  });
  /*   console.log(data); */

  songData.value.url = data.data[0].url;

  nextTick(() => {
    songData.value.playing = true;
    (element.value as HTMLAudioElement).play();
  });
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
@import './icon.less';
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
  .nav-icon-3.open span {
    transition: 0.3s cubic-bezier(0.8, 0.2, 0.4, 1.2);
    background: v-bind(color) !important;
  }
  .nav-icon-4.open span {
    transition: 350ms cubic-bezier(0.8, 0.5, 0.2, 1.4);
    background: v-bind(color) !important;
  }
}
</style>
