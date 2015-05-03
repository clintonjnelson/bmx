'use strict';

module.exports = function(grunt) {

  // Tasks we want Grunt to load from NPM
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  // Define the tasks we have loaded into Grunt from NPM
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      dev: {
        src: ['Gruntfile.js', 'test/**/*.js', 'bmx.js', '/lib/*.js']
      },
      options: require('./lib/jshintrc.js')
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: false,       // no output file
          quiet: false,             // supress console output
          clearRequireCache: false  // clear require cache before tests
        },
        src: ['test/**/*.js']       // test locations
      }
    }
  });

  // Tasks
  grunt.registerTask('test', ['jshint:dev', 'mochaTest']);
  grunt.registerTask('default', ['test']);
};
