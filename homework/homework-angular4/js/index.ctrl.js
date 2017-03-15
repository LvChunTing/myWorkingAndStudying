/**
 * Created by Administrator on 2017/2/14 0014.
 */


/**
 * 还有一个bug未解决：购物车删除数据的时候没有做到真正的删除，只是假的删除....
 */
var app = angular.module("app", ["ui.router"]);
/**
 * 这里做一个最大父级的controller，用于列表页往购物车页传参数
 */
app.controller("ParentCtrl",["$scope","$rootScope",function ($scope,$rootScope) {
    $rootScope.strCarList=""
}])
/**
 * 对应的头部的controller,接收数据
 */
app.controller("headCtrl",["$scope","$state",
    function ($scope,$state) {
        $scope.userName = "张三";
}])
/**
 * 左边部分的controller,模拟接收数据以及点击的跳转
 */
app.controller("leftCtrl",["$scope","$state","$rootScope",
    function ($scope,$state,$rootScope) {
        $scope.items = [
            {name: "商品列表", link: "msg"},
            // {name: "朋友圈", link: "friend"},
            {name: "购物车", link: "car"}

        ];
        $scope.goLink=function (link,name) {
            $state.go("index."+link,{
                rightShow:name,
                car: $rootScope.strCarList
            })
        }
}])

/**
 *右边部分的controller，这里三个页面暂时写在一个controller里吧。
 */
app.controller("rightCtrl", ["$scope","$rootScope","$stateParams","$element",
    function ($scope,$rootScope,$stateParams,$element) {
        $scope.partName = $stateParams.rightShow;
        $rootScope.carLists = [];
        $scope.inCar=function (itme) {
            // //判断 如果购物车列表中有了这个商品 那么数量+1就可以了
            if($rootScope.carLists.length==0){
                $rootScope.carLists.push(itme)
            }else{
                var m=true;
            for(var i=0;i<$rootScope.carLists.length;i++){
                if($rootScope.carLists[i].id==itme.id){
                    m=false;
                }
            }
            if(m){
                $rootScope.carLists.push(itme);
            }else{
                for(var i=0;i<$rootScope.carLists.length;i++){
                    if($rootScope.carLists[i].id==itme.id){
                        $rootScope.carLists[i].num++;
                    }
                }
            }
                /**
                 * 去重  由于上一步  判断不是很好，会导致重复出现某一商品，所以在这去一下重
                 * @param arr
                 */
                function quchong(arr) {
                    for (i = 0; i < arr.length; i++) {
                        for (j = i + 1; j < arr.length; j++) {
                            if (arr[i].id == arr[j].id ) {
                                arr.splice(j, 1);
                                j -= 1;
                            }
                        }
                    }
                };
                // quchong($rootScope.carLists)
            }
            $rootScope.strCarList = JSON.stringify( $rootScope.carLists)
        }
        if($stateParams.car!=""){
        $rootScope.carLists=JSON.parse($stateParams.car)
        }
        //这个方法是用来在每次进行购物车的加减的时候，更新购物车列表数据，避免进行购物车数量逻辑操作之后，再返回列表页再回来，数据不正确的bug
        function nowCarList() {
            $rootScope.strCarList = JSON.stringify($rootScope.carLists)
        }
        $scope.flag = true;
        //增加一个总价的字段
        for(var i=0;i<$rootScope.carLists.length;i++){
            $rootScope.carLists[i].price -= 0;
            $rootScope.carLists[i].allPrice = $rootScope.carLists[i].num * $rootScope.carLists[i].price;
        }

        //    增加减少和删除的方法
        $scope.add = function (index) {
            $rootScope.carLists[index].num++;
            $rootScope.All(index)
            nowCarList()
        };
        $scope.conut = function (index) {
            $rootScope.carLists[index].num--;
            if( $rootScope.carLists[index].num<0){
                $rootScope.carLists[index].num=0
            }
            $rootScope.All(index)
            nowCarList()
        };
        $scope.del=function (index) {
            $rootScope.carLists.splice(index, 1);
            $rootScope.All(index)
            nowCarList()
        }
        //清空购物车
        $scope.delAll=function () {
            if(confirm("确认清空购物车？")){
                $rootScope.carLists=[];
                    if($rootScope.carLists.length==0){
                        $scope.flag = false;
                        $element.find("tbody").html("购物车空空如也!")
                    }
                nowCarList()
            }else{
                nowCarList()
            }
        }

        //每次点击增加减少删除的时候都要调用一个方法用来计算当前商品总价和全部商品总价
        $rootScope.All=function (index) {
            if($rootScope.carLists.length==0){
                $scope.flag = false;
                $element.find("tbody").html("购物车空空如也!")
                return false;
            }

        //   如果有index这个参数代表的是点击的按键(++,--,del)
            if((index>=0)&&(index<$rootScope.carLists.length)){
                $rootScope.carLists[index].allPrice = $rootScope.carLists[index].num * $rootScope.carLists[index].price;
            }
                var AllNum = 0;
                var AllPrice = 0
                //    遍历物品列表中的所有数据，做汇总计算
                for (var i=0;i<$rootScope.carLists.length;i++){
                    $rootScope.carLists[i].num -= 0;
                    AllNum+=$rootScope.carLists[i].num;
                    AllPrice+=$rootScope.carLists[i].allPrice;
                }
                //    单独独立出来一个obj 作为汇总字段
            $rootScope.all={
                    AllNum:AllNum,
                    AllPrice:AllPrice
                }

        }
        $rootScope.All()
    }]);
/**
 *右边部分的自定义指令
 */
app.directive("proleft",function () {
    return{
        restrict:"E",
        templateUrl:"template/proLeft.html",
        link:function (scope,element) {
            scope.leftItems = [{
                id:"1",
                name: "商品1",
                img: "img/pro1.jpg",
                msg:"商品详情1商品详情1商品详情1",
                price:111,
                num:1
            },{
                id:"2",
                name: "商品2",
                img: "img/pro2.jpg",
                msg:"商品详情2商品详情2商品详情2",
                price:222,
                num:1

            },{
                id:"3",
                name: "商品3",
                img: "img/pro3.jpg",
                msg:"商品详情3商品详情3商品详情3",
                price:333,
                num:1

            },{
                id:"4",
                name: "商品4",
                img: "img/pro4.jpg",
                msg:"商品详情4商品详情4商品详情4",
                price:444,
                num:1

            },{
                id:"5",
                name: "商品5",
                img: "img/pro5.jpg",
                msg:"商品详情5商品详情5商品详情5",
                price:555,
                num:1

            },{
                id:"6",
                name: "商品6",
                img: "img/pro6.jpg",
                msg:"商品详情6商品详情6商品详情6",
                price:666,
                num:1

            },{
                id:"7",
                name: "商品7",
                img: "img/pro7.jpg",
                msg:"商品详情7商品详情7商品详情7",
                price:777,
                num:1

            },{
                id:"8",
                name: "商品8",
                img: "img/pro8.jpg",
                msg:"商品详情8商品详情8商品详情8",
                price:888,
                num:1

            },{
                id:"9",
                name: "商品9",
                img: "img/pro9.jpg",
                msg:"商品详情9商品详情9商品详情9",
                price:999,
                num:1
            },{
                id:"10",
                name: "商品10",
                img: "img/pro10.jpg",
                msg:"商品详情10商品详情10商品详情10",
                price:1000,
                num:1
            }];
        }
    }
}).directive("proright",function () {
    return{
        restrict:"E",
        templateUrl:"template/proRight.html",
        scope:true,
        transclude:true
    }
}).directive("tuijian",function () {
    return {
        link:function(scope,element){
            scope.rightItems=[{
                id:"11",
                name: "商品11",
                img: "img/pro11.jpg",
                msg:"商品详情11商品详情11商品详情11",
                price:11,
                num:1
            },{
                id:"12",
                name: "商品12",
                img: "img/pro12.jpg",
                msg:"商品详情12商品详情12商品详情12",
                price:12,
                num:1
            },{
                id:"13",
                name: "商品13",
                img: "img/pro13.jpg",
                msg:"商品详情13商品详情13商品详情13",
                price:13,
                num:1
            }];
        }
    }
}).directive("tuxue",function(){
    return {
        link:function(scope,element){
            scope.rightItems=[{
                id:"14",
                name: "商品14",
                img: "img/pro14.jpg",
                msg:"商品详情14商品详情14商品详情14",
                price:14,
                num:1
            },{
                id:"15",
                name: "商品15",
                img: "img/pro15.jpg",
                msg:"商品详情15商品详情15商品详情15",
                price:15,
                num:1
            },{
                id:"16",
                name: "商品16",
                img: "img/pro16.jpg",
                msg:"商品详情16商品详情16商品详情16",
                price:16,
                num:1
            }];
        }
    }
});
