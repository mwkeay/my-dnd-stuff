const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.[contenthash].js",
    },
    target: "web",
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                    "ts-loader"
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                ],
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                // Uses ignore as HtmlWebpackPlugin handles index.html
                { from: "public", to: ".", globOptions: { ignore: ["**/index.html"] } },
            ],
        }),
        new ESLintPlugin({
            extensions: ["ts", "tsx", "js", "jsx", "json"],
        }),
        // HtmlWebpackPlugin adds replaces "main.js" with "main.[contenthash].js" in index.html
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html"),
        }),
    ],
    devServer: {
        port: "3000",
        static: ["./public"],
        open: false,
        hot: true,
        liveReload: true,
    },
};
