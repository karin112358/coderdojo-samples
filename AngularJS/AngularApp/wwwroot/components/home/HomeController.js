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
