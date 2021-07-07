const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production'

module.exports = (env) => {
  return {
    mode: env,
    devtool: 'inline-source-map',
    entry: './src/index.js',
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Ultimate Pitch!',
        template: 'template.html',
        favicon: 'src/favicon.ico',
      }),
      new CleanWebpackPlugin(),
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
          test: /\.(scss|sass|css)$/i,
          use: [
            'style-loader',
            'css-loader',
            'resolve-url-loader',
            'sass-loader',
          ]
        },
        {

          test:  /\.(png|jpe?g|gif|css|ico)$/i,
          use: [{
            loader: 'file-loader'
          }]
        },
        {
          test: /\.css$/i,
          loader: 'css-loader',
          options: {
            url: true
          }
        }
      ],
    },
    devServer: {
      historyApiFallback: true
    }
  };
};
