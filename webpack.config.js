const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PugPlugin = require('pug-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    index: './src/pages/main/main.pug',
  },
  output: {
    filename: 'assets/js/[name].[contenthash:8].js',
    path: path.join(__dirname, './dist'),
    publicPath: '/'
  },
  stats: {
    children: true,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        scripts: {
          test: /\.(js)$/,
          chunks: 'all',
        },
      },
    },
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, './dist'),
    },
    open: true,
    compress: true,
    hot: true,
    port: 3000,
    watchFiles: ['src/pages/**/*.*', 'src/components/**/*.*', 'src/assets/common/*.*']
  },
  resolve: {
    alias: {
      Img: path.join(__dirname, './src/assets/img/'),
      Fonts: path.join(__dirname, './src/assets/fonts/'),
      Components: path.join(__dirname, './src/components/'),
      Layouts: path.join(__dirname, './src/layouts/'),
      UIKit: path.join(__dirname, './src/ui-kit/'),
      Styles: path.join(__dirname, './src/assets/styles/'),
      Libs: path.join(__dirname, './src/libs/'),
      NodeModules: path.join(__dirname, './node_modules/'),
      Partials: path.join(__dirname, './src/pages/_partials/'),
      Utils: path.join(__dirname, './src/utils/'),
    }
  },
  devtool: isDev ? 'inline-source-map' : false,
  plugins: [
    new PugPlugin({
      pretty: true,
      extractCss: {
        filename: 'assets/css/[name].[contenthash:8].css',
      },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/img/favicon/favicon.ico'),
          to: path.resolve(__dirname, 'dist/assets/img/favicon/')
        },
      ]
    }),
    new webpack.HotModuleReplacementPlugin(),

  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.pug$/,
        loader: PugPlugin.loader,
        // options: {
        //   method: 'render',
        // }
      },
      {
        test: /\.(png|jpg|jpeg|svg|ico)/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name].[hash:8][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[hash:8][ext]',
        },
      },
      {
        test: /\.(scss|css)$/,
        use: ['css-loader', 'sass-loader'],
      },
      {
        test: /\.mp4$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name].[hash:8][ext]',
        }
      }
    ],
  }
}
