var rollup = require('gulp-rollup'),
    multientry = require('rollup-plugin-multi-entry'),
    babel = require('gulp-babel'),
    eslint = require('gulp-eslint'),
    friendlyFormatter = require('eslint-friendly-formatter'),
    rename = require('gulp-rename'),
    sources = ['./src/scripts/main.js', '!node_modules/**'];

gulp.task('lint', function() {
    return gulp.src(sources)
        .pipe(eslint())
        .pipe(eslint.result( function(result){
            // Called for each ESLint result
            if (!!result.messages.length) {
                gutil.log(`${chalk.cyan(helpers.logOnChange(result.filePath, '/src/client', 'eslint'))}`);

            if (!!result.warningCount) {
                gutil.log(`Warnings: ${chalk.yellow(result.warningCount)}`);
            }
            if (!!result.errorCount) {
                gutil.log(`Errors: ${chalk.red(result.errorCount)}`);

                result.messages.map(function(e){
                var line = e.line;
                var column = e.column;
                gutil.log('# Linter: '+chalk.red(e.message.slice(0, -1)) + ' at ' + chalk.yellow(line + ':' + column));

                })
            }else{
                gutil.log(chalk.green('No issues!'));
            }
        }

      }))
        .pipe(eslint.failAfterError());
});

gulp.task('bundle:js', ['lint'], function() {
    gulp.src(sources)
        .pipe(sourcemaps.init())
        .pipe(rollup({
            allowRealFiles: true,
            entry: ['./src/scripts/main.js', './src/scripts/**/*.js'],
            plugins: [
                babel(),
                multientry()
            ],
            format: 'umd',
            moduleName: 'lolApi'
        }))
        .pipe(babel())
        .on('error', gutil.log)
        .pipe(rename('bundle.js'))
        .pipe(sourcemaps.write('.'))

    .pipe(gulp.dest('./dist'));
});
