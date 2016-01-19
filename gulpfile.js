var gulp = require('gulp');

var PATHS = {
    src: ['src/**/*.ts','index.html']
};

var connect = require('gulp-connect');


gulp.task('clean', function (done) {
    var del = require('del');
    del(['dist'], done);
});

gulp.task('ts2js', function () {
    var typescript = require('gulp-typescript');
    var tscConfig = require('./tsconfig.json');

    var tsResult = gulp
        .src(PATHS.src)
        .pipe(typescript(tscConfig.compilerOptions));

    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('recompile', ['ts2js'], function () {
   return gulp.src('.').pipe(connect.reload());
});

gulp.task('play', ['ts2js'], function () {
    connect.server({
        root: ['.'],
        port: 9000,
        livereload: true
    });
    gulp.watch(PATHS.src, ['recompile']);

});

gulp.task('default', ['play']);
