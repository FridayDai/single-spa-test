const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const ENTRY = path.resolve(__dirname, 'index.js');
const DIST = path.resolve(__dirname, 'dist');

module.exports = {
    mode: 'development',
    entry: ENTRY,
    output: {
        path: DIST,
        filename: "[name]_[hash:8]_bundle.js",
        chunkFilename: "[name]_[chunkhash:8]_chunk_bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: ['/node_modules/', DIST],
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(less|scss|css|sass)$/,
                exclude: ['/node_modules/', DIST],
                use: [
                    'style-loader', 'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "autoprefixer",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
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
                exclude: ['/node_modules/', DIST],
                test: /\.(png|jpg|gif|svg|ttf|woff|eot)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        },
                    },
                ],
            }
        ]
    },

    resolve: {
        alias: {
            '@action': path.resolve(__dirname, 'src', 'action'),
            '@component': path.resolve(__dirname, 'src', 'component'),
            '@container': path.resolve(__dirname, 'src', 'container'),
            '@style': path.resolve(__dirname, 'src', 'style'),
            '@util': path.resolve(__dirname, 'src', 'util'),
            '@store': path.resolve(__dirname, 'src', 'store')
        }
    },

    devtool: "eval-source-map",
    devServer: {
        host: '0.0.0.0', // 你希望服务器外部可访问，指定
        port: 34568,
        contentBase: path.resolve(__dirname, 'dist'),
        historyApiFallback: true, // 不请求路径, 适合单页应用
        hot: true,
        inline: true,
        compress: true,
        proxy: {
            '*': {
                'target': 'https://106.15.93.13',
                'secure': false,
                'changeOrigin': true
            }
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Title',
            filename: 'index.html',
            template: path.resolve(__dirname, 'template.html')
        })
        // new BundleAnalyzerPlugin({
        //     'analyzerHost': '127.0.0.1',
        //     'analyzerPort': '56789',
        //     'defaultSizes': 'gzip'
        // })
    ]
};
