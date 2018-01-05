const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PROD = process.env.NODE_ENV === 'production';

const cssLoader = 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]';

const config = {
  context: path.resolve(__dirname, 'app'),
  entry: ['index.js'],

  output: {
    filename: 'app.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['react-hot-loader/webpack', 'babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/,
        loader: PROD ?
          ExtractTextPlugin.extract(`${cssLoader}&minimize!postcss-loader`) :
          `style-loader!${cssLoader}!postcss-loader`,
      }
    ],
  },
  resolve: {
    modules: ['node_modules', 'app'],
    extensions: ['.js', '.json', '.css'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new ExtractTextPlugin('app.css'),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true,
    }),
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
  },
  devtool: '#inline-source-map',
};

module.exports = config;
