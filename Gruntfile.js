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
      },

      qunit: {
        files: ['tests/test.html']
      },

      sass: {
          dev: {
              src: 'hulk.scss',
              dest: 'hulk.css'
          },
          colors: {
            src: 'hulk-colors.scss',
            dest: 'hulk-colors.css'
        }
      },

      watch: {
          sass: {
              // We watch and compile sass files as normal but don't live reload here
              files: ['hulk.scss', 'hulk-colors.scss'],
              tasks: ['sass'],
          }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
