
const webpack = require('webpack');
const path = require('path');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
module.exports = {

    entry:[

            './src/index.js'

    ],
    output: {
        path: '/',
        publicPath: '/',
        filename: 'bundle.js',
        chunkFilename: '[name].js',
    },

    devServer: {
        hot: true,
        host:'0.0.0.0',
        filename: 'bundle.js',
        publicPath: '/',
        // watchContentBase: true,
        historyApiFallback: { disableDotRule: true},
        contentBase: path.join(__dirname, '/public'),
        proxy: {
            '/api/v2/**': {target:'http://localhost:8000',changeOrigin:true}
        }
    },

    plugins: [

        new webpack.HotModuleReplacementPlugin(),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
            DEBUG: true
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
        new FlowBabelWebpackPlugin()


    ],
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            options: {
                presets: [

                    '@babel/preset-env',

                    '@babel/preset-react'
                ],
            },
            exclude: ['/node_modules'],
        },
            {
                test: /\.(css|less)$/,
                use: ["style-loader", "css-loader"]
            }],
    },
    optimization: {
        minimize: false,
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    priority: 1
                },
                vendor: {
                    test: /[\\/]node_modules[\\/](webpack|webpack-dev-server)[\\/]/,
                    name: 'webpack',
                    chunks: 'all',
                    priority: 2
                }
            }
        },
        concatenateModules: false,
    }

};

