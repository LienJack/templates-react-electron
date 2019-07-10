
let webpack = require("webpack")
let merge = require("webpack-merge")
let baseConfig = require("./baseConfig")
let {resolvePath, checkAndDownLoadDll, getEntry, getNPMParams} = require("./common/utils")
let  {NODE_ENV,distPath,port} =  require("./common/const")
let HtmlWebpackPlugin = require("html-webpack-plugin")
let CleanWebpackPlugin = require("clean-webpack-plugin")
let MiniCssExtractPlugin = require("mini-css-extract-plugin")
let CopyWebpackPlugin = require("copy-webpack-plugin")
let AddAssetHtmlPlugin =require("add-asset-html-webpack-plugin")
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css插件
checkAndDownLoadDll()
const  prod = NODE_ENV == "production"

const CmdParams = getNPMParams()

let plugins =  (()=>{
    let plugins = [
        // 直接 copy assets 至 build
        new CopyWebpackPlugin(
          [
              {from: resolvePath("./src/assets"), to: resolvePath("./build/assets") },
          ]
        ),
        // 暴露全局变量
        new webpack.ProvidePlugin({
            _: "lodash",
            ly: "ly",
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV" : JSON.stringify(NODE_ENV)
        }),
        // dll 引入
        new webpack.DllReferencePlugin({
            manifest: resolvePath(`./dll/manifest/renderer.json`),
            name: "renderer",
            sourceType: "var"
        }),


        ...(() => {
          const pages = getEntry('src/pages/*/*.html', CmdParams.page), list = []
          for (let pathname in pages) {
            list.push(new HtmlWebpackPlugin({
                filename: `${pathname}/index.html`, // html 文件输出路径
                chunks: [pathname],
                hash : true,
                inject: true,
                template: pages[pathname], // 模板路径
            }))
          }
          return list
        })(),

        // 页面追加：dll js 资源
        new AddAssetHtmlPlugin({
            filepath: resolvePath(`./build/dll/renderer.js`),
            publicPath: `/dll`,
            hash: true,
            includeSourcemap: false,
            typeOfAsset: "js",
            outputPath: "./../node_modules/.dll_cache"  // 插件定向拷贝配置，犀利了。 只好拷贝到看不见的地方……
        }),
    ]

    if(prod){
        plugins.unshift(// 清理产品产出
          new CleanWebpackPlugin(
            [
                resolvePath("./build/pages/**"),
                resolvePath("./build/assets/**"),
            ],
            {
                root: resolvePath(""),
                verbose: true
            }
          )
        )
        plugins = plugins.concat([
            // 提取CSS
            new MiniCssExtractPlugin({
                filename: `[name]/index.css?[hash]`,
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp:/\.css$/g,
                cssProcessor:require("cssnano"),
                cssProcessorPluginOptions:{
                    preset:['default',{discardComments:{removeAll:true}}]
                },
                canPrint:true
            })
        ])

    }
    return plugins
})()
module.exports =  merge.smart(baseConfig, {
    entry: getEntry('src/pages/*/main.js', CmdParams.page),
    output: {
        path: resolvePath(`./build`),
        filename: `[name]/index.js?[hash]`,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: prod  ? [
                    MiniCssExtractPlugin.loader ,
                    "css-loader",
                    'postcss-loader'
                ] : ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                use: prod  ?[
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    'postcss-loader',
                    "sass-loader"
                ] : ["style-loader" ,"css-loader", "sass-loader"]
            },
        ]
    },
    plugins,
    resolve: {
        modules: [resolvePath('node_modules')],
        alias: {
            /* 各种目录 */
            'ly': resolvePath('src/common'),
            'src': resolvePath('src'),
            'assets': resolvePath('src/assets'),
            'style': resolvePath('src/style'),
            'store': resolvePath('src/store'),
        },
        extensions: [ '.js','.jsx', 'scss',"css"]
    },
    mode: prod ? "production" :  "development"  ,
    devtool: prod ?  false : 'inline-source-map' ,
    devServer: {
        port,
        hot: true,
        contentBase:distPath,
        historyApiFallback: true,//不跳转,
    },
});
