var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path')

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
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
        // filename: 'bundle.js'
    },
    plugins: [

        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production',
            DEBUG: false
        }),
        new ManifestPlugin({
            fileName: 'assets.json',
            basePath: '/'
        }),
        new htmlWebpackPlugin({
            template: path.join(__dirname, '/src/index.html'),
            inject: true,
            filename: path.join(__dirname, '/public/index.'+makeid(5)+'.html')
        })

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
        minimize: true,

        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    priority: 1
                },

            }
        },
        concatenateModules: true,
    },
    performance: {
        hints: false
    }

};

