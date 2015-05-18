/// <reference path="../typings/tsd.d.ts" />
var AppController = (function () {
    function AppController($router, $http) {
        $router.config([
            { path: '/', redirectTo: '/home' },
            { path: "/home", component: "home" },
            { path: "/area1", component: "area1" },
            { path: "/area2", component: "area2" },
            { path: "/login", component: "login" }
        ]);
        $http.defaults.headers.common["Authorization"] = "Basic " + btoa("test" + ":" + "test");
    }
    return AppController;
})();
angular.module("angularApp", ["ngNewRouter", "ui.grid"]).controller("AppController", ["$router", "$http", AppController]);
