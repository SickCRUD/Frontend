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
                '/plugins': 'dist/plugins'
            }
        }
    });

    gulp.watch([
        'src/sick-crud/*.scss',
        'src/sick-crud/**/*.scss'
    ], ['sass']);

    gulp.watch([
        'src/sick-crud/js/*.js',
        'src/sick-crud/js/**/*.js'
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
        'src/bootstrap/scss/bootstrap.scss',
        'src/sick-crud/scss/sick-crud.scss'
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

// GULP JS MINIFY TO MINIFY JS
gulp.task('js', function () {

    let bootstrap = gulp.src([
        'src/bootstrap/js/*.min.js',
        '!src/bootstrap/js/bootstrap.bundle.min.js'
    ])
        .pipe(
            gulp.dest('dist/js')
        );

    let sickCRUD = gulp.src([
        'src/sick-crud/js/*.js'
    ])
        .pipe(
            uglify({
                mangle: true,
                compress: {
                    typeofs: false
                }
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

    let plugins = gulp.src([
        'src/sick-crud/plugins/**/*.min.js',
        'src/sick-crud/plugins/**/'
    ])
        .pipe(
            gulp.dest('dist/plugins')
        )
        .on('end', function () {

            gulp.src([
                'dist/plugins/**/*.js',
                '!dist/plugins/**/*.min.js'
            ])
                .pipe(
                    vinylPaths(del)
                );

        });

    return merge(bootstrap, sickCRUD, plugins);

});

// DEFAULT GULP TASK
gulp.task('default', function() {
    runSequence('sass', 'css', 'js');
});
