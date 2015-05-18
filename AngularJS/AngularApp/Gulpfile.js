/// <binding BeforeBuild='scripts, stylesheets' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

// include plug-ins
var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var del = require("del");

var dependencyScripts = ["bower_components/jquery/dist/jquery.js", "bower_components/angularjs/angular.js", "bower_components/bootstrap/dist/js/bootstrap.js"];
var dependencyStylesheets = ["bower_components/bootstrap/dist/css/bootstrap.css", "bower_components/bootstrap/dist/css/bootstrap-theme.css"];
var dependencyFonts = ["bower_components/bootstrap/dist/fonts/*.*"];

// Delete scripts for dependencies
gulp.task("cleanScripts", function () {
	del.sync(["wwwroot/Scripts/dependencies.min.js"]);
	del.sync(["wwwroot/Styles/dependencies.min.css"]);
	del.sync(["wwwroot/Fonts/*.*"]);
});

// Combine and minify all scripts from the bower_components folder
gulp.task("scripts", ["cleanScripts"], function () {
	gulp.src(dependencyScripts)
	  .pipe(uglify())
	  .pipe(concat("dependencies.min.js"))
	  .pipe(gulp.dest("wwwroot/Scripts/"));

	gulp.src(dependencyStylesheets)
	  .pipe(concat("dependencies.min.css"))
	  .pipe(gulp.dest("wwwroot/Styles/"));

	gulp.src(dependencyFonts)
	  .pipe(gulp.dest("wwwroot/Fonts/"));
});

//Set a default tasks
//gulp.task("default", ["scripts"], function () { });