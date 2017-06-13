

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        distDebugFolder: 'dist/debug',
        distReleaseFolder: 'dist/release',

        watch: {
            options: {
                livereload: true
            },
            files: ['src/**/*'],
            tasks: ['build-debug'],
        },

        ngtemplates: {
            debug: {
                src: 'src/app/**/*.html',
                dest: '<%= distDebugFolder %>/assets/js/app/app.templates.js',
                options: {
                    module: 'App',
                    bootstrap: function (module, script) {
                        return '(function(){angular.module(\'' + module + '\').run(["$templateCache",function($templateCache){\n' + script + '}]);})();';
                    },
                    url: function (url) { return url.replace('src/', ''); }
                    // prefix: ''
                }
            },
            release: {
                src: 'src/app/**/*.html',
                dest: '<%= distReleaseFolder %>/assets/js/app.templates.min.js',
                options: {
                    module: 'App',
                    bootstrap: function (module, script) {
                        return '(function(){angular.module(\'' + module + '\').run(["$templateCache",function($templateCache){\n' + script + '}]);})();';
                    },
                    url: function (url) { return url.replace('src/', ''); }
                    // prefix: ''
                }
            }
        },
        sass: {
            debug: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: 'src/assets/sass/',
                    src: ['*.scss'],
                    dest: '<%= distDebugFolder %>/assets/css/',
                    ext: '.css'
                }],
            },
            release: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: 'src/assets/sass/',
                    src: ['*.scss'],
                    dest: '<%= distReleaseFolder %>/assets/css/',
                    ext: '.min.css'
                }],
            }
        },
        includeSource: {
            options: {
                baseUrl: ''
            },
            debug: {
                options: {
                    basePath: 'dist/debug',
                },
                files: {
                    'dist/debug/app.html': 'src/app.debug.html'
                }
            },
            release: {
                options: {
                    basePath: 'dist/release',
                },
                files: {
                    'dist/release/app.html': 'src/app.release.html'
                }
            }
        },
        copy: {
            copyImagesDebug: {
                expand: true,
                dest: '<%= distDebugFolder %>/assets',
                cwd: 'src/assets/',
                src: ['img/**/*']
            },
            copyImagesRelease: {
                expand: true,
                dest: '<%= distReleaseFolder %>/assets',
                cwd: 'src/assets/',
                src: ['img/**/*']
            },
            copyJsDebug: {
                expand: true,
                dest: '<%= distDebugFolder %>/assets/js',
                cwd: 'src/',
                src: ['app/**/*.js']
            },
            copyLibsDebug: {
                expand: true,
                dest: '<%= distDebugFolder %>',
                cwd: 'src/',
                src: ['assets/libs/**/*.js']
            },
            copyLibsRelease: {
                expand: true,
                dest: '<%= distReleaseFolder %>',
                cwd: 'src/',
                src: ['assets/libs/**/*.js']
            },
            copy3rdPartyCssDebug: {
                expand: true,
                dest: '<%= distDebugFolder %>',
                cwd: 'src/',
                src: ['assets/css/*.css']
            },
            copy3rdPartyCssRelease: {
                expand: true,
                dest: '<%= distReleaseFolder %>',
                cwd: 'src/',
                src: ['assets/css/*.css']
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            release: {
                src: [
                    'src/app/shared/*.js',
                    'src/app/shared/*/*.js',
                    'src/app/app.js',
                    'src/app/app.*.js',
                    'src/app/modules/*/*.module.js',
                    'src/app/modules/*/*.routes.js',
                    'src/app/modules/*/*.resources.js',
                    'src/app/modules/*/*.config.js',
                    'src/app/modules/*/services/**/*.js',
                    'src/app/modules/*/controllers/**/*.js',
                    'src/app/modules/*/models/**/*.js',
                    'src/app/modules/*/values/**/*.js',
                    'src/app/modules/*/constants/**/*.js',
                    'src/app/modules/*/filters/**/*.js'
                ],
                dest: '<%= distReleaseFolder %>/assets/js/app.min.js'
            }
        },
        uglify: {
            options: {
                mangle: false,
                compress: false
            },
            release: {
                files: {
                    '<%= distReleaseFolder %>/assets/js/app.min.js': ['<%= distReleaseFolder %>/assets/js/app.min.js'],
                    '<%= distReleaseFolder %>/assets/js/app.templates.min.js': ['<%= distReleaseFolder %>/assets/js/app.templates.min.js']
                }
            }
        },
        htmlmin: {
            release: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    '<%= distReleaseFolder %>/app.html': '<%= distReleaseFolder %>/app.html'
                }
            }
        },
        removelogging: {
            release: {
                src: "<%= distReleaseFolder %>/assets/js/app.min.js"
            }
        },
        clean: {
            debug: {
                src: ['<%= distDebugFolder %>/assets']
            },
            release: {
                src: ['<%= distReleaseFolder %>/assets']
            }
        },
        connect: {
            debug: {
                port: 80,
                base: 'dist/debug'
            }
        },
        open: {
            debug: {
                path: 'http://localhost/app.html',
                app: 'Chrome'
            }
        },
        concurrent: {
            debug: ['watch', 'connect:debug', 'open:debug'],
        }
    });

    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-remove-logging"); // (!)
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-connect');

    grunt.registerTask('clean-debug', ['clean:debug']);
    grunt.registerTask('clean-release', ['clean:release']);

    grunt.registerTask('build-debug', [
        //        'clean:debug',
        'ngtemplates:debug',
        'sass:debug',
        'copy:copyLibsDebug',
        'copy:copyJsDebug',
        'copy:copy3rdPartyCssDebug',
        'includeSource:debug',
        'copy:copyImagesDebug'
    ]);

    grunt.registerTask('build-release', [
        'clean:release',
        'ngtemplates:release',
        'sass:release',
        'concat:release',
        'removelogging:release',
        'uglify:release',
        'copy:copyLibsRelease',
        'copy:copy3rdPartyCssRelease',
        'includeSource:release',
        'copy:copyImagesRelease',
        'htmlmin:release'
    ]);

    grunt.registerTask('build-all', ['build-debug', 'build-release']);
    grunt.registerTask('run-debug', ['build-debug', 'concurrent:debug']);

    grunt.registerTask('default', ['run-debug']);
};

