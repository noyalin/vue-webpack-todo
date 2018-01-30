const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    target: 'web',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'babel-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.styl/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap:true
                        }
                    },
                    'stylus-loader'
                ]
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,//文件小于1024的话写入js
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin()
    ]
}

if (isDev) {
    config.devtool = '#cheap-module-eval-source-map'//方便页面调试配置
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',
        overlay: {
            error: true
        },
        hot: true //只加载更改的部分，不会整个页面都加载
        // historyFallback:{
        //
        // }
        //open:true //启动打开浏览器
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports = config


