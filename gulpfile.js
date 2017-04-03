var gulp = require('gulp');
var rimraf = require('rimraf');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var less = require('gulp-less');
var cp = require('gulp-copy');
var concat = require('gulp-concat');
var merge = require('gulp-merge');

function getCompiledStylesheet() {
    var compilationStream = gulp.src('src/styles/**/*.less')
        .pipe(less());

    compilationStream.on('error', function (e) {
        console.log('LESS compilation error: ' + (e.message || e));

        // wrap up stream to keep things going
        compilationOutput.emit('end');
    })

    return compilationStream
        .pipe(concat('app.css'))
        .pipe(gulp.dest('dist/css'));
}

gulp.task('default', function () {
    rimraf('dist', function () {
        connect.server({
            root: 'dist',
            port: 8888,
            livereload: true
        });

        // initial run to compile stylesheet
        getCompiledStylesheet();

        merge(
            watch('src/**/*.{html,json}', { ignoreInitial: false, verbose: true })
                .pipe(cp('dist/', { prefix: 1 })),

            // watch for file changes and recompile entire stylesheet
            watch('src/styles/**/*.less', { verbose: true, read: false }, function () {
                getCompiledStylesheet();
            })
        ).pipe(connect.reload());
    });
});
