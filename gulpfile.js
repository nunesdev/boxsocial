//modulos gulp
var gulp = require('gulp'),
    path = require('path'),
    less = require('gulp-less'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('gulp-browserify'),
    connect = require('gulp-connect'),
    runSequence =  require('run-sequence');

var rootPath = {
    source: {
        js: ["src/js/*.js"],
        lib: ["bower_components/angular/angular.min.js","bower_components/angular-spotify/dist/angular-spotify.min.js","src/js/lib/*.js"],
        html:  ["src/html/header.html","src/html/app.html","src/html/views/*.html","src/html/footer.html"], 
        css: [],
        img: ["src/img/*"],
        fonts:["src/fonts/*"],
        less: {
            base: ["src/less/*.less"],
            import: ["src/less/**/**/**"]
        }
       
    },
    dist: {
        js: "dist/js/",
        lib: "dist/js/",
        index: "dist/",
        css: "dist/css/",
        img: "dist/img/",
        fonts:"dist/fonts/"
    }
}


gulp.task("log",function(){
    gutil.log("savemyfriend running/building")
})

gulp.task("img", function(){
    gulp.src(rootPath.source.img)
        .pipe(gulp.dest(rootPath.dist.img))
     .pipe(connect.reload())
})

gulp.task("fonts", function(){
    gulp.src(rootPath.source.fonts)
        .pipe(gulp.dest(rootPath.dist.fonts))
     .pipe(connect.reload())
})

gulp.task("lib",function(){
	gulp.src(rootPath.source.lib)
        .pipe(concat("lib.js"))
         .pipe(sourcemaps.write())
            .pipe(browserify())
                .pipe(gulp.dest(rootPath.dist.lib))
     .pipe(connect.reload())
})

gulp.task("js",function(){
    gulp.src(rootPath.source.js)
    .pipe(sourcemaps.init())
        .pipe(concat("main.js"))
            .pipe(uglify())
            
            .pipe(sourcemaps.write())
            //.pipe(browserify())
                .pipe(gulp.dest(rootPath.dist.js))
     .pipe(connect.reload())
})

gulp.task('browserify', function() {
     
        gulp.src(rootPath.source.js)
        .pipe(browserify({
          insertGlobals : true,
        }))
        .pipe(gulp.dest(rootPath.dist.js))
        .pipe(connect.reload())
})

gulp.task("html",function(){
    gulp.src(rootPath.source.html)
        .pipe(concat("index.html"))
            .pipe(gulp.dest(rootPath.dist.index))
     .pipe(connect.reload())
})
                 
gulp.task("css",function(){
    gulp.src(rootPath.source.css)
        .pipe(sourcemaps.init())
            .pipe(concat("styles.css"))
                .pipe(sourcemaps.write())
                    .pipe(gulp.dest(rootPath.dist.css))
     .pipe(connect.reload())
})

gulp.task("less",function(){
    gulp.src(rootPath.source.less.base)
    .pipe(sourcemaps.init())
        .pipe(less({
        paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
        .pipe(sourcemaps.write())
            .pipe(gulp.dest(rootPath.dist.css))
                .pipe(connect.reload());
})

gulp.task("serve", function(){
     connect.server({
        root: 'dist/',
        host:'http://savemyfriend.app',
        livereload: true
  });
})

gulp.task('watch', function() {
  gulp.watch(rootPath.source.img, ['img']);
  gulp.watch(rootPath.source.fonts, ['fonts']);
  gulp.watch(rootPath.source.js, ['browserify']);
  gulp.watch(rootPath.source.lib, ['lib']);
  gulp.watch(rootPath.source.html, ['html']);
  gulp.watch(rootPath.source.css, ['css']);
  gulp.watch(rootPath.source.less.base, ['less']);
  gulp.watch(rootPath.source.less.import, ['less']);

});

gulp.task("default", function(callback) {
  runSequence("log","img","fonts", "html",
              ["lib","browserify"],
              "less",
              ["serve","watch"],
              callback);
});
