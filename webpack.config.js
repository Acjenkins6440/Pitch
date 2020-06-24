const path = require('path');

const devMode = process.env.NODE_ENV !== 'production'

module.exports = (env) => {
  return {
    mode: env,
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.development.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.(scss|sass|css)$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
        {

          test:  /\.(png|jpe?g|gif)$/i,
          use: [{
            loader: 'file-loader'
          }]
        }
      ],
    },
  };
};
