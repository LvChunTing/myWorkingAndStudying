var app = angular.module("app", ['ngFileUpload']);
app.controller("genggai", ["$scope","$element",
	function($scope,$element) {
        $scope.JSON=[{name:"张三",age:"18",sex:"男"},{name:"李四",age:"19",sex:"男"},{name:"王二麻子",age:"20",sex:"女"}]
		for (i=0;i<$scope.JSON.length;i++){
            $scope.JSON[i].show=true;
		}
        $scope.change = function ($index,$event) {
			if( $scope.JSON[$index].show){
                $event.target.value = "确认修改";
			}else{
                $event.target.value = "修改";
			}
            $scope.JSON[$index].show=!$scope.JSON[$index].show;
        };

	}
])

//定时器
app.controller("dingshiqi", ["$scope",
    function ($scope) {
        $scope.count = 10;
        //强制让angular对这个变量进行脏检查
		var a = setInterval(function () {
            $scope.$apply(function () {
                $scope.count--;
                if($scope.count==0){
                    a.clearInterval();
                }
            })
        },1000)


    }
]);
//点击正方形事件
app.controller("kuang", ["$scope","$element",
    function ($scope,$element) {
	 $scope.w = 100;
	 $scope.h = 100;
        $scope.add=function () {
            $scope.w-=0;
            $scope.h-=0;
            $scope.w += 100;
            $scope.h += 100;

        }
        var div1 = $element.children().eq(0);
        //    监视器,对变量进行监视，如果变化就进入fn中
        $scope.$watch("w",function (to,from) {
            div1.css({width:to+"px"})
        })
        $scope.$watch("h", function (to, from) {
            div1.css({height: to + "px"})
        });
        $scope.reset = function () {
            $scope.w = 100;
            $scope.h = 100;
        };

    }
]);
//angular各种方法练习
app.controller("text", ["$scope","$element","Upload",
    function ($scope,$element,Upload) {
        /**
         * 单击事件双击事件同时绑定
         */
    $scope.add="单击放大，双击缩小";
    $scope.shuangji=function ($event) {
        console.log(123)
        var size = $event.target.style.fontSize.split("px")[0]-0;
        size-=2;
        $event.target.style.fontSize=size+"px";
        $scope.flag = true;
    };
    //单击的时候要判断是单击还是双击的第一下
    $scope.flag = true;
    $scope.danji=function ($event) {
        $scope.flag=false;
        setTimeout(function () {
            if(!$scope.flag){
                var size = $event.target.style.fontSize.split("px")[0]-0;
                size+=2;
                $event.target.style.fontSize=size+"px";
            }
            $scope.flag = true
        },300)
    }
        /**
         * 失去焦点获得焦点
         */
        $scope.jiaodian="失去焦点";
        $scope.Blur=function () {
            $scope.jiaodian="失去焦点";
        }
        $scope.Focus=function () {
            $scope.jiaodian="获得焦点";
        }
        /**
         *change事件
         */
        $scope.a=0;
        $scope.Change=function () {
            $scope.a++;
        };
        /**
         * 上传文件事件（由于没有后台系统支持，所以只能写个框架空壳）
         * @type {string}
         */
        $scope.File = '';
        $scope.submit = function () {
            $scope.upload($scope.file);
            console.log($scope.File)
        };
        $scope.upload = function (file) {
            $scope.fileInfo = file;
            Upload.upload({
                //服务端接收
                url: 'Ashx/UploadFile.ashx',
                //上传的同时带的参数
                data: {'username': $scope.username},
                //上传的文件
                file: file
            }).progress(function (evt) {
                //进度条
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progess:' + progressPercentage + '%' + evt.config.file.name);
            }).success(function (data, status, headers, config) {
                //上传成功
                console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                $scope.uploadImg = data;
            }).error(function (data, status, headers, config) {
                //上传失败
                console.log('error status: ' + status);
            });
        };
        /**
         * 鼠标移入移出事件
         */
        $scope.shubiao = "";
        $scope.Mouseover=function () {
            $scope.shubiao = "鼠标移入";
        }
        $scope.Mouseout=function () {
            $scope.shubiao = "鼠标移出";
        }
        /**
         * 键盘按键监听事件
         */
        $scope.key=""
        $scope.Keydown=function () {
            $scope.key="触发keydown事件"
            console.log('触发keydown事件')
        }
        $scope.KeyPress=function () {
            $scope.key="触发KeyPress事件"
            console.log('触发KeyPress事件')
        }
        $scope.Keyup=function () {
            $scope.key="触发Keyup事件"
            console.log('触发Keyup事件')
        }
        /**
         * 复制内容事件
         */
        $scope.Copy = function () {
            console.log("复制成功！")
        };
    }]);
/**
 * 不同controller之间传递数据
 */
app.controller('SelfCtrl', function($scope) {
    $scope.me = "这是自己的数据";
    $scope.click = function () {
        $scope.$broadcast('to-child',$scope.me);
        $scope.$emit('to-parent',$scope.me);
    }
});

app.controller('ParentCtrl', function($scope) {
    $scope.$on('to-parent', function(event,data) {
        $scope.dad = data;
        console.log('ParentCtrl', data);	   //父级能得到值
        $scope.$broadcast('to-child',$scope.dad);
    });
    $scope.$on('to-child', function(event,data) {
        $scope.dad = data;
        console.log('ParentCtrl', data);	   //子级得不到值
    });

});

app.controller('ChildCtrl', function($scope){
    $scope.$on('to-child', function(event,data) {
        $scope.kid = data;
        console.log('ChildCtrl', data);		 //子级能得到值
    });
    $scope.$on('to-parent', function(event,data) {
        $scope.kid = data;
        console.log('ChildCtrl', data);		 //父级得不到值
    });
});

app.controller('BroCtrl', function($scope){
    $scope.$on('to-parent', function(event,data) {
        $scope.bro = data;
        console.log('BroCtrl', data);		  //平级得不到值
    });
    $scope.$on('to-child', function(event,data) {
        $scope.bro = data;
        console.log('BroCtrl', data);		  //平级得不到值
    });
});