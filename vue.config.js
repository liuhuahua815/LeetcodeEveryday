const { defineConfig } = require("@vue/cli-service");
const CompressionPlugin = require("compression-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: () => {
    if (process.env.NODE_ENV === "production") {
      return {
        plugins: [
          new CompressionPlugin({
            algorithm: "gzip",
            test: /\.(js|css)$/,
            threshold: 10240,
            deleteOriginalAssets: false,
          }),
        ],
      };
    }
  },
  // devServer: {
  //   // Paths
  //   host: "localhost",
  //   port: 8080,
  //   open: true,
  //   proxy: {
  //     // 配置跨域
  //     "/api": {
  //       target: `http://leetcodeeveryday.com/`, //请求后台接口
  //       changeOrigin: true, // 允许跨域
  //       pathRewrite: {
  //         "^/api": "http://leetcodeeveryday.com/api/lc/all_user_infos", // 重写请求
  //       },
  //     },
  //   },
  // },
});