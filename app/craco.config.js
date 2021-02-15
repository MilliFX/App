const path = require("path");
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              hack: `true; @import "${path.resolve(
                __dirname,
                "./src/",
                "theme.less"
              )}";`,
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  babel: {
    presets: ["@babel/preset-env", "@babel/preset-react"],
    plugins: [
      [
        "import",
        {
          libraryName: "antd",
          libraryDirectory: "es",
          style: true,
        },
      ],
    ],
  },
};
