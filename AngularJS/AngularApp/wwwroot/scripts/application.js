/// <reference path="../typings/tsd.d.ts" />
var AppController = (function () {
    function AppController($router, $http) {
        $router.config([
            { path: '/', redirectTo: '/home' },
            { path: "/home", component: "home" },
            { path: "/area1", component: "area1" },
            { path: "/area2", component: "area2" },
            { path: "/login", component: "login" }
        ]);
        $http.defaults.headers.common["Authorization"] = "Basic " + btoa("test" + ":" + "test");
    }
    return AppController;
})();
angular.module("angularApp", ["ngNewRouter", "ui.grid"]).controller("AppController", ["$router", "$http", AppController]);
var Area1Controller = (function () {
    function Area1Controller() {
    }
    return Area1Controller;
})();
angular.module("angularApp").controller("Area1Controller", Area1Controller);
var Area2Controller = (function () {
    function Area2Controller() {
    }
    return Area2Controller;
})();
angular.module("angularApp").controller("Area2Controller", Area2Controller);
var HomeController = (function () {
    function HomeController($http) {
        this.$http = $http;
        this.books = [];
        this.loadBooks();
    }
    HomeController.prototype.loadBooks = function () {
        var _this = this;
        this.$http.get("/api/books").success(function (result) {
            _this.books = result;
        });
    };
    return HomeController;
})();
angular.module("angularApp").controller("HomeController", ["$http", HomeController]);
var LoginController = (function () {
    function LoginController() {
        this.name = "Login Test";
    }
    return LoginController;
})();
angular.module("angularApp").controller("LoginController", [LoginController]);
