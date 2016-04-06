module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //Js min task
        uglify: {
            'dist/zepto.jdate-min.js':['js/swipe.js','js/jdate.js']
        },
        //Css min task
        cssmin: {
            'dist/zepto.jdate-min.css':['css/reset.css','css/jdate.css']
        },
        //Copy fonts task
        copy:{
            file:{
                expand: true,
                cwd:'css/font/',
                src: ['*.*'],
                dest: 'dist/font',
                filter: 'isFile'
            }
        },
        //watch
        watch: {
            watchFiles: {
                files: ['*.html','css/*.css', '!**/*-min.css','js/*.js', '!**/*-min.js']
            },
            options: {
                livereload: 8080
            },
            configFiles: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            }
        }
    });

    // load npm tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // resgister tasks
    grunt.registerTask('wh', ['watch']);
    grunt.registerTask('build', ['uglify','cssmin','copy']);

};
