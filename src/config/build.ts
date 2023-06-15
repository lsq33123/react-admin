const path = require('path')
const srcPath = path.join(__dirname, '../../src')
const dictPath = path.join(__dirname, '../../dist')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

const px2rem = require("postcss-plugin-px2rem");

const px2remOpts = {
  rootValue: 16, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样可以从设计稿上量出多少个px直接在代码中写多上px了。
  // unitPrecision: 5, //允许REM单位增长到的十进制数字。
  //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
  // propBlackList: [], //黑名单
  exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
  selectorBlackList: ['.ignore'], //要忽略并保留为px的选择器
  // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
  // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
  mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
  minPixelValue: 3, //设置要替换的最小像素值(3px会被转rem)。 默认 0
};

const isProd = process.env.NODE_ENV === 'production'
const env = process.env.NODE_ENV || 'development'
module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? '' : 'eval-source-map',
  entry: {
    index: path.join(srcPath, 'index.tsx'),
    vendors: ['react', 'react-dom'],
  },
  output: {
    path: dictPath,
    filename: 'js/[name].[hash:8].js',
    publicPath: '',
  },
  devServer: {
    // host: 'localhost',
    host: '0.0.0.0',
    port: 3015,
    hot: true,
    open: false,
    historyApiFallback: true, //用于如果找不到界面就返回默认首页
    client: {
      overlay: false
    }
  },
  resolve: {
    alias: {
      '@': srcPath,
      '~': path.join(srcPath, '../'),
    },
    extensions: ['.js', '.tsx', '.ts', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: [srcPath],
        exclude: [/node_mudules/],
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                config: false,
                plugins: [
                  "postcss-flexbugs-fixes",
                  [
                    "postcss-preset-env",
                    {
                      autoprefixer: {
                        flexbox: "no-2009",
                      },
                      stage: 3,
                    },
                  ],
                  "postcss-normalize",
                  px2rem(px2remOpts),
                ],
              },
              sourceMap: isProd
            },
          }],
      },
      {
        test: /\.less?$/,
        // use: ['style-loader', 'css-loader', 'less-loader'],
        use: [
          'style-loader',
          'css-loader',

          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                config: false,
                plugins: [
                  "postcss-flexbugs-fixes",
                  [
                    "postcss-preset-env",
                    {
                      autoprefixer: {
                        flexbox: "no-2009",
                      },
                      stage: 3,
                    },
                  ],
                  "postcss-normalize",
                  px2rem(px2remOpts),
                ],
              },
              sourceMap: isProd
            },
          },
          'less-loader',
        ],


        // use: [
        //   { loader: 'style-loader' },
        //   { loader: 'css-loader' },
        //   {
        //     loader: 'unit-convert-loader',
        //     options: {
        //       UIWidth: 1920,
        //       rem: 16,
        //       unit: 'px',
        //       precision: 4,
        //       targetUnit: 'rem',
        //       targetPrecision: 4,
        //       ignore: ['border', 'border-top', 'border-left', 'border-right', 'border-bottom', 'border-radius'],
        //       // minPixelValue: 1, //可选，默认1。您设置的最小值，所有小于它的值都不会被转换。
        //       // unitPercesion: 3,//可选，默认3。转换后保留的小数位数。
        //       selectorBlackList: ['.ignore'], // 指定不转换的容器名      width: 100px; /* not convert */ 也可以使用 ignore
        //     }
        //   },
        // ]
      },
      {
        test: /\.json$/,
        loader: "url-loader",
        options: {
          esModule: false,
          name: 'json/[name].[hash:8].[ext]',
        },
        type: 'javascript/auto'
      },
      {
        test: /\.(jpg|png|jpeg|gif)$/,
        loader: "url-loader",
        options: {
          limit: 5 * 1024,
          esModule: false,
          name: 'img/[name].[hash:8].[ext]',
        },
        type: 'javascript/auto'
      },
      // {
      //   test: /\.(jpg|png|jpeg|gif)$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 1024,
      //         fallback: {
      //           loader: 'file-loader',
      //           options: {
      //             name: 'img/[name].[hash:8].[ext]',
      //           },
      //         },
      //       },
      //     },
      //   ],
      //   type: 'javascript/auto'
      // },
      {
        test: /\.(mp4|webm|ogg|mp3|wav)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]',
                },
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({}),
    new HTMLWebpackPlugin({
      // template: path.join(srcPath, 'index.html'),
      template: path.join(srcPath, '../public/index.html')
    }),
    new CopyWebpackPlugin({
      // 需拷贝的配置项
      patterns: [
        {
          from: "public", // 从哪里 copy
          // to: '', 这里可以省略 to，自动从 output 的 path 去找
          globOptions: {
            ignore: ['**/index.html']
            // 这里必须在前面加 **/ 表示从当前路径下忽略
            // 且忽略目录中文件后不能为空
          }
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      // allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: `"${env}"` },
      'BASE_URL': "'./'"
    })
  ],
  // 核心配置
  optimization: {
    nodeEnv: false, // 防止webpack将process.env.NODE_ENV设置为production //https://blog.csdn.net/weixin_42349568/article/details/124229170
    runtimeChunk: 'single', //将runtime代码单独打包 解决无法热更新问题
    splitChunks: {
      cacheGroups: {
        //打包公共模块
        commons: {
          chunks: 'initial', //initial表示提取入口文件的公共部分
          minChunks: 2, //表示提取公共部分最少的文件数
          minSize: 0, //表示提取公共部分最小的大小
          name: 'commons', //提取出来的文件命名
        },
      },
    },
  },
}
