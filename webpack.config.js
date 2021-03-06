const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production'

module.exports = (env) => {
  return {
    mode: env,
    devtool: 'inline-source-map',
    entry: './src/index.js',
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Output Management'
      }),
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.development.js',
      publicPath: '/'
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
    devServer: {
      historyApiFallback: true
    }
  };
};
