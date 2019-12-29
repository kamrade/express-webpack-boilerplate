const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: {
    // main: './src/index.js',
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
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
          failOnError: false,
          failOnWarning: false
        }
      }, {
        test: /\.pug$/,
        loaders: [
          { loader: 'html-loader' },
          {
            loader: 'pug-html-loader',
            options: { 'pretty': true }
          }
        ]
      }, {
        // ES6-8 to ES5
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      // }, {
      //   test: /\.html$/,
      //   use: [{ loader: 'html-loader' }]
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
    new HtmlWebPackPlugin({
      title: 'index',
      template: './src/views/main.pug',
      filename: './index.html',
      excludeChunks: [ 'server' ]
    }),
    new HtmlWebPackPlugin({
      title: 'contacts',
      template: './src/views/contacts.pug',
      filename: './contacts.html',
      excludeChunks: [ 'server' ]
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]

}
