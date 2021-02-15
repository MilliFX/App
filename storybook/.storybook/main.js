module.exports = {
  "stories": [
    "../../app/src/**/*.stories.mdx",
    "../../app/src/**/*.stories.@(js|jsx|ts|tsx)",
    "../../packages/**/src/**/*.stories.mdx",
    "../../packages/**/src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@storybook/addon-a11y',
    {
      "name": "./addons/millifx/preset",
      // "options": {
      //   cracoConfigFile: "../../../../app/craco.config.js",
      // }
    }
  ]
}