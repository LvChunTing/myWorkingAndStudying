/**
 * Created by Administrator on 2017/3/23 0023.
 */
var app = angular.module("app", ["ui.router"]);
app.controller("parentCtrl",["$scope","$rootScope",function ($scope,$rootScope) {
    $rootScope.users = []
}])
app.controller("myCtrl",["$scope","$rootScope","$location","$state",function ($scope,$rootScope,$location,$state) {
    //用于判断是要登录还是要注册
    $scope.login=true;
    $scope.register=!$scope.login;
    //点击登录的时候应走的方法（取cookie，如果没有，提示请先注册账号，如果有，判断填写的账号是不是一致，提示账号密码错误）
    $scope.loginSave = function (loginUser) {
        $scope.sign = false;
        if ($rootScope.users.length > 0) {
            for (var i = 0; i < $rootScope.users.length; i++) {
                if ($rootScope.users[i].username == loginUser.username) {
                    if($rootScope.users[i].password == loginUser.password){
        // // 这里代表已经登录成功，要跳转，带着用户信息跳转到下一个页面；
                        alert("登录成功")
                        //增加一个登录成功的字段，如果已经登录成功了就再去判断存不存在
                        $scope.sign = true;
                        strloginUser = JSON.stringify($rootScope.users[i]);
                        $state.go("index", {user: strloginUser});
                    }else{
                        $scope.sign = true;
                        alert("密码错误！")
                        break;
                    };
                    };
            };
            if(!$scope.sign){
            alert("用户名不存在，请先注册用户");
            }
        }else{
            alert("用户名不存在，请先注册用户！");
        }
    };
    // 点击注册的时候应该走的方法
    $scope.register=function () {
        $scope.login = !$scope.login;
    }
    //点击注册完成的时候应走的方法（展示注册的表单，走完之后存cookie，要有个复选框，提示是注册管理员还是普通用户）
    $scope.registerSave=function (user) {
        //点击注册的时候要验证账号的唯一性，用户名必须唯一
        if($rootScope.users.length>0){
            for (var i=0;i<$rootScope.users.length;i++){
                if($rootScope.users[i].username==user.username){
                    alert("用户名已存在！");
                    return false;
                }
            }
            $rootScope.users.push(angular.copy(user));
            alert("注册成功！");
            $scope.login=true;
        }else{
            $rootScope.users.push(angular.copy(user));
            $scope.login=true;
            alert("注册成功！")
        }

    }

}])
app.controller("indexCtrl", ["$scope", "$rootScope", "$stateParams", "$state", function ($scope, $rootScope, $stateParams, $state) {
    $scope.User = JSON.parse($stateParams.user)
    if($scope.User.admin!=""&&$scope.User.admin!=undefined){
        $scope.admin =$scope.User.admin;
    }else{
        $scope.admin =0;
    }
    $scope.userName = $scope.User.username;
    //用于渲染商品的数据
    $scope.products = [
        {name:"铅笔",color:"红色",price:"2.00"},
        {name:"橡皮",color:"白色",price:"5.00"},
        {name:"气球",color:"绿色",price:"9.00"},
        {name:"红领巾",color:"红色",price:"18.50"},
        {name:"电视机",color:"银白",price:"8999.00"},];
    //加入切换修改的字段
    for (i=0;i<$scope.products.length;i++){
        $scope.products[i].show=true;
    };
    //点击修改的时候应该调用的方法（管理员）
    $scope.change = function ($index,$event) {
        if( $scope.products[$index].show){
            $event.target.value = "确认";
        }else{
            $event.target.value = "修改";
        }
        $scope.products[$index].show=!$scope.products[$index].show;
    };
    //点击删除的时候应该调用的方法（管理员）
    $scope.del=function ($index,$event) {
        if(confirm('确定删除'+$scope.products[$index].name+"这件商品？")){
            $scope.products.splice($index,1)
            alert('删除成功！');
        }else{
            alert('你取消了该操作!');
        }
    }
    //点击增加的时候应该调用的方法（管理员）
    //有一个添加商品的区域用来填写   在保存的时候，应该多存一个字段show
    $scope.addForm = false;
    $scope.add = function () {
        $scope.addForm = true;
    }
    $scope.addPro =function (Pro) {
        Pro.show = true;
        if($scope.products.length>0){
            for (var i=0;i<$scope.products.length;i++){
                if($scope.products[i].name==Pro.name){
                    alert("该商品已存在！");
                    return false;
                }
            }
            $scope.products.push(angular.copy(Pro));
            alert("添加成功！");
            $scope.addForm = false;
        }else{
            $scope.products.push(angular.copy(Pro));
            alert("添加成功！")
            $scope.addForm = false;

        }
    }
    $scope.addProFalse = function () {
        $scope.addForm = !$scope.addForm;
    };
//    点击退出登录的时候应该调用的方法  返回登录页面
    $scope.back=function () {
        $state.go("login")
    }
}]);