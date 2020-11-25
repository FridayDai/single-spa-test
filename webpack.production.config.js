const path = require('path');
const ENTRY = path.resolve(__dirname, 'index.js');
const DIST = path.resolve(__dirname, 'dist');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlwebpackplugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isProductiongEnv = process.env.NODE_ENV === 'production';

const plugins = [
    new htmlwebpackplugin(
        {
            'title': 'Title',
            'template': 'template.html',
            'chunks': ['index'],
            'filename': 'index.html',
            // 'vendor': DLL,
            'minify': {
                'removeComments': true,
                'collapseWhitespace': true
            }
        }
    ),
    new MiniCssExtractPlugin({
        'filename': 'css/[name]_[hash:8].css'
    }),
    new CleanWebpackPlugin()
];

module.exports = {
    mode: 'production',
    entry: {
        'index': ENTRY
    },
    output: {
        path: DIST,
        publicPath: '/',
        chunkFilename: 'bundle-[name]-[chunkhash:8].js',
        filename: 'bundle_[name]_[hash:8].js' // 结束最终JS文件
    },
    resolve: {
        alias: {
            '@action': path.resolve(__dirname, 'src', 'action'),
            '@component': path.resolve(__dirname, 'src', 'component'),
            '@container': path.resolve(__dirname, 'src', 'container'),
            '@style': path.resolve(__dirname, 'src', 'style'),
            '@util': path.resolve(__dirname, 'src', 'util'),
            '@store': path.resolve(__dirname, 'src', 'store'),
        }
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 3,
                    minSize: 0
                }
            }
        }
    },
    'module': {
        'rules': [
            {
                'test': /\.jsx?$/,
                'exclude': /node_modules/,
                'use': [
                    {
                        'loader': 'babel-loader'
                    }
                ]
            },
            {
                'test': /\.(less|scss|css)$/,
                'use': [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        'loader': 'postcss-loader',
                        'options': { // 如果没有options这个选项将会报错 No PostCSS Config found
                            'plugins': loader => [
                                require('autoprefixer')() // CSS浏览器兼容
                            ]
                        }
                    },
                    {
                        'loader': 'less-loader',
                        'options': {
                            'javascriptEnabled': true
                        }
                    }
                ]
            },
            {
                'test': /\.(png|jpg|gif|svg|ttf|woff|eot)$/,
                'use': ['url-loader?limit=100000&name=assets/[name]_[hash:8].[ext]']
            }
        ]
    },
    'plugins': plugins
};
