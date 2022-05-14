import container from './container.vue';
import router from './router/router';
import '@/style/reset.less';
import '@/style/global.less';
import '@/style/dark.less';
import 'element-plus/theme-chalk/display.css';
import 'element-plus/dist/index.css';

createApp(container)
  .use(router)
  .use(createPinia())
  .mount('#container');
