const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/',
		clean: true,
	},
	resolve: {
		extensions: ['.js', '.jsx', 'ts', 'tsx'],
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
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react',
							'@babel/typescript',
						],
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
			favicon: path.join(__dirname, 'public', 'favicon.ico'),
		}),
		new Dotenv(),
	],
};
