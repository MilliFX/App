module.exports = {
  babel: {
    "presets": ["@babel/preset-env", "@babel/preset-react"],
    "plugins": [
      [
        "import",
        {
          "libraryName": "antd",
          "libraryDirectory": "es",
          "style": "css"
        }
      ]
    ]
  }
}