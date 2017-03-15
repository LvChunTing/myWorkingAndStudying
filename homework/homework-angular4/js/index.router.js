/**
 * Created by Administrator on 2017/2/14 0014.
 */
app.config(function($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.when('/', '/index')
    $urlRouterProvider.when('', '/index')

    $stateProvider.state("index", {
        url: "/index",
        views: {
            "": {
                templateUrl: "template/indexView.html",
            },
            "head@index": {
                templateUrl: "template/head.html",
                controllerUrl: "js/index.ctrl",
                controller: "headCtrl"
            },
            "left@index": {
                templateUrl: "template/left.html",
                controllerUrl: "js/index.ctrl",
                controller: "leftCtrl"
            },
            "right@index": {
                templateUrl: "template/right.html",
            },
        }
    })
        .state("index.car", {
            url: "/right/car/:rightShow/:car",
            templateUrl: "template/first.html",
            controllerUrl: "js/index.ctrl",
            controller: "rightCtrl"
        })
        .state("index.msg", {
            url: "/right/msg/:rightShow/:car",
            templateUrl: "template/second.html",
            controllerUrl: "js/index.ctrl",
            controller: "rightCtrl"
        })
        .state("index.friend", {
            url: "/right/friend/:rightShow/:car",
            templateUrl: "template/third.html",
            controllerUrl: "js/index.ctrl",
            controller: "rightCtrl"
        })
        .state("other", {
            url: "/other",
            templateUrl: "template/other.html"
        })
})
