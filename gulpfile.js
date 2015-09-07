var gulp = require("gulp");
var sass = require("gulp-sass");
var minify = require("gulp-minify-css");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var bower = require("gulp-bower");
var watch = require("gulp-watch");
var del = require("del");
var rename = require("gulp-rename");
var plumber = require("gulp-plumber");
var react = require("gulp-react");
var eventstream = require("event-stream");
var browserify = require("gulp-browserify");
var concatcss = require("gulp-concat-css");
var cssurladjuster = require("gulp-css-url-adjuster");
var jasmine = require("gulp-jasmine");
var jasreporter = require("jasmine-reporters");
var mainbowerfiles = require("main-bower-files");
var filter = require("gulp-filter");

var config = {
    "js": [
        "bower/materialize/dist/js/materialize.js",
        "bower/json3/lib/json3.js",
        "bower/hammerjs/hammer.js"
    ],
    "css": [
        "bower/animate.css/animate.css"
    ]
};

gulp.task("default", function () {
    gulp.start("scss", "js");
    gulp.watch(["./sass/*.scss", "./sass/**/*.scss"], ["scss"]);
    gulp.watch(["./react/*.js", "./react/**/*.js", "./src/*.js"], ["js"]);
    console.log("Watching scss...");
    console.log("Watching js...");
});


gulp.task("test", function () {
    gulp.src(["./react/__tests__/*.js"])
        .pipe(jasmine({
            verbose:true,
            includeStackTrace: true,
            reporter: new jasreporter.TerminalReporter()
        }));
});

gulp.task("bower", function(){
   bower();
});

gulp.task("scss", function () {
    var scss_stream = gulp.src(["./sass/*.scss", "./sass/**/*.scss"])
        .pipe(plumber(function (error) {
            console.log(error.toString());
            this.emit("end");
        }))
        .pipe(sass())
        .pipe(gulp.dest("build"));


    var css_stream = gulp.src(config.css);

    eventstream.merge(css_stream, scss_stream)
        .pipe(concatcss("bundle.css"))
        .pipe(cssurladjuster({
            replace: ["../fonts/", "../font/"]
        })).pipe(cssurladjuster({
            replace: ["../../font/", "../font/"]
        }))
        .pipe(minify())
        .pipe(rename("bundle.min.css"))
        .pipe(gulp.dest("build"));
});

gulp.task("js", function () {
    var react_stream = gulp.src("./react/app.js")
        .pipe(plumber(function (error) {
            console.log(error.toString());
            this.emit("end");
        }))
        .pipe(browserify({
            "transform": [
                ["reactify", {
                    "es6": true
                }]
            ]
        }))
        .pipe(gulp.dest("build"));

    var js_stream = gulp.src(config.js);

    eventstream.merge(js_stream, react_stream)
        .pipe(concat("bundle.js"))
        .pipe(gulp.dest("build"))
        .pipe(rename("bundle.min.js"))
        .pipe(gulp.dest("build"));
});