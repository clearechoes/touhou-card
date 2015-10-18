define([], function(){
  function UserConfig(ngApp){
    
    glob = requireNode('glob') || requirejs.nodeRequire('glob');
    fs = requireNode('fs') || requirejs.nodeRequire('fs');
    path = requireNode('path') || requirejs.nodeRequire('path');
    
    var obj = {};
    glob.sync('./nmclis-*.json').forEach(function(json){
      var content = fs.readFileSync(path.resolve('./'+json));
      obj[json.match(/\.\/nmclis\-(.+)\./)[1]] = JSON.parse(content);
    })
    
    ngApp.value("userConfig", obj);
  }
  return UserConfig;
});