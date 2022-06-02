const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
	entry: './src/index.jsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'@scss': path.resolve(__dirname, 'src/scss'),
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@routes': path.resolve(__dirname, 'src/routes'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@container': path.resolve(__dirname, 'src/container'),
			'@utils': path.resolve(__dirname, 'src/utils'),
			'@services': path.resolve(__dirname, 'src/services'),
			'@features': path.resolve(__dirname, 'src/features'),
		},
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
				},
			},
			{
				test: /\.(css|scss)$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpg|svg|jpeg|webp)$/,
				type: 'asset/resource',
				generator: {
					filename: 'assets/[name]_[hash][ext]',
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'public', 'index.html'),
		}),
		new Dotenv(),
	],
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
	},
	devServer: {
		historyApiFallback: true,
		allowedHosts: path.join(__dirname, 'dist'),
		port: 4000,
		client: {
			overlay: false,
		},
	},
};
