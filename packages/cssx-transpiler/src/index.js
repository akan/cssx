var AST = require('./core/AST');
var traverse = require('./core/traverse');
var generate = require('babel-generator').default;
var merge = require('./helpers/merge');
var randomId = require('./helpers/randomId');

var visitors = {
  CSSXDefinition: require('./visitors/CSSXDefinition'),
  CSSXElement: require('./visitors/CSSXElement'),
  CSSXProperty: require('./visitors/CSSXProperty'),
  CSSXRule: require('./visitors/CSSXRule'),
  CSSXRules: require('./visitors/CSSXRules'),
  CSSXSelector: require('./visitors/CSSXSelector'),
  CSSXValue: require('./visitors/CSSXValue'),
  CSSXMediaQueryElement: require('./visitors/CSSXMediaQueryElement'),
  CSSXKeyframesElement: require('./visitors/CSSXKeyframesElement')
};

module.exports = function (code, generateOptions) {
  var ast = AST(code);

  traverse(ast.program, visitors);
  return generate(
    ast,
    merge({
      minified: false,
      compact: false,
      concise: false,
      quotes: 'single',
      sourceMaps: false
    }, generateOptions || {}),
    code
  ).code;
};

module.exports.ast = AST;

module.exports.reset = function () {
  randomId.resetIDs();
};