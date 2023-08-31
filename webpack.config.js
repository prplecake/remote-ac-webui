const path = require("path")
const BundleTracker = require("webpack-bundle-tracker")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const {DefinePlugin} = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const commitHash = require("child_process")
  .execSync("git rev-parse --short HEAD")
  .toString().trim();
const commitBranch = require("child_process")
  .execSync("git branch --show-current")
  .toString().trim();
// const commitTag = require('child_process')
//   .execSync('git describe --tags --abbrev=0')
//   .toString().trim();

const repoUrl = "https://github.com/prplecake/remote-ac-homeserver";

module.exports = {
  entry: {
    webui: "./src/index.tsx",
  },
  output: {
    path: path.resolve("./dist/"),
    filename: "bundle-[hash].js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BundleTracker({
      path: __dirname,
      filename: "webpack-stats.json",
    }),
    new DefinePlugin({
      "COMMIT_HASH": JSON.stringify(commitHash),
      "COMMIT_BRANCH": JSON.stringify(commitBranch),
      // 'COMMIT_TAG': JSON.stringify(commitTag),
      "REPO_URL": JSON.stringify(repoUrl)
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
      },
      {
        test: /\.s?[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.html?$/,
        use: ["html-loader"]
      }
    ],
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: false,
    port: 9000,
  }
}