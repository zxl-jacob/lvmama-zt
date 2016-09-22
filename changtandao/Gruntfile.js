/**
 * Created by zhangfeng on 2015/7/01.
 */
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //html2js: {
        //    main: {
        //        src: ['./templates/*/*.html'],
        //        dest: './debug/templates.js'
        //    }
        //},
        concat: {
            build: {
                files: {
                    './static/js/index.js': ['./debug/*.js', './debug/js/*.js', './debug/js/*/*.js']
                }
            }
        },
        ngAnnotate: {
            './static/js/index.js': './static/js/index.js'
        },
        uglify:{
            build: {
                files: {
                    './static/js/index.min.js': ['./static/js/index.js']
                }
            }
        },
        cssmin: {
            build: {
                files: {
                    './static/css/index.min.css': './debug/css/*.css'
                }
            }
        },
        imagemin: {
            /* 压缩图片大小 */
            dist: {
                options: {
                    optimizationLevel: 3 //定义 PNG 图片优化水平
                },
                files: [
                       {
                        expand: true,
                        cwd: 'debug/images',
                        src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
                        dest: 'static/images/' // 优化后的图片保存位置，
                    }
                ]
            }
        }
        //,
        //watch: {
        //    css: {
        //        files: './debug/css/*.css',
        //        tasks: ['cssmin']
        //    },
        //    js: {
        //        files: ['./debug/*.js', './debug/js/*.js'],
        //        tasks: ['uglify']
        //    }
        //}
    });

    //grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-ng-annotate');

    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('default', [
        //'html2js',
        'concat',
        'ngAnnotate',
        'uglify',
        'cssmin',
        'imagemin'
    ]);
};