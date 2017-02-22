/**
 * Created by Administrator on 2017/2/14 0014.
 */
var app = angular.module("app", ["ui.router"]);
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
app.controller("leftCtrl",["$scope","$state",
    function ($scope,$state) {
        $scope.items = [
            {name: "购物车", link: "car"},
            {name: "个人信息", link: "msg"},
            {name: "朋友圈", link: "friend"}
        ];
        $scope.goLink=function (link,name) {
            $state.go("index."+link,{
                rightShow:name
            })
        }
}])
/**
 *右边部分的controller，这里三个页面暂时写在一个controller里吧。
 */
app.controller("rightCtrl", ["$scope","$stateParams","$element",
    function ($scope,$stateParams,$element) {
        $scope.partName = $stateParams.rightShow;
        $scope.carLists = [{
            name: "笔记本",
            num: "10",
            price:"1"
        },{
            name:"圆珠笔",
            num:"50",
            price:"1"
        },{
            name:"钢笔",
            num:"20",
            price:"1"
        }];
        $scope.flag = true;
        //增加一个总价的字段
        for(var i=0;i<$scope.carLists.length;i++){
            $scope.carLists[i].price -= 0;
            $scope.carLists[i].allPrice = $scope.carLists[i].num * $scope.carLists[i].price;
        }
        console.log($scope.carLists)

        //    增加减少和删除的方法
        $scope.add = function (index) {
            $scope.carLists[index].num++;
            $scope.All(index)
        };
        $scope.conut = function (index) {
            $scope.carLists[index].num--;
            if( $scope.carLists[index].num<0){
                $scope.carLists[index].num=0
            }
            $scope.All(index)
        };
        $scope.del=function (index) {
            $scope.carLists.splice(index, 1);
            $scope.All(index)
        }
        //清空购物车
        $scope.delAll=function () {
            if(confirm("确认清空购物车？")){
                $scope.carLists=[];
                    if($scope.carLists.length==0){
                        $scope.flag = false;
                        $element.find("tbody").html("购物车已清空!")
                    }
            }else{

            }
        }

        //每次点击增加减少删除的时候都要调用一个方法用来计算当前商品总价和全部商品总价
        $scope.All=function (index) {
            if($scope.carLists.length==0){
                $scope.flag = false;
                $element.find("tbody").html("购物车已清空!")
                return false;
            }
            console.log($scope.carLists[index])

        //   如果有index这个参数代表的是点击的按键(++,--,del)
            if((index>=0)&&(index<$scope.carLists.length)){
                $scope.carLists[index].allPrice = $scope.carLists[index].num * $scope.carLists[index].price;
            }
                var AllNum = 0;
                var AllPrice = 0
                //    遍历物品列表中的所有数据，做汇总计算
                for (var i=0;i<$scope.carLists.length;i++){
                    $scope.carLists[i].num -= 0;
                    AllNum+=$scope.carLists[i].num;
                    AllPrice+=$scope.carLists[i].allPrice;
                }
                //    单独独立出来一个obj 作为汇总字段
                $scope.all={
                    AllNum:AllNum,
                    AllPrice:AllPrice
                }

        }
        $scope.All()
    }]);