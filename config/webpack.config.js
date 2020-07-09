
const os = require('os');
const path = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const HappyPack = require('happypack');
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
// const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
// const autoprefixer = require('autoprefixer');

const publicPath = path.resolve(__dirname, 'public');
const srcPath = path.resolve(__dirname, 'src');
// const libPath = path.resolve(__dirname, 'lib');
// const distPath = path.resolve(__dirname, 'dist');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
// const CleanWebpackPlugin = require('clean-webpack-plugin')


const rootPath = path.resolve(__dirname, '../');

module.exports = {
        mode: 'development',
        devtool: 'cheap-module-eval-source-map',
        entry: [path.resolve(rootPath, 'server/app.js')],
        output: {
            path: path.resolve(rootPath, 'build'),
            filename: 'server.js',
            libraryTarget: 'commonjs2',
            publicPath: '/'
        },
        target: 'node',
        node: {
            __dirname: true,
            __filename: true
        },
        externals: nodeExternals({
            // load non-javascript files with extensions, presumably via loaders
            whitelist: [/\.(?!(?:jsx?|json)$).{1,5}$/i]
        }),
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules)/,
                    use: ['happypack/loader?id=jsx']
                },
                {
                    test: /\.(css|scss)$/,
                    use: ['ignore-loader']
                },
                {
                    test: /\.(png|jpg|jpeg|gif|mp4|ogg|svg|woff|woff2|ttf|eot)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'static/media'
                        }
                    }
                }
            ]
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
        //                 reuseExistingChunk: true
        //             }
        //         }
        //     }
        // },
        resolve: {
            extensions: ['.js', '.jsx', '.css', '.scss'],
            modules: [srcPath, 'node_modules'],
            alias: {
                '@': path.resolve(rootPath, 'src'),
                // global: path.resolve(publicPath, 'sass/_global.scss')
            }
        },
        // performance: {
        //     hints: false
        // },
        plugins: [
            // new HardSourceWebpackPlugin(),
            // new webpack.ProvidePlugin({
            //     'window.Quill': 'quill'
            // }),
            new HappyPack({
                id: 'jsx',
                threadPool: happyThreadPool,
                loaders: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: [
                                ["@babel/plugin-proposal-decorators",{"legacy": true }],
                                "@babel/plugin-transform-runtime",
                                "react-hot-loader/babel",
                                "add-module-exports",
                                "@babel/plugin-proposal-class-properties",
                                "@babel/plugin-proposal-object-rest-spread",
                            ]
                        }
                    }
                ]
            })
            //,new webpack.HotModuleReplacementPlugin()
        ]
};