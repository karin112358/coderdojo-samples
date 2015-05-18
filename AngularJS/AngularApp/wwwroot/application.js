/// <reference path="../typings/angularjs/angular.d.ts" />
angular.module("angularApp", ["ngNewRouter"]).controller("AppController", ["$router", AppController]);
function AppController($router) {
    $router.config([
        { path: '/', redirectTo: '/home' },
        { path: "/home", component: "home" },
        { path: "/area1", component: "area1" }
    ]);
}
