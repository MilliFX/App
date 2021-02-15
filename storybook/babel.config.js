module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": true
      }
    ]
  ]
};