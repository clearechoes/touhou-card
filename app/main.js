// var requirejs = require('require');

requirejs.config({
  baseUrl: '../app',
  shim: {
    "angular": { deps: ['jquery'] },
    "angular-route": { deps: ['angular'] },
    "angular-resource": { deps: ['angular'] },
    "angular-sanitize": { deps: ['angular'] },
    "oclazyload": { deps: ['angular'] },
  },
  paths: { 
    "angular": "../bower_components/angular/angular",
    "angular-route": "../bower_components/angular-route/angular-route",
    "angular-resource": "../bower_components/angular-resource/angular-resource",
    "angular-sanitize": "../bower_components/angular-sanitize/angular-sanitize",
    "oclazyload": "../bower_components/oclazyload/dist/ocLazyLoad",
    "jquery": "../bower_components/jquery/dist/jquery",
    "pace": "../bower_components/PACE/pace",
    "glob4r": "../vendor/glob4r/glob4r"
  },
  nodeRequire: require,
  deps: ['init']
});