let autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    cssbeautify = require('gulp-cssbeautify'),
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sequence = require('gulp-sequence'),
    uglify = require('gulp-uglify');

// COMPILING VARIABLES
let production = false;

// GULP TO COMPILE SCSS
gulp.task('sass', function () {

    return gulp.src([
        'src/bootstrap/scss/bootstrap.scss',
        'src/sick-crud/sick-crud.scss'
    ])
        .pipe(
            sass().on('error', sass.logError)
        )
        .pipe(
            autoprefixer({
                browsers: ['> 1%', 'last 2 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11'],
                cascade: false
            })
        )
        .pipe(
            gulpif(
                production,
                cssbeautify()
            )
        )
        .pipe(
            gulp.dest('dist/css')
        );

});

// GULP WATCH TO COMPILE CSS WHILE DEVELOPING
gulp.task('watch', function () {

    gulp.watch([
        'src/sick-crud/*.scss'
    ], ['sass']);

});


// GULP CSS MINIFY TO MINIFY CSS
gulp.task('css-minify', function () {

    return gulp.src([
        'dist/css/*',
        '!dist/css/*.min.css'
    ])
        .pipe(
            cleanCSS(
                {
                    compatibility: 'ie9'
                }
            )
        )
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(
            gulp.dest('dist/css')
        );

});

