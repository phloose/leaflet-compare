const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { version } = require("./package.json");

const rules = [
    {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
    },
    {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
            {
                loader: "url-loader",
                options: {
                    limit: 8000,
                    name: "images/[hash]-[name].[ext]",
                },
            },
        ],
    },
];

module.exports = [
    {
        // embeddable jupyter-leaflet bundle
        entry: "./src/index.js",
        output: {
            filename: "leaflet-splitmap.js",
            path: path.resolve(__dirname, "dist"),
            publicPath: "/dist/",
        },
        devtool: "source-map",
        module: {
            rules,
        },
        externals: {
            leaflet: "L",
        },
        devServer: {
            index: "./index.html",
            publicPath: "./src/",
        },
        plugins: [new MiniCssExtractPlugin({
            filename: "leaflet-splitmap.css",
        })],
    },
];
