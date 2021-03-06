// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  },
  env: {
    browser: false,
    node: true,
    es6: true
  },
  {{#if_eq lintConfig "standard"}}
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: "standard",
  {{/if_eq}}
  {{#if_eq lintConfig "airbnb"}}
  extends: "airbnb-base",
  {{/if_eq}}
  // required to lint *.vue files
  plugins: [
    "html"
  ],
  {{#if_eq lintConfig "airbnb"}}
  // check if imports actually resolve
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "build/webpack.base.conf.js"
      }
    }
  },
  {{/if_eq}}
  // add your custom rules here
  "rules": {
    {{#if_eq lintConfig "standard"}}
    // allow paren-less arrow functions
    "arrow-parens": 0,
    // allow async-await
    "generator-star-spacing": 0,
    {{/if_eq}}
    {{#if_eq lintConfig "airbnb"}}
    // don"t require .vue extension when importing
    "import/extensions": ["error", "always", {
      "js": "never",
      "vue": "never"
    }],
    // allow optionalDependencies
    "import/no-extraneous-dependencies": ["error", {
      "optionalDependencies": ["test/unit/index.js"]
    }],
    {{/if_eq}}
    // allow debugger during development
    "semi": 0,
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    "space-before-function-paren": 0,
    "no-undef": 1,
    "one-var": 0,
    "quotes": [1, "double"], // 引号类型 `` "" ''
  },
  globals: {
    App: true,
    Page: true,
    wx: true,
    getApp: true,
    getPage: true,
    requirePlugin: true,
    mpvue: true,
    mpvuePlatform: true
  }
}
