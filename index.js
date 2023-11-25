import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.js';

const compiler = Webpack(webpackConfig);

const devServerOptions = {
    ...webpackConfig.devServer,
    setupExitSignals: true
};
const server = new WebpackDevServer(devServerOptions, compiler);

server.startCallback(() => {
    console.debug(`Successfully started server on port ${webpackConfig.devServer.port}`);
});