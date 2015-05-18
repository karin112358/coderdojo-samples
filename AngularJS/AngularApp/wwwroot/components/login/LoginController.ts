class LoginController {
	public name: string;

	constructor() {
		this.name = "Login Test";
	}
}

angular.module("angularApp").controller("LoginController", [LoginController]);
