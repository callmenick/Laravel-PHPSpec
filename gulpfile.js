var gulp = require('gulp');
var notify = require('gulp-notify');
var phpspec = require('gulp-phpspec');

gulp.task('phpspec', function() {

    var options = {
        notify: true,
        verbose: "v"
    };

    gulp.src('app/spec/**/*.php')
        .pipe(phpspec('', options))
        .on('error', notify.onError({
            title: "Tests failed",
            message: "Error(s) occured during the test"
        }))
        .pipe(notify({
            title: "Success",
            message: "Tests passed"
        }));

});

gulp.task('watch', function() {
    gulp.watch(['app/spec/**/*.php', 'app/Acme/src/**/*.php'], ['phpspec']);
});

gulp.task('default', ['phpspec', 'watch']);