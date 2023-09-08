// React本地跨域处理craco的配置文件
module.exports = {
  // webpack 抽离公共代码（把第三方库抽离出来）
  webpack: {
    configure(webpackConfig) {
      if (webpackConfig.mode === 'production') {
        if (webpackConfig.optimization == null) {
          webpackConfig.optimization = {};
        }
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            antd: {
              name: 'antd-chunk',
              test: /antd/,
              priority: 100,
            },
            reactDom: {
              name: 'reactDom-chunk',
              test: /react-dom/,
              priority: 99,
            },
            vendors: {
              name: 'vendors-chunk',
              test: /node_modules/,
              priority: 98,
            },
          },
        };
      }
      return webpackConfig;
    },
  },

  devServer: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
};
