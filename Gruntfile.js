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
            dist: {
                files: {
                    'hulk-all.css': 'hulk-all.scss'
                }
            }
        },

        watch: {
            scripts: {
                files: 'hulk.js',
                tasks: ['jshint', 'uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
