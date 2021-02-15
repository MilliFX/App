const path = require("path");

const webpack = (webpackConfig = {}, options) => {
  return {
    ...webpackConfig,
    module: {
      ...webpackConfig.module,
      rules: [
        ...webpackConfig.module.rules,
        {
          test: /\.less$/,
          use: [{
            loader: 'style-loader',
          }, {
            loader: 'css-loader', // translates CSS into CommonJS
          }, {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              lessOptions: {
                modifyVars: {
                  hack: `true; @import "${path.resolve(
                    __dirname,
                    "./",
                    "theme.less"
                  )}";`,
                },
                javascriptEnabled: true,
              },
            },
          }],
        }
      ],
    }
  }
};

module.exports = {
  webpack,
}