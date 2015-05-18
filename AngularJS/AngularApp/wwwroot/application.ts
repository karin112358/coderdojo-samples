/// <reference path="../typings/tsd.d.ts" />

class AppController {
	constructor($router: any, $http: ng.IHttpService) {
		$router.config([
			{ path: '/', redirectTo: '/home' },
			{ path: "/home", component: "home" },
			{ path: "/area1", component: "area1" },
			{ path: "/area2", component: "area2" },
			{ path: "/login", component: "login" }
		]);

		$http.defaults.headers.common["Authorization"] = "Basic " + btoa("test" + ":" + "test");
	}
}

angular.module("angularApp", ["ngNewRouter", "ui.grid"])
	.controller("AppController", ["$router", "$http", AppController]);