module.exports = {
	devtool: "eval-source-map",

	entry: __dirname + "/app/main.js",
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