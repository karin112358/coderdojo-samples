/// <binding BeforeBuild='typescript, sass, dependencyScriptsAndStyles' ProjectOpened='typescript:watch, sass:watch' />
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
var sourcemaps = require("gulp-sourcemaps");
var changed = require("gulp-changed");
var newer = require('gulp-newer');
var minifycss = require("gulp-minify-css");

var dependencyScripts = ["bower_components/jquery/dist/jquery.js", "bower_components/angularjs/angular.js", "bower_components/angular-ui-grid/ui-grid.js", "bower_components/angular-ui-router/release/angular-ui-router.js", "bower_components/bootstrap/dist/js/bootstrap.js"];
var dependencyStylesheets = ["bower_components/angular-ui-grid/ui-grid.css", "bower_components/bootstrap/dist/css/bootstrap.css", "bower_components/bootstrap/dist/css/bootstrap-theme.css"];
var bootstrapFonts = ["bower_components/bootstrap/dist/fonts/*.*"];
var bootstrapCss = ["bower_components/bootstrap/dist/css/bootstrap.css"];
var uiGridResources = ["bower_components/angular-ui-grid/ui-grid.eot", "bower_components/angular-ui-grid/ui-grid.svg", "bower_components/angular-ui-grid/ui-grid.ttf", "bower_components/angular-ui-grid/ui-grid.woff"];
var customStylesheets = ["wwwroot/components/styles/styles.scss"];
var typescriptFiles = ["wwwroot/*.ts", "wwwroot/**/*.ts"];

// Delete scripts for dependencies
gulp.task("clean", function () {
	del.sync(["wwwroot/scripts/dependencies.min.js"]);
	del.sync(["wwwroot/styles/dependencies.min.css"]);
	del.sync(["wwwroot/fonts/*.*"]);
	del.sync(["wwwroot/styles/*.eot"]);
	del.sync(["wwwroot/styles/*.svg"]);
	del.sync(["wwwroot/styles/*.ttf"]);
	del.sync(["wwwroot/styles/*.woff"]);

	del.sync(["wwwroot/styles/styles.min.css"]);
	del.sync(["wwwroot/styles/bootstrap.css"]);

	del.sync(["wwwroot/scripts/application.js"]);
});

// Combine and minify all scripts from the bower_components folder
gulp.task("dependencyScriptsAndStyles", [], function () {
	gulp.src(dependencyScripts)
		.pipe(newer("wwwroot/scripts/dependencies.min.js"))
		.pipe(uglify())
		.pipe(concat("dependencies.min.js"))
		.pipe(gulp.dest("wwwroot/scripts/"));

	gulp.src(dependencyStylesheets)
		.pipe(newer("wwwroot/styles/dependencies.min.css"))
		.pipe(minifycss())
		.pipe(concat("dependencies.min.css"))
		.pipe(gulp.dest("wwwroot/styles/"));

	gulp.src(bootstrapCss)
		.pipe(changed("wwwroot/styles/"))
		.pipe(gulp.dest("wwwroot/styles/"));

	gulp.src(bootstrapFonts)
		.pipe(changed("wwwroot/fonts/"))
		.pipe(gulp.dest("wwwroot/fonts/"));

	gulp.src(uiGridResources)
		.pipe(changed("wwwroot/styles/"))
		.pipe(gulp.dest("wwwroot/styles/"));
});

gulp.task("sass", [], function () {
	gulp.src(customStylesheets)
		.pipe(newer("wwwroot/styles/styles.min.css"))
		.pipe(sass({
			sourcemap: true, sourcemapPath: "wwwroot/components/styles"
		}))
		.pipe(minifycss())
		.pipe(concat("styles.min.css"))
		.pipe(gulp.dest("wwwroot/styles/"));
});

gulp.task("sass:watch", function () {
	gulp.watch("styles/*.scss", ["sass"]);
});

gulp.task("typescript", [], function () {
	return gulp.src(typescriptFiles)
		.pipe(newer("wwwroot/scripts/application.js"))
		.pipe(sourcemaps.init())
		.pipe(ts({
			noImplicitAny: true,
			out: "application.js"
		}))
		.pipe(sourcemaps.write("./maps"))
		.pipe(gulp.dest("wwwroot/scripts"));
});

gulp.task("typescript:watch", function () {
	gulp.watch(["wwwroot/*.ts", "wwwroot/**/*.ts"], ["typescript"]);
});

//Set a default tasks
gulp.task("default", ["clean", "sass", "typescript", "dependencyScriptsAndStyles"], function () { });