var gulp = require('gulp'),
autoprefixer = require('gulp-autoprefixer'),
sass = require('gulp-sass');

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