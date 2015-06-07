class BookController {
	constructor(private $scope: IBookScope, private $http: ng.IHttpService, private $modalInstance: angular.ui.bootstrap.IModalServiceInstance, private bookId: string) {
		this.loadBook();

		this.$scope.ok = () => {
			this.$http.put("/api/books/" + this.bookId, this.$scope.book)
				.success((result: IBook) => {
					$modalInstance.close($scope.book);
			});
		};

		this.$scope.cancel = () => {
			$modalInstance.dismiss("cancel");
		};
	}

	private loadBook() {
		this.$http.get("/api/books/" + this.bookId)
			.success((result: IBook) => {
			if (result) {
				this.$scope.book = result;
			} else {
				alert("Book " + this.bookId + " not found.");
			}
		}).error(() => {
			alert("Book " + this.bookId + " could not be loaded.");
		});
	}
}

angular.module("angularApp").controller("BookController", BookController);

interface IBookScope extends ng.IScope {
	book: IBook;

	ok: Function;
	cancel: Function;
}

interface IBook {
	id: string;
	title: string;
	price: number;
}