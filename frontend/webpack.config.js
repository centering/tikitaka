const webpack = require('webpack');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = {
    entry: './src/index.js',

    output: {
        path: __dirname + '/public/',
        filename: '[name].[chunkhash].js',
        publicPath: '/',
        chunkFilename: '[name].js',
    },
    plugins: [
        new ManifestPlugin({
            fileName: 'assets.json',
            basePath: '/',
        }),
        new htmlWebpackPlugin({
            template: path.join(__dirname, '/src/index.html'),
            inject: true,
            filename: path.join(__dirname, '/public/index.' + makeid(5) + '.html'),

        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                },
                exclude: ['/node_modules'],
            },
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    optimization: {
        minimize: true,

        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    priority: 1,
                },
            },
        },
        concatenateModules: true,
    },
    // resolve: {
    //     modules: [
    //         path.join(__dirname, "src"),
    //         "node_modules"
    //     ]
    // },
    performance: {
        hints: false,
    },
};
