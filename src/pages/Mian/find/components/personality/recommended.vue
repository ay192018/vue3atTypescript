<template>
  <div class="recommended">
    <div class="title">
      推荐歌单
      <el-icon><ArrowRightBold /></el-icon>
    </div>
    <el-row :gutter="20">
      <el-col
        :span="4"
        @click="Details(item.id)"
        v-for="(item, index) in list"
        :key="index"
        ><div class="grid-content">
          <img :src="item.picUrl" alt="" draggable="false" />
          <div class="data">
            <span class="title">{{ item.name }}</span>
            <div class="count"></div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { Recommended } from '@/service/api/find';
import { ArrowRightBold } from '@element-plus/icons-vue';

const list = ref<any[]>([]);
onMounted(async () => {
  const { data } = await Recommended({
    limit: 40,
  });
  list.value = data.result;
  /*   console.log(data.result) */
});
const router = useRouter();
const Details = (id: string | number) => {
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
.recommended {
  width: 100%;
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
    position: relative;
    border-radius: 4px;
    min-height: 36px;
    margin-bottom: 20px;
    cursor: pointer;
    img {
      width: 100%;
      height: width;
      border-radius: 15px;
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
  }
}
</style>
