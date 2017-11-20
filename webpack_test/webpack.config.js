module.exports = {
	devtool: "eval-source-map",

	entry: __dirname + "/app/main.js",//__dirname是一个nodejs的全局变量，便是项目根目录
	output: {
		path: __dirname + "/public",
		filename: "bundle.js"
	},

	devServer: {
		contentBase: __dirname + "/public",
		historyApiFallback: true,
		inline: true
	}
}