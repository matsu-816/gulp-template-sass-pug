
import gulp from 'gulp';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import packageImporter from 'node-sass-package-importer';
import mqpacker from 'css-mqpacker';
import sortCSSmq from 'sort-css-media-queries';
import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber'
import browserSync from 'browser-sync'
import paths from '../config.js';

gulp.task('sass', () => {
  return gulp.src(`${paths.srcSass}/*.sass`)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({
      importer: packageImporter({
        extensions: ['.sass', '.css']
      })
    }))
    .pipe(postcss([
      mqpacker({
        sort: sortCSSmq
      }),
      autoprefixer({
        remove: false,
        grid: true
      })
    ]))
    .on('error', function (err) {
      console.log(err.message);
    })
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${paths.distCss}`))
    .pipe(browserSync.stream());
});
