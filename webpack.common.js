const path = require("path");

module.exports = {
    entry: {
        main: "./index.tsx"
    },
    output: {
        filename: "[name].js",
        path: __dirname
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.(html)$/,
                loader: "html-loader",
                options: {
                    attrs: [":data-src"]
                }
            }
        ]
    }
};
