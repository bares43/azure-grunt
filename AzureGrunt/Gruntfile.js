module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'Content/Sass/',
                    src: ['*.scss'],
                    dest: 'Content/Sass/',
                    ext: '.css'
                }]
            }
        },
        watch: {
            css: {
                files: ['Content/Sass/*'],
                tasks: ['build_css']
            },
            js: {
                files: ['Content/*.js'],
                tasks: ['build_js']
            }
        },
        cssmin: {
            options: {
                sourceMap: true
            },
            build: {
                files: {
                    'Content/Bundles/Css/Bootstrap.css': ['Content/bootstrap.css'],
                    'Content/Bundles/Css/Dva.css': ['Content/Sass/Dva.css']
                }
            }
        },
        uglify: {
            options: {
                sourceMap: true
            },
            build: {
                files: {
                    'Content/Bundles/Js/jedna.js': ['Content/jedna.js','Content/dva.js'],
                    'Content/Bundles/Js/tri.js': ['Content/tri.js']
                }
            }
        },
        filerev: {
            js: {
                src: [
                    'Content/Bundles/Js/jedna.js',
                    'Content/Bundles/Js/tri.js'
                ]
            },
            css: {
                src: [
                    'Content/Bundles/Css/Bootstrap.css',
                    'Content/Sass/Site.css',
                    'Content/Bundles/Css/Dva.css'
                ]
            }
        },
        filerev_assets: {
            build: {
                options: {
                    prefix: "/",
                    prettyPrint: true
                }
            }
        },
        clean: {
            build: ['Content/Bundles/Css', 'Content/Bundles/Js', 'assets.json']
        }

    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-filerev-assets');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('build_css', ['sass','cssmin']);
    grunt.registerTask('build_js', ['uglify']);
    grunt.registerTask('build', ['clean', 'build_css', 'build_js', 'filerev', 'filerev_assets']);
    grunt.registerTask('default', ['watch']);
};
