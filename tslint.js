'use strict';

const importESLintConfig = require('tslint-import-eslint-config');

// import from ESLint
module.exports = importESLintConfig({
  extends: ['teppeis/es2018', 'teppeis/+prettier'],
});

// override TSLint rules
Object.assign(module.exports.rules, {});
