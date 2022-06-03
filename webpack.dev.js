const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'eval-source-map',
	devServer: {
		historyApiFallback: true,
		hot: true,
		allowedHosts: path.join(__dirname, 'dist'),
		port: 4000,
		client: {
			overlay: false,
		},
	},
});
