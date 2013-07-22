module.exports = function(grunt) {
    grunt.initConfig({
      jshint: {
        all: ['Gruntfile.js', 'hulk.js'],
        options: {
            "forin": true,
            "latedef": true,
            "unused": true,
            "trailing": true
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
};
