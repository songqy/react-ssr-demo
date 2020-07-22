const { override, fixBabelImports, addLessLoader, addWebpackAlias, useBabelRc } = require('customize-cra');
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '.', dir);
}

module.exports = override(

    fixBabelImports('antd', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),

    useBabelRc(), // eslint-disable-line

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
