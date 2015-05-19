/// <reference path="../typings/tsd.d.ts" />
var AppController = (function () {
    function AppController($http) {
        $http.defaults.headers.common["Authorization"] = "Basic " + btoa("test" + ":" + "test");
    }
    AppController.config = function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home");
        $stateProvider.state("home", { url: "/home", templateUrl: "/components/home/home.html", controller: HomeController }).state("area1", { url: "/area1", templateUrl: "components/area1/area1.html", controller: Area1Controller }).state("area2", { url: "/area2", templateUrl: "components/area2/area2.html", controller: Area2Controller }).state("login", { url: "/login", templateUrl: "components/login/login.html", controller: LoginController });
    };
    return AppController;
})();
angular.module("angularApp", ["ui.router", "ui.grid"]).config(["$stateProvider", "$urlRouterProvider", AppController.config]).controller("AppController", ["$http", AppController]);
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
var LoginController = (function () {
    function LoginController() {
        this.name = "Login Test";
    }
    return LoginController;
})();
angular.module("angularApp").controller("LoginController", [LoginController]);
var HomeController = (function () {
    function HomeController($scope, $http) {
        this.$scope = $scope;
        this.$http = $http;
        this.$scope.books = [];
        this.loadBooks();
    }
    HomeController.prototype.loadBooks = function () {
        var _this = this;
        this.$http.get("/api/books").success(function (result) {
            _this.$scope.books = result;
        });
    };
    return HomeController;
})();
angular.module("angularApp").controller("HomeController", ["$http", HomeController]);
