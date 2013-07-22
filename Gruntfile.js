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
      },
      uglify: {
        options: {
            mangle: {
                except: ['jQuery']
            },
            compress: true
        },
        my_target: {
            files: {
                'hulk.min.js': ['hulk.js']
            }
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
};
