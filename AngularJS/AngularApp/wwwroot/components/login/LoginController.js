var LoginController = (function () {
    function LoginController() {
        this.name = "Login Test";
    }
    return LoginController;
})();
angular.module("angularApp").controller("LoginController", [LoginController]);
