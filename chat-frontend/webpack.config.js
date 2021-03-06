const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    context: path.join(__dirname, 'src'),

    resolve: {
        modules: [path.join(__dirname, 'src'), 'node_modules']
    },

    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
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
        rules: [
            {
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
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader?modules&localIdentName=[local]___[hash:base64:5]&sourceMap' },
                        { loader: 'postcss-loader', options: { sourceMap: true } },
                        { loader: 'sass-loader?outputStyle=expanded&sourceMap' }
                    ]
                })
            }, {
                loader: 'sass-loader',
                include: path.join(__dirname, 'src', 'styles')
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            inject: false
        }),
        new ExtractTextPlugin({ filename: 'assets/styles/styles.css', disable: true })
    ]
}
