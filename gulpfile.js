var gulp = require('gulp');
var sass = require('gulp-ruby-sass')
var connect = require('gulp-connect')
var notify = require('gulp-notify');
var bower = require('gulp-bower');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var stream = require('gulp-streamify');
var browserify = require('browserify');
var debowerify = require('debowerify');

var source = require('vinyl-source-stream');
var sequence = require('run-sequence');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var config = {
  sass_dir: './src/scss',
  bower_dir: './src/libs'
}

/** Bower TASK **/
gulp.task( 'bower', function () {
  return bower()
    .pipe( gulp.dest( config.bower_dir ) )
} );

/** Sass TASK **/
gulp.task('sass', () =>
    sass( config.sass_dir + '/master.scss', {
      style: 'expanded',
      loadPath: [
        config.bower_dir + '/bootstrap-sass/assets/stylesheets',
        config.bower_dir + '/font-awesome/scss'
      ]
    } )
        .on('error', sass.logError)
        .pipe(gulp.dest('./public/css'))
        .pipe(reload({stream:true}))
);

/** Icon TASK **/
gulp.task( 'icons', function () {
    return gulp.src( [ config.bower_dir + '/font-awesome/fonts/**.*', config.bower_dir + '/bootstrap-sass/assets/fonts/**/**.*' ] )
      .pipe( gulp.dest( './public/fonts' ) );
} );

/** Connect TASK **/
gulp.task( 'connect', function () {
  connect.server({
    root: 'public',
    port: 4000
  } )
} );

/** Browserify TASK **/
gulp.task( 'browserify', function () {
  //Grab files
  return browserify( ['src/app/app.js'] )
  .transform(debowerify)
  .bundle()
  .pipe( source( 'bundle.js' ) )
  .pipe( stream(uglify()) )
  //Dest
  .pipe( gulp.dest( 'public/bin/' ) )
} );

/** Watch TASK **/
gulp.task( 'watch', [ 'sass', 'browser-sync', 'connect' ], function () {
  gulp.watch( [ 'src/scss/*.scss', 'src/scss/**/*.scss' ], [ 'sass' ] )
  gulp.watch( [ 'src/app/*.js', 'src/app/**/*.js' ], [ 'browserify' ] )
  gulp.watch( [ 'public/*.html' ], [ 'bs-reload' ] );
} );

/** Sync TASK **/
gulp.task( 'browser-sync', function () {
  browserSync.init(
    [
      'public/css/*.css',
      'public/bin/*.js'
    ],
    {
      proxy: 'localhost:4000'
  } );
} );

/** Reload task **/
gulp.task('bs-reload', function () {
    browserSync.reload();
});

/** Clean TASK **/
gulp.task( 'clean', function () {
  return gulp.src( ['./public/bin/*.js', './public/css/*.css'] )
  .pipe(clean())
} );

/** Build TASK **/
gulp.task( 'build', function ( callback ) {
  sequence( 'clean', 'sass', 'icons', 'browserify' )
} );

/** Default TASK **/
gulp.task( 'default', function ( callback ) {
  sequence( [ 'build', 'watch' ] )
} );
