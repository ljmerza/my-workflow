// ===================================
// Required node modules
// ===================================
var gulp            = require('gulp'),                      // use gulp
    sass            = require('gulp-sass'),                 // compiles sass
    plumber         = require('gulp-plumber'),              // prevent pipe breaking in gulp
    autoprefixer    = require('gulp-autoprefixer'),         // autoprefixes css
    browserSync     = require('browser-sync'),              // browser-sync ftw
    nodemon 		= require('gulp-nodemon')               // node.js server auto aync
    reload          = browserSync.reload,                   // variable to reload the browser
    uglify          = require('gulp-uglify'),               // uglifies Javascript
    minify          = require('gulp-clean-css'),            // minifies CSS
    concat          = require('gulp-concat')                // concatenates files
    imagemin 		= require('gulp-imagemin')				// image minifier
    pngquant 		= require('imagemin-pngquant'),			// png image minifier
    csso 			= require('gulp-csso'),					// css minifer 
    csslint 		= require('gulp-csslint')				// css linter
    htmlhint 		= require('gulp-htmlhint')				// html linter
    jshint 			= require('gulp-jshint')				// js linter
    notify 			= require("gulp-notify")                // event notifications

// ===================================
// Javascript task:
// ===================================
gulp.task('javascript', () => {
    gulp.src('./publis/js/**/*.js', {base: './'})           // Source: js files in public folder
    .pipe(plumber())                                        // Prevent pipe breaking if errors
    .pipe(concat('script.js'))                          	// Concatenate into one file
    //.pipe(uglify())                                       // Uglify the file (Comment this while in development)
    .pipe(jshint())						                    // lint js files
    .pipe(jshint.reporter('default'))                       // set output of js linter
    .pipe(gulp.dest('./'))                                  // Destination folder
    .pipe(reload({stream:true}))                            // Reload the browser
});

// ===================================
// Sass task
// ===================================
gulp.task('sass', () => {
    gulp.src('./public/css/**/*.sass', {base: './'})        // Source: sass files in public folder
    .pipe(plumber())                                        // Prevent pipe breaking if errors
    .pipe(sass())                                           // Compiles sass
    .pipe(autoprefixer('last 3 versions'))                  // Adds vendor prefixes to css
    //.pipe(csso())                                         // Minify the css (Comment this while in development)
    .pipe(csslint())                                        // css lint
    .pipe(csslint.reporter())                               // set output of css lint
    .pipe(gulp.dest('./'))                                 	// Destination folder
    .pipe(reload({stream:true}))                            // Reload the browser
});

// ===================================
// HTML/JADE tasks
// ===================================
gulp.task('html', () => {
    gulp.src('./public/**/*.html')                          // Source: html files in public folder
    .pipe(htmlhint())                                       // html linting
    .pipe(reload({stream:true}))                          	// Reload the browser
})
gulp.task('jade', () => {
    gulp.src('./views/**/*.jade')                           // Souce: jdae files in views folder for expreesJS
    .pipe(reload({stream:true}))                          	// Reload the browser
})

// ===================================
// Browser-sync task
// ===================================
gulp.task('browser-sync', ['nodemon'], () => {
    browserSync({
        proxy: "localhost:3000",                            // set proxy for expressJS server
        port: 5000                                          // set port for browser-snyc
	})
	gulp.src(".").pipe(notify("Browser synced!"))           // notify when browser syncs
})

// ===================================
// Node-sync task
// ===================================
gulp.task('nodemon', () => {
  	nodemon({
    	script: 'app.js',                                  // set express.js file that starts server
    	ignore: ['gulpfile.js','node_modules/']            // ignore these files when syncing
  	})
  	.on('restart', () => {                                 // on restart reload server
    	setTimeout(() =>  {
      		reload({ stream: false })
    	}, 1000)
    	gulp.src(".").pipe(notify("Node Server Restarted!"))
  	})
  	.on('crash', () => {                                   // on server cash notify
  		gulp.src(".").pipe(notify("Node Server Crash!"))
  	})
  	.on('start', () => {                                   // on serve start notify
  		gulp.src(".").pipe(notify("Node Server Started!"))
  	})
})

// ===================================
// Image task
// ===================================
gulp.task('image', () => {
	gulp.src('./public/img/**/*', {base: './'})            // Source: image files in public folder
	.pipe(plumber())                                       // Prevent pipe breaking if errors
	.pipe(imagemin({                                       // minify image
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	}))

	.pipe(gulp.dest('./'))     
	.pipe(reload({stream:true}))                           // reload page
})

// ===================================
// Watch tasks
// ===================================
gulp.task('watch', () => {                                  // what for sass, js, html, and jdae changes
    gulp.watch('./**/*.js', ['javascript'])
    gulp.watch('./public/css/**/*.sass', ['sass'])
    gulp.watch('./public/**/*.html', ['html'])
    gulp.watch('./views/**/*.jade', ['jade'])
    gulp.watch('./public/img/**/*', ['image'])
})

// ===================================
// Default task
// ===================================
gulp.task('default', ['javascript', 'sass',  'html', 'jade', 'browser-sync', 'watch'])