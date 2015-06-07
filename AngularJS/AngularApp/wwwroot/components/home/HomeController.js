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
