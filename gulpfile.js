import gulp from "gulp";
import clean from "gulp-clean";
import htmlmin from "gulp-htmlmin";
import concat from "gulp-concat";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import cleancss from "gulp-clean-css";
import autoprefixer from "gulp-autoprefixer";
import imagemin from "gulp-imagemin";
import browserSync from "browser-sync";
import minify from "gulp-minify";

const sass = gulpSass(dartSass);
const bS = browserSync.create();

//BUILD STYLES

const buildStyles = () =>
  gulp
    .src("./src/scss/*.scss")
    .pipe(sass())
    .pipe(concat("styles.min.css"))
    .pipe(autoprefixer("last 2 versions"))
    .pipe(cleancss())
    .pipe(gulp.dest("./dist/css"));

//JS CONCAT AND MIN

const concatMinJs = () =>
  gulp
    .src("./src/js/*.js")
    .pipe(concat("scripts.js"))
    .pipe(minify({ noSource: true }))
    .pipe(gulp.dest("./dist/js"));

//MIN IMGS

export const minImg = () =>
  gulp.src("src/images/*").pipe(imagemin()).pipe(gulp.dest("dist/images"));

//CLEAN DIST

const cleanDist = () => gulp.src("./dist/*", { read: false }).pipe(clean());

//EXPORT

export const dev = gulp.series(concatMinJs, buildStyles, () => {
  bS.init({
    server: {
      baseDir: "./",
    },
  });

  gulp.watch(
    "./src/**/*",
    gulp.series(buildStyles, concatMinJs, (done) => {
      bS.reload();
      done();
    })
  );
});

export const build = gulp.series(cleanDist, buildStyles, minImg, concatMinJs);
