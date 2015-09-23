glob_concats = [];

define(["module"], function (module) {
  //"use strict";
  
  var files = [], path, fs, glob;
  var baseUrl, done = false;
  var isBuild;
  var glob4r = {
    /**
     * load matched files, using the server to help find matches
     */
    load: function(name, req, load, config) {

      if( config.isBuild ){
        path = path || requirejs.nodeRequire('path');
        fs = fs || requirejs.nodeRequire('fs');
        glob = glob || requirejs.nodeRequire('glob');
        baseUrl = config.baseUrl;
        var _files = glob.sync(baseUrl + name);
        files = files.concat(_files);
        load(files);
      } else {
        try{
          path = path || require("path");
          baseUrl = path.resolve('app') + '/';
          glob = glob || require("glob");
          fs = fs || require("fs");
          var _files = glob.sync(baseUrl + name);
          
          if( _files.length > 0 ){
            var objects = {};
            _files.forEach(function(file, i){
              var baseName = file.replace(baseUrl, "");
              var modName = path.basename(baseName, path.extname(baseName));
              req([baseName], function(content){
                objects[modName] = content;
                if(i == _files.length - 1){
                  load(objects);
                }
              });
              glob_concats.push(modName);
            });
          } else {
            load();
          }
        }catch(ex){
        }
      }

    },

    /**
     * write contents of matched files during the build
     */
    write:function(pluginName, name, write) {
      if( !done ){
        write("define('"+pluginName+"!"+name +"', [], function(){");
        files.forEach(function(file, i){
          var baseName = path.basename(file, path.extname(file));
          var modName = file.replace(baseUrl, "");
          var content = fs.readFileSync(file).toString();
          write(content.replace(/define\(\s*\[/, "define('"+modName+"', ["));
          write("glob_concats.push('"+baseName+"')");
        });
        write("});");
        done = true;
      }
    }
  };
  return glob4r;
});