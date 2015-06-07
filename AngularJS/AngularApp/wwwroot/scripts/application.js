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
angular.module("angularApp", ["ui.router", "ui.grid", "ui.bootstrap"]).config(["$stateProvider", "$urlRouterProvider", AppController.config]).controller("AppController", ["$http", AppController]);
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
var BookController = (function () {
    function BookController($scope, $http, $modalInstance, bookId) {
        var _this = this;
        this.$scope = $scope;
        this.$http = $http;
        this.$modalInstance = $modalInstance;
        this.bookId = bookId;
        this.loadBook();
        this.$scope.ok = function () {
            _this.$http.put("/api/books/" + _this.bookId, _this.$scope.book).success(function (result) {
                $modalInstance.close($scope.book);
            });
        };
        this.$scope.cancel = function () {
            $modalInstance.dismiss("cancel");
        };
    }
    BookController.prototype.loadBook = function () {
        var _this = this;
        this.$http.get("/api/books/" + this.bookId).success(function (result) {
            if (result) {
                _this.$scope.book = result;
            }
            else {
                alert("Book " + _this.bookId + " not found.");
            }
        }).error(function () {
            alert("Book " + _this.bookId + " could not be loaded.");
        });
    };
    return BookController;
})();
angular.module("angularApp").controller("BookController", BookController);
var HomeController = (function () {
    function HomeController($scope, $http, $modal) {
        var _this = this;
        this.$scope = $scope;
        this.$http = $http;
        this.$modal = $modal;
        this.$scope.books = [];
        this.$scope.editBook = function (id) { return _this.editBook(id); };
        this.initializeGrid();
        this.loadBooks();
    }
    HomeController.prototype.initializeGrid = function () {
        this.$scope.gridOptions = {
            data: "books",
            enableRowSelection: true,
            enableGridMenu: true,
            enableSorting: true,
            columnDefs: [
                { name: "title", type: "string" },
                { name: "price", type: "number" },
                { field: "id", displayName: "", enableCellEdit: false, cellTemplate: "<div class=\"ui-grid-cell-contents\" ng-class=\"col.colIndex()\"><a ng-click=\"grid.appScope.editBook(COL_FIELD)\">Edit</a></div>" }
            ]
        };
    };
    HomeController.prototype.loadBooks = function () {
        var _this = this;
        this.$http.get("/api/books").success(function (result) {
            _this.$scope.books = result;
        });
    };
    HomeController.prototype.editBook = function (id) {
        var _this = this;
        var modalInstance = this.$modal.open({
            animation: true,
            templateUrl: "bookModalContent.html",
            controller: "BookController",
            resolve: {
                bookId: function () { return id; }
            }
        });
        modalInstance.result.then(function (book) {
            _this.loadBooks();
        });
    };
    return HomeController;
})();
angular.module("angularApp").controller("HomeController", ["$scope", "$http", "$modal", HomeController]);
var LoginController = (function () {
    function LoginController() {
        this.name = "Login Test";
    }
    return LoginController;
})();
angular.module("angularApp").controller("LoginController", [LoginController]);

//# sourceMappingURL=maps/application.js.map