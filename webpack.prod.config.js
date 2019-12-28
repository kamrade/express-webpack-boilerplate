const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {

  entry: {
    main: './src/index.js',
  },

  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },

  target: 'web',

  devtool: 'source-map',

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },

  module: {
    rules: [
      {
        // ES6-8 to ES5
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        // Loads the js into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins section
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: { minimize: true }
        }]
      }, {
        // Loads CSS into a file when you import it via JS
        // Rules are set in MiniCssExtractPlugin
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        // use: ['file-loader']
        use: [{ loader: 'url-loader' }]
      }
    ]
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: './src/html/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]

}
