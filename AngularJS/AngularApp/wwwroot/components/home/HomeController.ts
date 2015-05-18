class HomeController {
	public books: IBook[] = [];

	constructor(private $http: ng.IHttpService) {
		this.loadBooks();
	}

	private loadBooks() {
		this.$http.get("/api/books")
			.success((result: IBook[]) => {
				this.books = result;
			});
	}
}

interface IBook {
	title: string;
	price: number;
}

angular.module("angularApp").controller("HomeController", ["$http", HomeController]);