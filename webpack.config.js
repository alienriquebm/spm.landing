const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/js/app.js',
    contact: './src/js/contact.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // Absolute path for output
    filename: '[name].js', // Name of the generated js final file
    // publicPath: '/dist', // To tell the web dev server where to look the bundle
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      excludeChunks: ['contact'],
    }),
    new HtmlWebpackPlugin({
      filename: 'contact.html',
      template: './src/contact.html',
      chunks: ['contact'],
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      Popper: ['popper.js', 'default'],
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          }, // Creates the css final files
          'css-loader', // interpret import css files on js files
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          }, // Creates the css final files
          'css-loader', // 2) interpret import css files on js files
          'sass-loader', // webpack executes this 1) transform scss to css
        ],
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            interpolate: true,
          },
        },
      },
      {
        test: /\.(png|jpg|jepg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: 'images/', // this is for copy only the file
              publicPath: 'images/', // only for maintain the correct reference into the html file where the image is called
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};