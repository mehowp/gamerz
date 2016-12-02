global.path = require('path');
global.chalk = require('chalk');
global.gulp = require('gulp');
global.gutil = require('gulp-util');
global.sourcemaps = require('gulp-sourcemaps');
global.helpers = require('./gulpfile.helpers.js')();

require('require-dir')('./src/gulp');
gulp.task('default', ['bundle'], function() {
})
