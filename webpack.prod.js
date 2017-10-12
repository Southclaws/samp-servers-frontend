const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(common, {
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": '"production"'
        })
        // does not work, no minification :(
        // new UglifyJSPlugin({
        //     ecma: 6,
        //     parse: {
        //         ecma: 6
        //     }
        // })
    ]
});
