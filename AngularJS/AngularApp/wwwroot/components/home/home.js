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
