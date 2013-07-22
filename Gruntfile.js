module.exports = function(grunt) {
    grunt.initConfig({
      jshint: {
        all: ['Gruntfile.js', 'hulk.js']
      }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
};
