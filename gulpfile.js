var gulp = require('gulp'),
watch = require('gulp-watch'),
autoprefixer = require('gulp-autoprefixer'),
sass = require('gulp-sass')
browserSync = require('browser-sync').create();

gulp.task('default', function() {
  console.log("Hooray - you created a Gulp task.");
});

gulp.task('html', function() {
  console.log("Imagine something useful being done to your HTML here.");
});

gulp.task('styles', function() {
  return gulp.src(['./node_modules/bootstrap/scss/bootstrap.scss','./app/assets/styles/*.scss'])
    .pipe(sass())
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false}))
    .on('error', function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('./app/temp/cssprocssor'));
});

gulp.task('watch', function() {

  browserSync.init({
    server: {
      baseDir: "app"
    }
  });

  watch('./app/index.html', function() {
    browserSync.reload();
  });

  watch('./app/assets/styles/**/*.scss', function() {
    gulp.start('cssInject');
  });

});

gulp.task('cssInject', ['styles'], function() {
  return gulp.src('./app/temp/cssprocssor/*.css')
  .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js'])
        .pipe(gulp.dest("./app/src/js"))
        .pipe(browserSync.stream());
});