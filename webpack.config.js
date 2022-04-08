const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./app.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  target: "node",
  externals: [nodeExternals()],
  watch: true,
  module: {
    rules: [
      {
        test: "/.js?$/",
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },

  resolve: {
    extensions: ["*", ".js"],
  },
};
