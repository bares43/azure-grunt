module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'Content/Sass/',
          src: ['*.scss'],
          dest: 'Content/',
          ext: '.css'
        }]
      }
    },
    watch: {
      css: {
        files: ['Content/Sass/*'],
        tasks: ['build_css']
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build_css', ['sass']);
  grunt.registerTask('build', ['build_css']);
  grunt.registerTask('default', ['watch']);
};
