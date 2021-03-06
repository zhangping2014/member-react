var path = require('path');
var webpack = require('webpack');
var NyanProgressPlugin = require('nyan-progress-webpack-plugin');

var src = path.join(__dirname, 'src'); // 开发源码目录
var commonPath = {
  rootPath: __dirname,
  distPath: path.join(__dirname, 'dist'), // 输出目录
  indexHTML: path.join(__dirname, 'index.html'),
  staticDir: path.join(__dirname, 'static') 
};

module.exports = {
  devtool: 'source-map',
  commonPath: commonPath,
  entry: {
    app: path.join(src, 'index.js'),
    vendor: [
      'history',
      'lodash',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-thunk',
      'react-weui'
    ]
  },
  output: {
    path: path.join(commonPath.distPath, 'static'),
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      API: path.join(src, 'api'),
      ACTION: path.join(src, 'redux/actions'),
      REDUCER: path.join(src, 'redux/reducers'),
      STORE: path.join(src, 'redux/store'),
      ASSET: path.join(src, 'assets'),
      COMPONENT: path.join(src, 'components'),
      UTIL: path.join(src, 'utils'),
      MIXIN: path.join(src, 'utils/mixins'),
      VIEW: path.join(src, 'views')
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css?$/,
        loaders : [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less?$/,
        loaders : [
          'style-loader',
          'css-loader',
          'less-loader?{"sourceMap": true}'
        ],
        include: path.join(__dirname, 'src')
      },
      { test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10240,
          //name: 'static/images/[sha512:hash:base64:7].[ext]'
          name: 'static/images/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new NyanProgressPlugin(),
    new webpack.optimize.OccurenceOrderPlugin()

  ]
};
