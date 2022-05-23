<template>
  <div class="collectionList">
    <el-row :gutter="20">
      <el-col
        :span="collectionSpan"
        v-for="(item, index) in list.subscribers"
        :key="index"
      >
        <div class="grid-content">
          <div class="userAvatar">
            <el-image
              style="
                width: 100px;
                height: 100px;
                border-radius: 50%;
              "
              :src="item.avatarUrl"
              fit="cover"
            />
          </div>
          <div class="userData ellipsis">
            <span
              >{{ item.nickname
              }}<el-icon
                color="#BFF3FF"
                :size="30"
                v-if="item.gender === 1"
                ><Male
              /></el-icon>
              <el-icon color="#F389B8" :size="30" v-else
                ><Female /></el-icon></span
            ><br />
            <span>{{ item.signature }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="list.total"
      :page-size="60"
      @current-change="handleCurrentChange"
      @next-click="offset + 1"
      @prev-click="offset - 1"
      :current-page="offset"
    />
  </div>
</template>

<script setup lang="ts">
import { watchPostEffect } from 'vue-demi';
import { subscribers } from '@/service/api/find';
import { Female, Male } from '@element-plus/icons-vue';
import { theme, resizeSpan } from '@/global/index';
const { collectionSpan } = storeToRefs(resizeSpan());
const { color } = storeToRefs(theme());
const result = defineProps({
  id: {
    type: Number,
    required: true,
  },
});
const offset = ref<number>(0);
const list = reactive<any>({
  subscribers: [],
  total: 0,
});
watchPostEffect(async () => {
  /*  console.log(result.id); */
  if (result.id) {
    const { data } = await subscribers({
      id: result.id,
      limit: 20,
      offset: offset.value,
    });
    list.subscribers = data.subscribers;
    list.total = data.total;
    console.log(data, offset.value);
  }
});
const handleCurrentChange = (page: number) => {
  offset.value = page;
};
</script>

<style scoped lang="less">
.collectionList {
  ::v-deep(.el-row):last-child {
    margin-bottom: 0;
  }
  ::v-deep(.el-col) {
    border-radius: 4px;
    margin: 1% 0;
  }

  .grid-content {
    display: flex;
    align-items: center;
    min-height: 36px;
    .userData {
      display: inline;
      vertical-align: middle;
      margin-left: 10%;

      & {
        span {
          line-height: 2.5;
          color: var(---color);
        }
      }
    }
  }
  ::v-deep(.el-pagination.is-background
      .el-pager
      li:not(.is-disabled).is-active) {
    background: v-bind(color);
  }
  ::v-deep(.el-pagination.is-background
      .el-pager
      li:not(.is-disabled):hover) {
    color: v-bind(color);
  }
  ::v-deep(.el-pagination) {
    margin-left: 50%;
    transform: translate(-50%);
  }
}
</style>
