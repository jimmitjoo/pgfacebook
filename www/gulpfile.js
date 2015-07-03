var gulp = require('gulp'),
    concat = require('gulp-concat');

var jsFiles = [
    'js/index.js',
    'js/routes.js',
    'js/controllers/*.js',
    'js/app.js'
];

gulp.task('javascript', function () {
    return gulp.src(jsFiles)
        .pipe(concat({path: 'vendor.js'}))
        .pipe(gulp.dest('./build'));
})

gulp.task('watch', function () {
    gulp.watch(jsFiles, ['javascript']);
});

gulp.task('default', ['watch', 'javascript']);
