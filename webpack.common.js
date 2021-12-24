const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")
const copyWebpackPlugin = require("copy-webpack-plugin")
const workboxWebpackPlugin = require("workbox-webpack-plugin")
const WebpackPwaManifest = require("webpack-pwa-manifest")

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.(svg|eot|woff|woff2|ttf)$/,
                use:[
                    {
                        loader: "url-loader"
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                loader: "file-loader",
                options: {
                    outputPath: "gambar",
                    name: "[name].[ext]"
                }
            }
        ]
    },
    plugins: [
        new WebpackPwaManifest({
            name: "Info Bola Premier League",
            short_name: "IBPL",
            description: "Aplikasi website yang memberikan info Premier League",
            background_color: "#ff6f00",
            start_url: "/index.html",
            theme_color: "white",
            display: "standalone",
            icons: [
                {
                    src: path.resolve("public/gambar/icon.png"),
                    sizes: [96, 128, 192, 256, 384, 512]
                },
                {
                    src: path.resolve("public/gambar/icon.png"),
                    size: "1024x1024"
                },
                {
                    src: path.resolve("public/gambar/icon.png"),
                    size: "1024x1024",
                    purpose: "maskable"
                },
            ],
            gcm_sender_id: "240018584282"
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "index.html"
        }),
        new HtmlWebpackPlugin({
            template: "./public/detail.html",
            filename: "detail.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/favorite.html",
            filename: "pages/favorite.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/home.html",
            filename: "pages/home.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/klasemen.html",
            filename: "pages/klasemen.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/pertandingan.html",
            filename: "pages/pertandingan.html"
        }),
        new copyWebpackPlugin({
            patterns: [
                {
                    from: "./src/js/push.js",
                    to: "js/push.js"
                },
                {
                    from: "public/gambar/icon-192.png",
                    to: "gambar/icon/icon-192.png"
                },
            ]
        }),
        new workboxWebpackPlugin.InjectManifest({
            swSrc: "./src/service-worker.js",
            swDest: "service-worker.js",
        })
    ]
}