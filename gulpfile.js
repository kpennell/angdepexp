var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    liveReload  = require('gulp-livereload'),
    concat      = require('gulp-concat'),
    ngAnnotate  = require('gulp-ng-annotate'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename'),
    moment      = require('moment'),
    notify      = require('gulp-notify');
    less        = require('gulp-less');
    serve       = require('gulp-serve');
 
    require('gulp-help')(gulp, {
        description: 'Help listing.'
    });
 
gulp.task('serve', 'A simple web server.', serve({
    root: ['src'],
    port: 3000
}));
 
gulp.task('uglify-js', 'Concat, Ng-Annotate, Uglify JavaScript into a single app.min.js.', function() {
    gulp.src('src/js/*.js')
        .pipe(concat('app'))
        .pipe(ngAnnotate())
        .on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(uglify())
        .on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(rename({
            extname: ".min.js"
         }))
        .pipe(gulp.dest('client/js'))
        .pipe(notify('Uglified JavaScript (' + moment().format('MMM Do h:mm:ss A') + ')'))
        .pipe(liveReload({
            auto: false
        }));
});
 
gulp.task('less', 'Compile less into a single app.css.', function() {
    gulp.src(['client/styles/bootstrap/bootstrap.less', 'client/styles/*.less'])
        .pipe(concat('app'))
        .pipe(less())
        .on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(gulp.dest('client/styles'))
        .pipe(notify('Compiled less (' + moment().format('MMM Do h:mm:ss A') + ')'))
        .pipe(liveReload({
            auto: false
        }));
});
 
gulp.task('watch', 'Watch for changes and live reloads Chrome. Requires the Chrome extension \'LiveReload\'.', function() {
    liveReload.listen();
    watch({
        glob: 'client/js/source/**/*.js'
    }, function() {
        gulp.start('uglify-js');
    });
 
    watch({
        glob: 'client/styles/*.less',
    }, function() {
        gulp.start('less');
    });
 
    watch({
        glob: 'client/views/**/*.html'
    }).pipe(liveReload({
        auto: false
    }));
});
 
gulp.task('default', ['watch', 'serve']);



