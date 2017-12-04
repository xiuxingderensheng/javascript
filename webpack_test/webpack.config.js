module.exports = {
	devtool: "eval-source-map",//eval-source-map适用于开发阶段，生产阶段别用

	//js打包配置
	entry: __dirname + "/app/main.js",//__dirname是一个nodejs的全局变量，指向当前执行脚本所在的目录
	output: {
		path: __dirname + "/public",
		filename: "bundle.js"
	},

	//开发服务器配置
	devServer: {
		contentBase: __dirname + "/public",
		historyApiFallback: true,
		inline: true
	},

	//loaders配置
	module: {
		rules: [
			{
				test: /\.json$/,
				use: {
					loader: "json-loader"
				}
			},
			{
				test: /(\.jsx||\.js)$/,//匹配loaders所处理文件的拓展名的正则表达式（必须）
				use: {
					loader: "babel-loader"//loader的名称
				},
				exclude: /node_modules/
			}
		]
	}
}