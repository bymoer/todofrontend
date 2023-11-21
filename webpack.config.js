const path = require("path")

module.exports = {
        entry: "./src/index.tsx",
        output: {
                filename: "main.js",
                path: path.resolve(__dirname, "dist")
        },
		plugins: [
                new HtmlWebpackPlugin({
                        template: './src/index.ejs',
                        inject: 'body',
                        chunks: 'main',
                        title: 'To Do DB App',
                        filename: 'index.html',
                        hash: true
                }),
        ],
		devServer: {
                static: path.join(__dirname, "dist"),
                port: 9000
        },
        module: {
                rules: [
                        {
                                test: /\.(ts|tsx)$/,
                                exclude: /(node_modules)/,
                                use: {
                                        loader: 'babel-loader',
                                        options: {
                                                presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
                                        }
                                }
                        },
                        {
                                test: /\.css$/,
                                use: [
                                        {loader: 'style-loader'},
                                        {loader: 'css-loader'}
                                ]
                        },
                        {
                                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                                type: 'asset/resource',
                        }
                ]
        },
        resolve: {
                extensions: ['.tsx', '.ts', '.js'],
        },
        mode: 'development'
}