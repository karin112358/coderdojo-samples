var HomeController = (function () {
    function HomeController($http) {
        this.$http = $http;
        this.books = [];
        this.loadBooks();
    }
    HomeController.prototype.loadBooks = function () {
        this.books = [{ title: "Book 1", price: 20.50 }, { title: "Book 2", price: 11.90 }];
    };
    return HomeController;
})();
var Book = (function () {
    function Book() {
    }
    return Book;
})();
angular.module("angularApp").controller("HomeController", ["$http", HomeController]);
