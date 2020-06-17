const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
module.exports = {
    devServer: {
        proxy: 'https://www.baidu.com/',  // 这行解决本地开发跨域问题
    },
    configureWebpack: {
        plugins: [
            new MonacoWebpackPlugin({
                languages: ["yaml"]
            })
        ]
    }
};
