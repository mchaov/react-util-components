const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function isProd(mode) {
    return mode === "production"
}

module.exports = (mode, outputFolder, entryPath, tsconfigPath, fileSuffix, srcRoot) => {
    return {
        mode: mode,
        entry: { index: entryPath },
        devtool: "source-map",
        output: {
            filename: `[name]${fileSuffix && "." + fileSuffix}.js`,
            path: path.resolve(__dirname, "../", "dist", outputFolder),
            library: "__APP",
            libraryTarget: "umd"
        },
        resolve: {
            modules: [path.resolve(__dirname, "..", "src"), "node_modules"],
            extensions: [".ts", ".tsx", ".js", ".wasm", ".mjs", ".json", ".less"],
            alias: {
                types: path.resolve(srcRoot, "types"),
                helpers: path.resolve(srcRoot, "helpers")
            }
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: "ts-loader",
                        options: {
                            configFile: path.resolve(tsconfigPath)
                        }
                    }],
                },
                {
                    test: /\.(less)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            // options: { url: false }
                        },
                        {
                            loader: "less-loader",
                            options: {
                                sourceMap: true
                            },
                        }
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "[name].[ext]",
                                outputPath: "assets"
                            }
                        }

                    ],
                },
            ],
        },
        optimization: {
            splitChunks: {
                chunks: "initial",
                name: "vendor"
            },
            runtimeChunk: {
                name: "manifest",
            },

        },
        plugins: [
            new webpack.DefinePlugin({
                IS_PRODUCTION: JSON.stringify(isProd(mode)),
                IS_DEVELOPMENT: JSON.stringify(!isProd(mode)),
                "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
            }),
            new MiniCssExtractPlugin({
                filename: `[name]${fileSuffix && "." + fileSuffix}.css`,
            }),
            ...isProd(mode) ? [
                new BundleAnalyzerPlugin({
                    openAnalyzer: false,
                    analyzerMode: "static",
                    reportFilename: `REPORT-${outputFolder}.html`
                })
            ] : []
        ]
    }
};