/// <reference path="../typings/tsd.d.ts" />

class AppController {
	constructor($http: ng.IHttpService) {
		$http.defaults.headers.common["Authorization"] = "Basic " + btoa("test" + ":" + "test");
	}

	public static config($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {
		$urlRouterProvider.otherwise("/home");

		$stateProvider
			.state("home", { url: "/home", templateUrl: "/components/home/home.html", controller: HomeController })
			.state("area1", { url: "/area1", templateUrl: "components/area1/area1.html", controller: Area1Controller })
			.state("area2", { url: "/area2", templateUrl: "components/area2/area2.html", controller: Area2Controller })
			.state("login", { url: "/login", templateUrl: "components/login/login.html", controller: LoginController });
	}
}

angular.module("angularApp", ["ui.router", "ui.grid", "ui.bootstrap"])
	.config(["$stateProvider", "$urlRouterProvider", AppController.config])
	.controller("AppController", ["$http", AppController]);