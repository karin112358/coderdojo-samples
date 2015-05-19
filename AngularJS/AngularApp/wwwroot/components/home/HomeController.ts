class HomeController {
	constructor(private $scope: IBookScope, private $http: ng.IHttpService) {
		this.$scope.books = [];
		this.loadBooks();
	}

	private loadBooks() {
		this.$http.get("/api/books")
			.success((result: IBook[]) => {
				this.$scope.books = result;
			});
	}
}

interface IBookScope extends ng.IScope {
	books: IBook[]
}

interface IBook {
	title: string;
	price: number;
}

angular.module("angularApp").controller("HomeController", ["$http", HomeController]);