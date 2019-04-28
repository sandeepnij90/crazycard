const webpack = require('webpack');
const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');
const extractPlugin = new extractTextPlugin({
    filename: 'index.css'
});
const htmlPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devServer:{
        historyApiFallback: true,
        proxy: {
            '/api/*': {
                target: 'http://localhost:5000'
            }
        }
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                use:[
                    {
                        loader: 'babel-loader',
                        options: {
                            compact: false,
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader','sass-loader']
                })
            },
            {
                test: /\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.(jpg|png|svg)$/,
                use:{
                    loader: 'file-loader',
                    options:{
                        name:'[name].[ext]',
                        outputPath: 'img/'
                    }
                }

            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
        ]
    }, plugins: [
        extractPlugin,
        new htmlPlugin({
            template: 'src/index.html'
        })
    ]
}