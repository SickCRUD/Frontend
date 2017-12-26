let autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    cssbeautify = require('gulp-cssbeautify'),
    del = require('del'),
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    merge = require('merge-stream'),
    rename = require('gulp-rename'),
    runSequence  = require('run-sequence'),
    sass = require('gulp-sass'),
    sequence = require('gulp-sequence'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    vinylPaths = require('vinyl-paths');


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
                '/js': 'dist/js',
                '/plugins': 'plugins',
                '/dependencies': 'dependencies',
                '/img': 'dist/img'
            }
        }
    });

    gulp.watch([
        'src/*.scss',
        'src/**/*.scss'
    ], ['sass']);

    gulp.watch([
        'src/js/*.js',
        'src/**/*.js'
    ], ['js']);

    gulp.watch([
        'pages/*.html',
        'pages/**/*.html'
    ])
        .on('change', browserSync.reload);

});

// GULP TO COMPILE SCSS
gulp.task('sass', function () {

    return gulp.src([
        'src/scss/sick-crud.scss',
        'src/scss/skins/*.scss'
    ])
        .pipe(
            sass().on('error', sass.logError)
        )
        .pipe(
            autoprefixer({
                browsers: ['> 1%', 'last 2 versions', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11'],
                cascade: true
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

// GULP JS MINIFY TO MINIFY JS
gulp.task('js', function () {

    return gulp.src([
        'src/js/*.js'
    ])
        .pipe(
            gulp.dest('dist/js')
        )
        .pipe(
            uglify({
                mangle: true,
                compress: {
                    typeofs: false
                }
            }).on('error', function(uglify) {
                console.error(uglify.message);
            })
        )
        .pipe(
            rename({
                suffix: '.min'
            })
        )
        .pipe(
            gulp.dest('dist/js')
        );

    // TODO: Source maps for the SickCRUD.js and preserve 'some' comments

});

// TASK TO COPY IMGS
gulp.task('img', function () {

    return gulp.src([
        'src/img/**/*',
    ])
        .pipe(
            gulp.dest('dist/img')
        );

});


// DEFAULT GULP TASK
gulp.task('default', function() {
    runSequence('sass', 'css', 'js', 'img');
});
