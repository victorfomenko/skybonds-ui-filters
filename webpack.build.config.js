var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './src/UIFilters',
  output: {
    path: __dirname,
    filename: 'index.js',
    library: '',
    libraryTarget: 'commonjs2'
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],
  module: {
    loaders: [{
      test: /(\.jsx?$|\.js?$)/,
      loaders: ['babel'],
      exclude: /(node_modules|bower_components)/,
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.sass$/,
      loaders: ["style-loader", "css-loader", "sass-loader"]
    }]
  }
};