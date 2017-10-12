const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    devtool: "inline-source-map",
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }
});
