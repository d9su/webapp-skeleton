var gulp = require('gulp');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var cp = require('gulp-copy');
var rename = require('gulp-rename');

var merge = require('merge-stream');
var rimraf = require('rimraf');
var source = require('vinyl-source-stream');
var browserifyInc = require('browserify-incremental');
var insertCss = require('insert-css');

gulp.task('default', function () {
    return rimraf('dist', function () {
        connect.server({
            root: 'dist',
            port: 8888,
            livereload: true,
            fallback: 'dist/index.html'
        });

        var mainBundle = browserifyInc({
            entries: [ './src/index.js' ],
            paths: [
                './node_modules'
            ],
            debug: true
        });

        // prime browserify-incremental cache
        mainBundle.bundle()
            .on('error', function (e) {
                console.log('Browerify error: ' + e);
            });

        return merge(
            watch('src/index.html', { ignoreInitial: false, verbose: true })
                .pipe(cp('dist/', { prefix: 1 }))
                .pipe(connect.reload()),

            watch('src/**/*.{html,js,less}', { verbose: true, ignoreInitial: false, read: false }, function () {
                return mainBundle.bundle()
                    .on('error', function (e) {
                        console.log('Browerify error: ' + e);
                    })
                    .pipe(source('index.js'))
                    .pipe(rename('app.js'))
                    .pipe(gulp.dest('dist'))
                    .pipe(connect.reload());
            })
        );
    });
});
