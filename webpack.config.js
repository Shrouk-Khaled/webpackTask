const pathModule = require("path")
const htmlPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = 
{
  entry: "./src/index.js",
  output: {
    filename: "bundle.js"
    , path:  pathModule.resolve(__dirname, "build"),
    assetModuleFilename: 'images/[name][ext]'
  },
  mode: "production",
  module:{
    rules: [
        {
            test: /\.css$/i,
            use:  [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              // Creates `style` nodes from JS strings
              MiniCssExtractPlugin.loader,
              // Translates CSS into CommonJS
              "css-loader",
              // Compiles Sass to CSS
              "sass-loader",
            ],
          },
    ]
  },
  plugins:[
    new htmlPlugin(),
    new MiniCssExtractPlugin(),    
    new ImageMinimizerPlugin({
        minimizerOptions: {
            // Lossless and lossy optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["mozjpeg",{quality:70}],
              ["optipng", { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
             ['svgo']
            ],
        },
      }),
  ],
  optimization:{
    minimize:true,
    minimizer:[
      
      "...",
    ]
  }
}