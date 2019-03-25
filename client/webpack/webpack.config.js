const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const outputDirectory = '../dist';

module.exports = {
	entry: ['@babel/polyfill', './client/src/index.js'],
	devServer: {
		compress: true,
		contentBase: path.resolve(__dirname, outputDirectory),
		port: 3000,
		proxy: {
			'/api': 'http://localhost:8080',
		},
		historyApiFallback: true,
	},
	devtool: 'inline-source-map',
	module: {
		rules: [

			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/,
				use: [{
					loader: 'style-loader',
				},
				{
					loader: 'css-loader',
					options: {
						modules: true,
					},
				},
				{
					loader: 'sass-loader',
				},
				],
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
				loader: 'url-loader?limit=100000',
			},
		],
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
	output: {
		chunkFilename: '[name].[hash].js',
		filename: '[name].[hash].js',
		path: path.resolve(__dirname, outputDirectory),
		publicPath: '/',
	},
	plugins: [
		new CleanWebpackPlugin([outputDirectory], {
			allowExternal: true,
		}),
		new HtmlWebpackPlugin({
			template: './client/public/index.html',
			favicon: './client/public/favicon.ico',
		}),
		new WorkboxPlugin.GenerateSW({
			clientsClaim: true,
			skipWaiting: true,
		}),
	],
};
