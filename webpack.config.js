const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const options = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin({
      verbose: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  optimization: {
    splitChunks: {
        cacheGroups: {
          vendor: {
                test: /node_modules/,
                name: 'vendor',
                chunks: 'initial',
                enforce: true
            }
        }
    },
  },
};

module.exports = function(env, argv) {
  const { mode } = argv;

  if (mode === 'production') {
    options.mode = 'production';
  } else if (mode === 'development') {
    options.mode = 'development';
    options.devtool = 'eval';
  }

  return options;
};
