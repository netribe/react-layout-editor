
const webpack = require("webpack");
const path = require('path');
const sourceFolder = path.join(__dirname, '../source');
const entry = path.resolve(__dirname, './index.js');
const VERSION = 1;

const publicPath = '/build/';
const outputPath = path.join(__dirname, 'build');

module.exports = function (env) {
    let vars = env || {
        "version": VERSION,
        "hot": false
    };
    console.info("Building application. Version:", vars.version);
    let config = {
        entry: entry,
        devtool: 'source-map',
        output: {
            path: outputPath,
            filename: '[name].bundle.js?v=[chunkhash:4]',
            publicPath: publicPath

        },
        optimization: {
            splitChunks: {
                chunks: "async",
                minSize: 5000,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                name: true,
                cacheGroups: {
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    }
                }
            }
        },

        module: {
            rules: [
                
                {
                    test: /(\.js|\.jsx)$/,
                    exclude: /node_modules/,
                    use: {
                            loader: "babel-loader"
                        }
                },
                {
                    test: /\.worker\.js$/,
                    use: { loader: 'worker-loader' }
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader",
                            options: {minimize: true}
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']

                },
                {
                    test: /\.scss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /masonry|imagesloaded|fizzy\-ui\-utils|desandro\-|outlayer|get\-size|doc\-ready|eventie|eventemitter/,
                    use: {
                        loader: 'imports-loader?define=>false&this=>window'
                    }
                },
                {
                    test: /.png$/,
                    use: {
                        loader: "url-loader?mimetype=image/png"
                    }
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: {
                        loader: "url-loader?limit=10000&minetype=application/font-woff"
                    }
                },
                {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: ["file-loader"]
                }
            ]
        },
        resolve: {
            modules: [
                "node_modules",
                sourceFolder // treat the 'source' directory like node_modules
            ],
            alias: {
                "resources": __dirname + "/resources"
            }
        },

        watchOptions: {
            ignored: /node_modules/
        },

        plugins: [
            // new HtmlWebPackPlugin({
            //     title: "Stemplate",
            //     rootUri: "/",
            //     version: vars.version,
            //     minify: true,
            //     cache: true,
            //     showErrors: true,
            //     filename: path.resolve(__dirname, './index.html'),
            //     inject: false,
            //     template: path.resolve(__dirname, './index.ejs'), // Load a custom template (ejs by default see the FAQ for details)
            // }),
            // new webpack.DllReferencePlugin({
            //     context: __dirname,
            //     manifest: require('./output/build/library.json')
            // })
        ]
    }
    return config;
};


/*

const path = require('path');
const entry = path.resolve(__dirname, 'source/index.js');

const distPath = path.join(__dirname, 'dist');
module.exports = function (env) {
    let config = {
        entry: entry,
        devtool: "source-map",
        output: {
            path: distPath,
            filename: "[name].bundle.js?v=[chunkhash:4]",
        },
        optimization: {
            splitChunks: {
                chunks: "async",
                minSize: 5000,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                name: true,
                cacheGroups: {
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    },
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    }
                }
            }
        },

        module: {
            rules: [
                {
                    test: /(\.js|\.jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                // {
                //     test: /\.worker\.js$/,
                //     use: { loader: 'worker-loader' }
                // },
                // {
                //     test: /\.html$/,
                //     use: [
                //         {
                //             loader: "html-loader",
                //             options: {minimize: true}
                //         }
                //     ]
                // },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                }
                // {
                //     test: /\.scss$/,
                //     use: ['style-loader', 'css-loader', 'sass-loader']
                // },
                // {
                //     test: /.png$/,
                //     use: {
                //         loader: "url-loader?mimetype=image/png"
                //     }
                // },
                // {
                //     test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                //     use: {
                //         loader: "url-loader?limit=10000&minetype=application/font-woff"
                //     }
                // },
                // {
                //     test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                //     use: ["file-loader"]
                // }
            ]
        },
        resolve: {
            modules: ["node_modules_local", "node_modules"],
            alias: path.resolve(__dirname, 'ui')
        },

        watchOptions: {
            ignored: /node_modules/
        },

        plugins: [
            // new HtmlWebPackPlugin({
            //     title: "Stemplate",
            //     rootUri: "/",
            //     version: vars.version,
            //     minify: true,
            //     cache: true,
            //     showErrors: true,
            //     filename: path.resolve(__dirname, './index.html'),
            //     inject: false,
            //     template: path.resolve(__dirname, './index.ejs'), // Load a custom template (ejs by default see the FAQ for details)
            // }),
        ]
    };
    return config;
};

*/