const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  const isProduction = env === "production";
  return {
    entry: path.join(__dirname, "src", "index.jsx"),
    output: {
      path: path.resolve(__dirname, "build"),
      publicPath: "/",
      filename: "bundle.js",
    },
    resolve: {
      alias: {
        components: path.resolve(__dirname, "src"),
      },
      extensions: [".js", ".jsx"],
    },
    devServer: {
      static: "./build",
      port: 3000,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.(css|scss)$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve("./public/index.html"),
      }),
    ],
    devtool: isProduction ? "source-map" : "inline-source-map",
  };
};
