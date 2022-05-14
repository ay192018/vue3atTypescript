const { defineConfig } = require('@vue/cli-service');
const {
  ElementPlusResolver,
} = require('unplugin-vue-components/resolvers');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const IconsResolver = require('unplugin-icons/resolver');
const Icons = require('unplugin-icons/webpack');
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:
    process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'html',
  configureWebpack: {
    resolve: {
      alias: {
        '@/': path.resolve(__dirname, 'src'),
        '@/components': path.resolve(
          __dirname,
          'src/components',
        ),
        '@/views': path.resolve(__dirname, 'src/views'),
        '@/assets': path.resolve(__dirname, 'src/assets'),
        '@/plugins': path.resolve(__dirname, 'src/plugins'),
        '@/utils': path.resolve(__dirname, 'src/utils'),
        '@/mixins': path.resolve(__dirname, 'src/mixins'),
        '@/directives': path.resolve(
          __dirname,
          'src/directives',
        ),
        '@/filters': path.resolve(__dirname, 'src/filters'),
        '@/global': path.resolve(__dirname, 'src/global'),
        '@/service': path.resolve(__dirname, 'src/service'),
      },
    },
    plugins: [
      Icons({
        autoInstall: true,
        compiler: 'vue3',
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
      }),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: [
          // presets
          'vue',
          'vue-router',
          'pinia',
          {
            '@vueuse/core': [
              'useDark',
              'useToggle',
              ['useFetch', 'useMyFetch'],
            ],
            axios: [['default', 'axios']],
            '[package-name]': [
              '[import-names]',
              // alias
              ['[from]', '[alias]'],
            ],
          },
        ],
        resolvers: [
          ElementPlusResolver({
            /*  importStyle: "css", */
            exclude: new RegExp(
              /^(?!.*loading-directive).*$/,
            ),
          }),
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
        dts: './auto-imports.d.ts',
      }),
    ],
  },
  devServer: {
    port: 2000,
    proxy: {
      '/api': {
        target: 'http://www.codeman.ink:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
});
