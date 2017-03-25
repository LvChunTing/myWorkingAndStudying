/**
 * Created by Administrator on 2017/3/24 0024.
 */
app.config(function($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.when('/', '/login');
    $urlRouterProvider.when('', '/login ');

    $stateProvider.state("login", {
        url: "/login",
        templateUrl: "login.html",
        controller: "myCtrl"
        })
        .state("index", {
            url: "/index/:user",
            templateUrl: "template/index.html",
            controller:"indexCtrl"
        });
})
