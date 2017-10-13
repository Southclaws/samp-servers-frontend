const path = require("path");
const fs = require("fs");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    devtool: "inline-source-map",
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        before: function(app) {
            app.use(function pushStateHook(req, res, next) {
                var ext = path.extname(req.url);
                if ((ext === "" || ext === ".html") && req.url !== "/") {
                    res.setHeader("Content-Type", "text/html");
                    fs.createReadStream("./index.html").pipe(res);
                } else {
                    next();
                }
            });
        }
    }
});
