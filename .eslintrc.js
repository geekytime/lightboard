module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "standard"
  ],
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2017,
    sourceType: "module"
  },
  settings: {
    react: {
      version: "16.8"
    }
  },
  rules: {
    indent: [
      "error",
      2, {
        MemberExpression: "off",
        SwitchCase: 1
      }
    ],
    "padded-blocks": "off",
    quotes: [
      "error",
      "double",
      { allowTemplateLiterals: true }
    ]
  }
}
