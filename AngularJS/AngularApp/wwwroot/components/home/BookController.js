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
