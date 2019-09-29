const path = require('path');

const options = {
  entry: path.join(__dirname, 'src', 'worker', 'worker.js'),
  output: {
    filename: 'cpu-thread.js',
    path: path.resolve(__dirname, 'dist')
  },
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
};

module.exports = function(env, argv) {
  const { mode } = argv;

  if (mode === 'production') {
    options.mode = 'production';
  } else if (mode === 'development') {
    options.mode = 'development';
    options.devtool = 'eval-source-map';
  }

  return options;
};
