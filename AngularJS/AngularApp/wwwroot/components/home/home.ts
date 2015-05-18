class HomeController {
	public books: Book[] = [];

	constructor(private $http: ng.IHttpService) {
		this.loadBooks();
	}

	private loadBooks() {
		this.books = [{ title: "Book 1", price: 20.50 }, { title: "Book 2", price: 11.90 }];
	}
}

class Book {
	public title: string;
	public price: number;
}

angular.module("angularApp").controller("HomeController", ["$http", HomeController]);