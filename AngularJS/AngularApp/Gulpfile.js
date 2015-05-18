/// <binding BeforeBuild='scripts' ProjectOpened='customStyles:watch, typescript:watch' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

// include plug-ins
var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var del = require("del");
var sass = require("gulp-sass");
var ts = require("gulp-typescript");

var dependencyScripts = ["bower_components/jquery/dist/jquery.js", "bower_components/angularjs/angular.js", "bower_components/angular-ui-grid/ui-grid.js", "node_modules/angular-new-router/dist/router.es5.js", "bower_components/bootstrap/dist/js/bootstrap.js"];
var dependencyStylesheets = ["bower_components/angular-ui-grid/ui-grid.css", "bower_components/bootstrap/dist/css/bootstrap.css", "bower_components/bootstrap/dist/css/bootstrap-theme.css"];
var bootstrapFonts = ["bower_components/bootstrap/dist/fonts/*.*"];
var uiGridResources = ["bower_components/angular-ui-grid/ui-grid.eot", "bower_components/angular-ui-grid/ui-grid.svg", "bower_components/angular-ui-grid/ui-grid.ttf", "bower_components/angular-ui-grid/ui-grid.woff"];
var customStylesheets = ["styles/styles.scss"];
var typescriptFiles = ["wwwroot/*.ts", "wwwroot/**/*.ts"];

// Delete scripts for dependencies
gulp.task("cleanScripts", function () {
	del.sync(["wwwroot/scripts/dependencies.min.js"]);
	del.sync(["wwwroot/styles/dependencies.min.css"]);
	del.sync(["wwwroot/fonts/*.*"]);
});

// Delete custom styles
gulp.task("cleanCustomStyles", function () {
	del.sync(["wwwroot/styles/styles.min.css"]);
	del.sync(["wwwroot/styles/*.eot"]);
	del.sync(["wwwroot/styles/*.svg"]);
	del.sync(["wwwroot/styles/*.ttf"]);
	del.sync(["wwwroot/styles/*.woff"]);
});

// Delete custom scripts
gulp.task("cleanCustomScipts", function () {
	del.sync(["wwwroot/scripts/application.js"]);
});

// Combine and minify all scripts from the bower_components folder
gulp.task("scripts", ["cleanScripts", "customStyles"], function () {
	gulp.src(dependencyScripts)
	  .pipe(uglify())
	  .pipe(concat("dependencies.min.js"))
	  .pipe(gulp.dest("wwwroot/scripts/"));

	gulp.src(dependencyStylesheets)
	  .pipe(concat("dependencies.min.css"))
	  .pipe(gulp.dest("wwwroot/styles/"));

	gulp.src(bootstrapFonts)
	  .pipe(gulp.dest("wwwroot/fonts/"));

	gulp.src(uiGridResources)
	  .pipe(gulp.dest("wwwroot/styles/"));
});

gulp.task("customStyles", ["cleanCustomStyles"], function () {
	gulp.src(customStylesheets)
		.pipe(sass().on("error", sass.logError))
		.pipe(concat("styles.min.css"))
		.pipe(gulp.dest("wwwroot/styles/"));

});

gulp.task("customStyles:watch", function () {
	gulp.watch("styles/*.scss", ["customStyles"]);
});

gulp.task("typescript", ["cleanCustomScipts"], function () {
	var tsResult = gulp.src(typescriptFiles)
	  .pipe(ts({
	  	noImplicitAny: true,
	  	out: "application.js"
	  }));

	return tsResult.js.pipe(gulp.dest("wwwroot/scripts"));
});

gulp.task("typescript:watch", function () {
	gulp.watch(["wwwroot/*.ts", "wwwroot/**/*.ts"], ["typescript"]);
});


//Set a default tasks
gulp.task("default", ["scripts"], function () { });