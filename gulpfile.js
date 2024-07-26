/**
 * Task to building styles
 */

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const gulp = require('gulp');
const mqpacker = require('css-mqpacker');
const path = require('path');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const replace = require('gulp-string-replace');

const postCSSOptions = [
    autoprefixer(),
    mqpacker(), // Gabung media query jadi satu
    cssnano(), // Minify css
];

const sassOptions = {
    includePaths: [path.resolve(__dirname, './src/')],
};

module.exports = {
    postCSSOptions,
    sassOptions,
};

gulp.task('blocks', function () {
    return gulp
        .src([path.resolve(__dirname, './src/assets/blocks.scss')])
        .pipe(sass({ includePaths: ['node_modules'] }))
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(concat('blocks.css'))
        .pipe(postcss(postCSSOptions))
        .pipe(gulp.dest('gutenverse/assets/css/'));
});

gulp.task('frontend', function () {
    return gulp
        .src([path.resolve(__dirname, './src/assets/frontend.scss')])
        .pipe(sass({ includePaths: ['node_modules'] }))
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(concat('frontend.css'))
        .pipe(postcss(postCSSOptions))
        .pipe(gulp.dest('gutenverse/assets/css/'));
});

gulp.task('wizard', function () {
    return gulp
        .src([path.resolve(__dirname, './src/assets/wizard.scss')])
        .pipe(sass({ includePaths: ['node_modules'] }))
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(concat('wizard.css'))
        .pipe(postcss(postCSSOptions))
        .pipe(gulp.dest('gutenverse/assets/css/'));
});

gulp.task('update-notice', function () {
    return gulp
        .src([path.resolve(__dirname, './src/assets/update-notice.scss')])
        .pipe(sass({ includePaths: ['node_modules'] }))
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(concat('update-notice.css'))
        .pipe(postcss(postCSSOptions))
        .pipe(gulp.dest('gutenverse/assets/css/'));
});

gulp.task('build-process', gulp.parallel('blocks', 'frontend', 'wizard', 'update-notice'));

gulp.task('build', gulp.series('build-process'));

const watchProcess = (basePath = '.') => {
    gulp.watch([`${basePath}/src/**/*.scss`], gulp.parallel(['blocks', 'frontend', 'wizard', 'update-notice']));
};

gulp.task(
    'watch',
    gulp.series('build-process', function watch(done) {
        watchProcess();
        done();
    })
);

gulp.task('clean', function () {
    return del([
        './build/**',
        './release/**',
        './gutenverse/assets/js/**',
        './gutenverse/assets/css/**',
        './gutenverse/languages/**',
        './gutenverse/lib/dependencies/**'
    ], { force: true });
});

/**
 * Gulp package release
 */
gulp.task('copy-plugin-folder', function () {
    return gulp
        .src(['./gutenverse/**/*', '!./gutenverse/lib/framework/**'], { encoding: false })
        .pipe(gulp.dest('./release/gutenverse/'));
});

gulp.task('copy-framework', function () {
    return gulp
        .src('./gutenverse-core/framework/**/*', { encoding: false })
        .pipe(gulp.dest('./release/gutenverse/lib/framework/'));
});

gulp.task('replace-text-domain', function () {
    return gulp
        .src(['./release/gutenverse/lib/framework/**/*.js', './release/gutenverse/lib/framework/**/*.php'])
        .pipe(replace('--gctd--', 'gutenverse'))
        .pipe(gulp.dest('./release/gutenverse/lib/framework/'));
});

gulp.task('release', gulp.series(
    'copy-plugin-folder',
    'copy-framework',
    'replace-text-domain',
));

async function getZip() {
    const zip = await import('gulp-zip');
    return zip.default;
};

gulp.task('zip', async function () {
    const zip = await getZip();
    return gulp
        .src('./release/gutenverse/**', { base: './release', encoding: false })
        .pipe(zip('gutenverse.zip'))
        .pipe(gulp.dest('./release'));
});

module.exports.watchProcess = watchProcess;
