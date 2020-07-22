
const os = require('os');
const path = require('path');

const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


const rootPath = path.resolve(__dirname, '../');
const srcPath = path.resolve(rootPath, 'src');


const plugins = [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new HappyPack({
        id: 'jsx',
        threadPool: happyThreadPool,
        loaders: [
            {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react',
                    ],
                    plugins: [
                        '@babel/plugin-transform-runtime',
                        ['import', {
                            'libraryName': 'antd',
                            'libraryDirectory': 'lib',
                            // 'style': true,
                        }],
                        // ["@babel/plugin-proposal-decorators",{"legacy": true }],
                        // "react-hot-loader/babel",
                        // "add-module-exports",
                        // "@babel/plugin-proposal-class-properties"
                    ],
                },
            },
        ],
    }),
];

if (process.env.BUNDLE_ANA) {
    plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
    mode: 'development',
    // mode: 'production',
    devtool: 'cheap-module-eval-source-map',
    // devtool: 'cheap-module-source-map',
    entry: [path.resolve(rootPath, 'server/app.js')],
    output: {
        path: path.resolve(rootPath, 'serverbuild'),
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        publicPath: '/',
    },
    target: 'node',
    node: {
        __dirname: true,
        __filename: true,
    },
    externals: nodeExternals({
        // load non-javascript files with extensions, presumably via loaders
        whitelist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
    }),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: ['happypack/loader?id=jsx'],
            },
            {
                test: /\.(css|scss|less)$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        // server 必须加这个，否则css module有问题
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[local]--[hash:base64:5]',
                            },
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|mp4|ogg|svg|woff|woff2|ttf|eot)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'static/media',
                    },
                },
            },
        ],
    },
    // optimization: {
    //     minimize: false,
    //     splitChunks: {
    //         chunks: 'all',
    //         name: false,
    //         minChunks: 2,
    //         cacheGroups: {
    //             default: false,
    //             vendors: false,
    //             common: {
    //                 test: /\.jsx?$/,
    //                 name: 'common',
    //                 reuseExistingChunk: true,
    //             },
    //         },
    //     },
    // },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', '.less'],
        modules: [srcPath, 'node_modules'],
        alias: {
            '@': path.resolve(rootPath, 'src'),
            'src': path.resolve(rootPath, 'src'), // less 需要这个
        },
    },
    plugins,
};
