class HomeController {
	constructor(private $scope: IHomeScope, private $http: ng.IHttpService, private $modal: angular.ui.bootstrap.IModalService) {
		this.$scope.books = [];
		this.$scope.editBook = (id: string) => this.editBook(id);

		this.initializeGrid();
		this.loadBooks();
	}

	private initializeGrid() {
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
	}

	private loadBooks() {
		this.$http.get("/api/books")
			.success((result: IBook[]) => {
			this.$scope.books = result;
		});
	}

	private editBook(id: string) {
		var modalInstance = this.$modal.open({
			animation: true,
			templateUrl: "bookModalContent.html",
			controller: "BookController",
			resolve: {
				bookId: () => id
			}
		});

		modalInstance.result.then((book) => {
			this.loadBooks();
			});
	}
}

interface IHomeScope extends ng.IScope {
	books: IBook[];
	gridOptions: any;
	gridScope: any;

	editBook: Function;
}

angular.module("angularApp").controller("HomeController", ["$scope", "$http", "$modal", HomeController]);