/**
 * Created by Administrator on 2017/2/8 0008.
 */
var app = angular.module("app", ['ui.router']);
/**
 * controller的定义部分
 */
app.controller("router", ['$scope','$state','$stateParams',
    function ($scope,$state,$stateParams) {
    // $scope.one="true";
    $scope.first=function () {
        $state.go("/this",{
            show:"one"
        })
    }
    $scope.second=function () {
        $state.go("/this",{
            show:"two"
        })
    }
    $scope.third=function () {
        $state.go("/this",{
            show:"three"
        })
    }
        if($stateParams.show=="one"){
            $scope.one="true";
            $scope.two="";
            $scope.three="";
        }else if($stateParams.show=="two"){
            $scope.one="";
            $scope.two="true";
            $scope.three="";
        }else{
            $scope.one="";
            $scope.two="";
            $scope.three="true";
        }
}]);
/**
 * config的定义部分 配置各种路由信息
 */
app.config(function ($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider.when('/','/this/')
    $stateProvider
        .state('/this',{
            url: "/this/:show",
            templateUrl: "angular-route.html",
            views: {
                '':{
                    // templateUrl: "angular-route.html",
                    controllerUrl: 'js/myRouter',
                    controller:  "router",
                },
            }
        })
})