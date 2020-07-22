const { override, fixBabelImports, addLessLoader, addWebpackAlias, useBabelRc, addWebpackPlugin } = require('customize-cra');
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

function resolve(dir) {
    return path.join(__dirname, '.', dir);
}

module.exports = override(

    fixBabelImports('antd', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),

    process.env.BUNDLE_ANA ? addWebpackPlugin(new BundleAnalyzerPlugin()) : null,

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
