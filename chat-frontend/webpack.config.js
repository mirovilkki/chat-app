const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    context: path.join(__dirname, 'src'),

    resolve: {
        modules: ['src', 'node_modules']
    },

    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './index.js'
    ],

    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/'
    },

    devtool: 'inline-source-map',

    devServer: {
        hot: true,
        contentBase: path.join(__dirname, 'dist'),
        publicPath: '/',
        port: 8080
    },

    module: {
        rules: [{
                test: /\.jsx?$/,
                use: [ 'babel-loader' ],
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/
            }, {
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                include: path.join(__dirname, 'src'),
                options: {
                    configFile: './.eslintrc',
                    emitWarning: true
                }
            }, {
                test: /\.(css|scss)$/,
                use: [ 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader?outputStyle=expanded&sourceMap']
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ]
}
