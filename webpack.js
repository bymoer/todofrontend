import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import url from 'url';

export default {
    mode: 'development',
    devtool: "eval-source-map",
    target: "web",
    context: path.join(url.fileURLToPath(new URL('.', import.meta.url)), 'src'),
    stats: {
        children: true,
        errorDetails: true
    },
    entry: {
        main: [
            './index.tsx'
        ]
    },
    output: {
        path: path.join(url.fileURLToPath(new URL('.', import.meta.url)), 'public'),
        filename: '[fullhash].bundle.js',
        publicPath: '/'
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.ejs', '.scss', '.css', '.json', 'png', 'svg', 'jpeg', 'jpg', 'gif', 'woff', 'woff2', 'eot', 'ttf', 'otf']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.ejs',
            inject: 'body',
            chunks: 'main',
            title: 'Michaels Project',
            filename: 'index.html',
            hash: true
        }),
        new webpack.NoEmitOnErrorsPlugin()
        // ,
        // new CopyPlugin({
        //     patterns: []
        //     //     "favicon.ico"
        //     // ].filter(pattern => typeof pattern === 'string' && fs.existsSync("./src/" + pattern))
        // })
    ],
    module: {
        rules: [
            {
                test: /\.m?[jt]sx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ["@babel/preset-modules", {}],
                            ["@babel/preset-react", {
                                "runtime": "automatic",
                                "development": true
                            }],
                            ["@babel/preset-typescript", {
                                "isTSX": true,
                                "allExtensions": true
                            }]
                        ]
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    'postcss-loader',
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.ejs?$/i,
                use: [{
                    loader: 'ejs-loader',
                    options: {
                        esModule: false
                    }
                }]
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource'
            }
        ]
    },
    devServer: {
        webSocketServer: 'ws',
        allowedHosts: 'auto',
        compress: true,
        port: 3000,
        watchFiles: {
            paths: ['src/**/*', 'public/**/*'],
            options: {
              usePolling: process.env.CHOKIDAR_USEPOLLING,
            },
        },
        proxy: {
            '/api':'http://localhost:5000',
        }
    }
};