const path = require("path");
const { version } = require("./package.json");

const rules = [
    {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
    },
    {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
            {
                loader: "file-loader",
                options: {
                    publicPath: "/dist/",
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
        devServer: {
            index: "./index.html",
            publicPath: "./src/",
        },
    },
];
