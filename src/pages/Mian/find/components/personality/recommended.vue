<template>
  <div class="recommended">
    <div class="title">
      推荐歌单
      <el-icon><ArrowRightBold /></el-icon>
    </div>
    <el-row :gutter="20">
      <el-col
        :span="span"
        @click="Details(item.id)"
        v-for="(item, index) in list"
        :key="index"
        ><div class="grid-content">
          <div class="img">
            <img
              :src="item.picUrl"
              alt=""
              draggable="false"
            />
            <div class="play hidden-sm-and-down">
              <el-icon :size="27" :color="color"
                ><caret-right
              /></el-icon>
            </div>
          </div>
          <div class="data">
            <span class="title">{{ item.name }}</span>
            <div class="count">
              <el-icon :size="20"><video-play /></el-icon>
              {{ count(item.playCount) }}
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { Recommended } from '@/service/api/find';
import {
  ArrowRightBold,
  VideoPlay,
  CaretRight,
} from '@element-plus/icons-vue';
import { count } from '@/Utils/Utils';
import { theme, resizeSpan } from '@/global/index';

const list = ref<any[]>([]);
const { color } = storeToRefs(theme());
const { span } = storeToRefs(resizeSpan());

onMounted(async () => {
  const { data } = await Recommended({
    limit: 40,
  });
  list.value = data.result;
});
const router = useRouter();
const Details = (id: number) => {
  router.push({
    name: 'Details',
    params: {
      id: id,
    },
  });
};
</script>

<style scoped lang="less">
/* .el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
} */
@transition:all .3s;
.recommended {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  .title {
    font-size: 20px;
    color: var(---color);
    cursor: pointer;
    margin: 10px 0;
    font-weight: bold;
    ::v-deep(.el-icon) {
      color: var(---color);
      vertical-align: middle;
    }
  }
  .grid-content {
    width: 100%;
    position: relative;
    border-radius: 4px;
    min-height: 36px;
    margin-bottom: 20px;
    cursor: pointer;
    img {
      width: 100%;
      height: width;
      border-radius: 15px;
      transition: @transition;
    }
    .data {
      .title {
        width: 100%;
        color: var(---color);
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /* 这里是超出几行省略 */
        overflow: hidden;
        font-weight: 400;
        font-size: 15px;
      }
    }
    .count {
      position: absolute;
      top: 1%;
      right: 5%;
      color: #fff;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      opacity: 1;
      transition: @transition;
    }
    .play {
      position: absolute;
      left: 5%;
      bottom: 27%;
      width: 30%;
      height: 22%;
      background: #fff;
      border-radius: 50%;
      opacity: 0;
      transition: @transition;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .grid-content:hover {
    .play {
      opacity: 1;
      transform: translateY(-5px);
    }
    .count {
      opacity: 0;
    }
    img {
      transform: translateY(-5px) scale(1.01);
    }
  }
}
</style>
