let autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    cssbeautify = require('gulp-cssbeautify'),
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sequence = require('gulp-sequence'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');

// COMPILING VARIABLES
let production = false;

// GULP WATCH TO COMPILE CSS AND SERVE WHILE DEVELOPING
gulp.task('serve', function () {

    browserSync.init({
        server: {
            baseDir: './pages',
            index: 'index.html',
            routes: {
                '/css': 'dist/css',
                '/js': 'dist/js'
            }
        }
    });

    gulp.watch([
        'src/sick-crud/*.scss',
        'src/sick-crud/**/*.scss'
    ], ['sass']);

    gulp.watch([
        'pages/*.html',
        'pages/**/*.html'
    ])
        .on('change', browserSync.reload);

});

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
        )
        .pipe(
            browserSync.stream()
        );

});

// GULP CSS MINIFY TO MINIFY CSS
gulp.task('css', function () {

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

// GULP CSS MINIFY TO MINIFY CSS
gulp.task('js', function () {

    return gulp.src([
        'src/bootstrap/js/*.js',
        'src/bootstrap/js/*.js.map',
    ])
        .pipe(
            gulp.dest('dist/js')
        );

});

// DEFAULT GULP TASK
gulp.task('default', ['sass', 'css', 'js']);
