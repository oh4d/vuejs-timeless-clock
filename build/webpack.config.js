let path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    VueLoaderPlugin = require('vue-loader/lib/plugin');

let config = {

    mode: 'development',

    entry: {
        app: './example/main.js',
    },

    output: {
        path: path.resolve(__dirname, './../example/dist'),
        filename: '[name].js',
    },

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules: ['node_modules'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'eslint-loader'
                    },
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        sourceMap: true,
                    }
                }]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.s[ac]ss$/,
                exclude: /(node_modules|bower_components)/,
                use: ['vue-style-loader', 'css-loader', 'sass-loader'],
            }
        ]
    },

    devServer: {
        open: 'google chrome',
        contentBase: path.join(__dirname, './../example/dist'),
        compress: true,
        port: 9000
    },

    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './../index.html'),
            inlineSource: '.(js|css)$'
        })
    ],
};

module.exports = config;