const { override, fixBabelImports, addLessLoader, addWebpackAlias, useBabelRc } = require('customize-cra');
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '.', dir);
}

// 去掉hash值，解决asset-require-hook资源问题
const cleanHash = () => config => {
    config.module.rules.forEach(d => {
        d.oneOf &&
      d.oneOf.forEach(e => {
          if (e && e.options && e.options.name) {
              e.options.name = e.options.name.replace('[hash:8].', '');
          }
      });
    });
    return config;
};

module.exports = override(
    cleanHash(),

    fixBabelImports('antd', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),

    useBabelRc(),

    // 添加 less 依赖
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
        },
    }),

    // 为文件夹取别名
    addWebpackAlias({
        '@': resolve('src'),
    }),
);
