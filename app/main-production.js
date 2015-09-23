var requirejs = require('requirejs');

requirejs.config({
  baseUrl: '.',
  shim: {
  },
  paths: { 
    "angular": "../bower_components/angular/angular",
    "glob4r" : "../vendor/glob4r/glob4r"
  },
  nodeRequire: require,
  deps: ['init']
});
