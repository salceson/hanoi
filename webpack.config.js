const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PROD = process.env.NODE_ENV === 'production';

const cssLoader = 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]';

const mainPlugins = [
  new HtmlWebpackPlugin({
    template: 'index.html',
    inject: true,
  }),
];

const prodPlugins = [
  new ExtractTextPlugin('app-[hash].css'),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: true,
      drop_console: true,
    },
  }),
];

const devPlugins = [
  new webpack.NamedModulesPlugin(),
];

const plugins = mainPlugins.concat(PROD ? prodPlugins : devPlugins);

const config = {
  context: path.resolve(__dirname, 'app'),
  entry: ['index.js'],

  output: {
    filename: 'app-[hash].js',
    publicPath: PROD ? '/hanoi/' : '/',
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
      },
    ],
  },
  resolve: {
    modules: ['node_modules', 'app'],
    extensions: ['.js', '.json', '.css'],
  },
  plugins,
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
  },
  devtool: PROD ? 'source-map' : 'inline-source-map',
};

module.exports = config;
