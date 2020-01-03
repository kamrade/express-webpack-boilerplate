const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const HtmlWebPackPugPlugin = require('html-webpack-pug-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {

  stats: 'errors-only',
  // stats: 'none',

  entry: {
    main: ['webpack-hot-middleware/client?path=/__webpack_hmr&reload=true&timeout=20000', './src/index.js']
  },

  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },

  mode: 'development',

  target: 'web',

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          path.resolve(__dirname, 'sw_cached_pages.js')
        ],
        loader: 'babel-loader'
      }, {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [ 'style-loader', 'css-loader' ]
      }, {
        test: /\.s[ac]ss$/,
        exclude: /node_modules/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },

  watchOptions: {
    ignored: '/node_modules/'
  },

  plugins: [
    new CopyPlugin([{
      from: './src/views',
      to: 'views'
    }]),
    new CopyPlugin([{
      from: './sw_cached_pages.js',
      to: 'sw_cached_pages.js'
    }]),
    new CopyPlugin([{
      from: './sw_cached_site.js',
      to: 'sw_cached_site.js'
    }]),
    new HtmlWebPackPlugin({
      title: 'layout',
      template: './src/views/layouts/layout.pug',
      filename: './views/layouts/layout.pug',
      excludeChunks: [ 'server' ]
    }),
    new HtmlWebPackPugPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]

}
