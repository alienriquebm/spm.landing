const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // Absolute path for output
    filename: 'bundle.js', // Name of the generated js final file
    publicPath: '/dist', // To tell the web dev server where to look the bundle
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader', // 3) inyect the css styles to final file
          'css-loader', // 2) interpret import css files
          'sass-loader', // webpack executes this 1) transform scss to css
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