<template>
  <div class="songData">
    <el-row :gutter="20">
      <el-col :span="4"
        ><div class="grid-content">
          <img :src="playlist.coverImgUrl" /></div
      ></el-col>
      <el-col :span="15"
        ><div class="grid-content ellipsis">
          <el-tag class="mx-1">歌单</el-tag>
          <span class="title">{{ playlist.name }}</span>
          <div class="User" v-if="creator">
            <img
              :src="creator.avatarUrl"
              draggable="false"
            />
            <router-link to="">{{
              creator.nickname
            }}</router-link>
            <span class="time"
              >{{ time(playlist.createTime) }}创建</span
            >
          </div>
          <div class="btns">
            <el-button type="primary" round>
              播放全部 &nbsp&nbsp
              <el-icon :size="19" color="#fff"
                ><plus
              /></el-icon>
              <template #icon>
                <el-icon :size="20" color="#fff"
                  ><caret-right
                /></el-icon> </template
            ></el-button>
            <el-button round>
              收藏(3130万)
              <template #icon>
                <el-icon :size="19" color="#fff"
                  ><folder-add
                /></el-icon> </template
            ></el-button>
            <el-button round>
              分享(60万)
              <template #icon>
                <el-icon :size="19" color="#fff"
                  ><folder-add
                /></el-icon> </template
            ></el-button>
          </div>
          <div class="describe ellipsis">
            <span
              >标签：<router-link
                to=""
                v-for="(item, index) in playlist.tags"
                :key="index"
              >
                {{ item }}</router-link
              ><br
            /></span>
            <span
              >歌曲：<span class="time">{{
                playlist.trackCount
              }}</span>
              <span
                >&nbsp播放：<span class="time">{{
                  count(playlist.playCount)
                }}</span></span
              ></span
            ><br />
            <span
              >简介：<span class="time">{{
                playlist.description
              }}</span></span
            >
          </div>
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { theme } from '@/global/index';
import { time, count } from '@/Utils/Utils';
import {
  CaretRight,
  Plus,
  FolderAdd,
} from '@element-plus/icons-vue';
const { color } = storeToRefs(theme());
const creator = ref<any>({});
const result = defineProps({
  playlist: {
    type: Object,
    //必须的
    required: true,
  },
});
/*
^这里先就这样写 ，后面到专辑栏目在改
*/
watchEffect(
  () => {
    creator.value = result.playlist.creator;
    console.log(creator.value);
  },
  {
    flush: 'post',
  },
);
const { playlist } = toRefs(result);
</script>

<style lang="less" scoped>
.songData {
  color: var(---color);
  .grid-content {
    border-radius: 4px;
    /*     min-height: 36px; */
    ::v-deep(.el-tag) {
      color: var(---color);
      background: none;
      border: 1px v-bind(color) solid;
    }
    img {
      width: 100%;
      height: width;
      border-radius: 8px;
    }

    .title {
      font-size: 25px;

      font-weight: bold;
      vertical-align: middle;
      margin-left: 5px;
    }
    .User {
      font-size: 14px;
      img {
        width: 5%;
        border-radius: 50%;
      }
    }
    ::v-deep(.is-round) {
      color: #fff;
      background: v-bind(color);
      border: none;
    }
    .btns {
      margin: 2% 0;
    }
    .describe {
      width: 100%;
      font-size: 14px;
      line-height: 180%;
    }
    .time {
      color: #bfc5ca;
      width: 20vw;
    }
    a {
      color: #507daf;
      margin: 0 1%;
    }
    .ellipsis {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>
