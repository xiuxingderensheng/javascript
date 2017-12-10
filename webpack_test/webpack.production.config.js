const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	devtool: "eval-source-map",//eval-source-map适用于开发阶段，生产阶段别用

	//js打包配置
	entry: __dirname + "/app/main.js",//__dirname是一个nodejs的全局变量，指向当前执行脚本所在的目录
	output: {
		path: __dirname + "/build",
		filename: "bundle-[hash].js"
	},

	//开发服务器配置
	devServer: {
		contentBase: __dirname + "/build",
		historyApiFallback: true,
		inline: true,
		hot: true
	},

	//loaders配置
	module: {
		rules: [
			{
				test: /(\.jsx|\.js)$/,//匹配loaders所处理文件的拓展名的正则表达式（必须）
				use: {
					loader: "babel-loader"//loader的名称
				},
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader",
						options: {
							modules: true
						}
					},
					{
						loader: "postcss-loader"
					}
				]
			}
		]
	},
	plugins: [
		new webpack.BannerPlugin("版权所有，盗版必究"),
		new HtmlWebpackPlugin({
			template: __dirname + "/app/index.tmpl.html"
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		new ExtractTextPlugin("style.css")
	]
}