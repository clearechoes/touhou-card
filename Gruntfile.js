module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // require js optimization
    requirejs: {
        compile: {
            options: {
                // name is required
                name: "../node_modules/almond/almond",
                //almond: true,
                // the base path of our optimization
                baseUrl: "app",
                // include almond to get define (in place of require.js)
                // include: "../node_modules/almond/almond",
                // use our original main configuration file to avoid
                // duplication.  this file will pull in all our dependencies
                mainConfigFile: "app/main-production.js",
                // optimize: "none",
                // the output optimized file name
                out: "app/public/production.js"
                
            }
        }
    }
  });

  // load the tasks we've utilized within this config
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // define the default (no arg) task to run requirejs and cssmin
  // grunt.registerTask("default", ["requirejs"]);
  
  grunt.registerTask('build', 'requirejs');
};