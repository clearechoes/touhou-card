var requirejs = require('requirejs');

requirejs.config({
  baseUrl: '.',
  shim: {
  },
  paths: { 
    "angular": "../bower_components/angular/angular",
    "glob4r" : "../node_modules/glob4r/glob4r"
  },
  nodeRequire: require,
  deps: ['init']
});