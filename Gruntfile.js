'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      src: ['src/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        node: true,
        browser: true,
        globals: {
          SS: true
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: ['build/*']
        }]
      }
    },
    copy: {
      dev: {
        files: [{
            expand: true,
            dot: true,
            cwd: 'src',
            dest: 'build',
            src: [
                '**/*.html',
                '**/*.css',
                '**/*.js'
            ]
        }]
      },
      dist: {
        files: [{
            expand: true,
            dot: true,
            cwd: 'src',
            dest: 'build',
            src: [
                '**/*.html'
            ]
        }]
      }
    },
    useminPrepare: {
      html: 'src/index.html',
      options: {
        dest: 'build'
      }
    },
    usemin: {
      html: 'build/index.html',
      options: {
        basedir: 'dist',
        dirs: ['dist']
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            'build/{,*/}*.{js,css,png,jpg,jpeg,gif,webp}',
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true
        },
        files: {
          'build/index.html' : 'build/index.html'
        }
      }
    },
    mocha: {
      all: [ 'test/*.html' ],
      options: {
        run: true
      }
    },
    connect: {
      server: {
        options: {
          port: 8981,
          base: '.'
        }
      }
    },
    watch: {
      files: [ "src/**/*.*", "test/**/*.*", "Gruntfile.js" ],
      tasks: "dist"
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  // Test task.
  grunt.task.registerTask('test', ['connect', 'mocha']);

  // Dist task.
  grunt.registerTask('dist', [
    'jshint:src',
    'test',
    'clean:dist',
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'copy:dist',
    //'rev:dist',
    'usemin',
    'htmlmin'
  ]);

  // Default task.
  grunt.registerTask('default', [
    'jshint:src',
    'test',
    'clean:dist',
    'copy:dev'
  ]);

  // Travis CI task.
  grunt.registerTask('travis', [
    'jshint:src',
    'test'
  ]);

};