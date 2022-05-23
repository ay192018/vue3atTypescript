<template>
  <div class="QrCode">
    <h1>扫码登录</h1>
    <div class="code">
      <el-image
        :src="dataURL"
        fit="cover"
        v-loading="loading"
        :element-loading-spinner="svg"
        element-loading-svg-view-box="-10, -10, 50, 50"
        element-loading-background="rgba(122, 122, 122, 0.8)"
      />
    </div>
    <div
      v-if="
        dataURL ===
        'https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9765284460/1b1d/9f46/2fa3/2d5d07bb5fcf8c24c1ad788c923ef313.png'
      "
    >
      <span>扫描成功</span>
      <h3>请在手机上确认登录</h3>
    </div>
    <el-link @click="changeLogin">手机号登录</el-link>
  </div>
</template>

<script setup lang="ts">
import {
  QrCode,
  CreateQrCode,
  QrCodeStatus,
  refreshStatus,
  loginStatus,
} from '@/service/api/login';
import { theme, login, User } from '@/global/index';
import { ElLoading } from 'element-plus';
const { color } = storeToRefs(theme());
const { loginShow } = storeToRefs(login());
const { cookie, profile } = storeToRefs(User());
const dataURL = ref<string>('');
const key = ref<string>('');
const loading = ref<boolean>(true);
const timer = ref<unknown>(null);
import { ElNotification } from 'element-plus';
const emit = defineEmits<{
  (e: 'switchState'): void;
}>();
const changeLogin = () => {
  emit('switchState');
};
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;
onMounted(() => {
  QrCode()
    .then(({ data }) => {
      key.value = data?.data?.unikey;
      CreateQrCode({
        key: key.value,
        qrimg: true,
      }).then(({ data }) => {
        dataURL.value = data?.data?.qrimg;
        loading.value = false;
      });
    })
    .catch((err) => {});
  timer.value = setInterval(() => {
    QrCodeStatus({
      key: key.value,
      timerstamp: Date.now(),
    }).then(({ data }) => {
      console.log(data);
      if (data.code === 801) {
      } else if (data.code === 802) {
        dataURL.value =
          'https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9765284460/1b1d/9f46/2fa3/2d5d07bb5fcf8c24c1ad788c923ef313.png';
      } else if (data.code === 803) {
        cookie.value = data.cookie;
        /*    console.log(JSON.parse(data.cookie)); */

        localStorage.setItem(
          'cookie',
          JSON.stringify(data.cookie),
        );

        ElNotification({
          title: '登录成功',
          message: `欢迎回来，${profile?.value?.nickname}`,
          position: 'top-left',
        });
        loginStatus({
          timerstamp: Date.now(),
          cookie: cookie.value,
        }).then(({ data }) => {
          profile.value = data.data.profile;
          /*   console.log(profile.value); */
          loginShow.value = false;
        });
      } else if (data.code === 800) {
        console.log('登录完毕');
        loginStatus({
          timerstamp: Date.now(),
          cookie: cookie.value,
        }).then(({ data }) => {
          profile.value = data.data.profile;
          console.log(profile.value);

          loginShow.value = false;
        });
        clearInterval(timer.value as any);
      }
    });
  }, 1000);
});

watchEffect(() => {
  if (!loginShow.value) clearInterval(timer.value as any);
});
</script>

<style scoped lang="less">
.QrCode {
  width: 100%;
  height: 100%;
  .code {
    width: 50%;
    height: 32%;

    margin: 30% auto;
  }
  ::v-deep(.el-link:hover) {
    color: v-bind(color);
  }
  ::v-deep(.el-link) {
    margin-top: 20%;
    font-size: 15px;
  }
}
</style>
