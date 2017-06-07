$(function() {
    /**
     * 根据屏幕分辨率初始化
     */
    var screenWidth = document.body.offsetWidth;

    /**
     * 初始化页面中的轮播
     */
    var mainBanner = new Swiper('.index-banner-swiper .swiper-container', {
        pagination: '.index-banner-swiper .pagination',
        paginationClickable: true,
        loop: true,
    });




    var bannerSlider = $(".js_banner").oSlider({
        loop: true,
        speed: 5000,
        pager: ".js_pager"
    });
    bannerSlider.init(); //开始轮播

    var bannerSlider = new Swiper('.js_banner .swiper-container', {
        pagination: '.js_banner .pagination',
        paginationClickable: true,
        calculateHeight : true,
        loop: true,
    });

    // var activitySwiper = $(".js-activity-swiper").oSlider({
    // loop: true,
    // });
    // activitySwiper.init();

    var activitySwiper = new Swiper('.js-activity-swiper .swiper-container', {
        paginationClickable: true,
        loop: true,
        onInit: function(swiper) {
            $('.js-activity-swiper .index-swiper-prev').click(function() {
                activitySwiper.swipePrev();
            });

            $('.js-activity-swiper .index-swiper-next').click(function() {
                activitySwiper.swipeNext();
            });
        }
    });


    // var rightSwiper = $(".js-right-swiper").oSlider({
    //     pager: ".js-right-pager"
    // });
    // rightSwiper.init(); //开始轮播

    init();

    var rightBanner = new Swiper('.js-right-swiper .swiper-container', {
        // pagination: '.js-right-swiper .pagination',
        paginationClickable: true,
        loop: true,
        onInit: function() {
            $('.index-right  .banner img').oBgCover().init();

            $(' .js-right-swiper  .index-swiper-prev').click(function() {
                rightBanner.swipePrev();
            });

            $('.js-right-swiper    .index-swiper-next').click(function() {
                rightBanner.swipeNext();
            });
        },
        onSlideChangeEnd: function(swiper){
            rightShow();
        }

    });

    // var exchangeBanner = new Swiper('.js_exchangeDynamics .swiper-container', {
    //     // pagination: '.js_exchangeDynamics .pagination',
    //     paginationClickable: true,
    //     loop: true,
    //     onInit: function() {
    //         $('.index-right  .banner img').oBgCover().init();
    //
    //         $(' .js_exchangeDynamics  .index-swiper-prev').click(function() {
    //             exchangeBanner.swipePrev();
    //         });
    //
    //         $('.js_exchangeDynamics    .index-swiper-next').click(function() {
    //             exchangeBanner.swipeNext();
    //         });
    //     }
    // });
    $(window).resize(function() {
        init();
    });

    function init() {
        var screenWidth = document.body.offsetWidth;

        $('.js-o-scale').each(function() {
            $(this).oScale().init();
        });

        $('.js-popular-herl').oHrel().init();
        $('.js-activity-product-hrel').oHrel().init();

        $('.js_bg').oBgCover().init();

        if (screenWidth <= 767) {
            slidesPerView = 3;
        } else if (screenWidth > 767 && screenWidth <= 991) {
            slidesPerView = 4;
        } else if (screenWidth > 991 && screenWidth <= 1199) {
            slidesPerView = 6;
        } else if (screenWidth > 1199) {
            slidesPerView = 6;
        }
        // $(".index-side-navigation").hide();
        //     $(window).scroll(function () {
        //         if(screenWidth>1199){
        //             var scroll = $("body").scrollTop();
        //         if (scroll >= 750) {
        //             $(".index-side-navigation").show();
        //         } else {
        //             $(".index-side-navigation").hide();
        //         }
        //         }else{
        //             $(".index-side-navigation").hide();
        //         }
        //     });

        var exchangeDynamics = new Swiper('.js_exchangeDynamics .swiper-container', {
            slidesPerView: slidesPerView,
            loop: true,
            calculateHeight: true,
            onInit: function(swiper) {
                swiper.swipeNext();
                //兑换动态处轮播图左右按钮激活方法
                $('.index-exchange-dynamics .index-swiper-prev').click(function() {
                    exchangeDynamics.swipePrev();
                });
                $('.index-exchange-dynamics .index-swiper-next').click(function() {
                    exchangeDynamics.swipeNext();
                });
            }
        });
        // 限时限量兑换-商品块
        $('.js-o-center').each(function() {
            $(this).verticalCentering().init();
        });

        // $('.index-right .banner img').oBgCover().init();

    }

    /**
     * 关闭通知栏
     */
    $('.js-notice-close').on('click', function() {
        $('.index-bottom-notice').remove();
    });

    /**
     * tab切换
     */
    $('.js-tab a').on('click', function() {
        $(this).addClass('active').siblings().removeClass('active');
        $('.' + $(this).attr('tab')).show().siblings().hide();

        $('.index-right .banner img').oBgCover().init();
        $('.' + $(this).attr('tab')).find('.js-o-center').verticalCentering().init();
        $('.' + $(this).attr('tab')).show().siblings().hide();
        var proShow = $(this).attr('tab');
        $('.'+proShow+ '-rightPro').show().siblings(".index-right-product").hide();
        init();
    });

    setTimeout(function(){
        $(".o_picture").each(function(){
            $(this).oPicture({
                //自定义节点宽度
                //sm:544,md:700,lg:992,xl:1200,
            }).init();
        });
    },1000);

    /**
     * 底部兑换动态请求服务
     */
        // var param = {
        //     scoreBrand: 2
        // };
        // $.ajax({
        //     type: "post",
        //     dataType: "json",
        //     asyn: false,
        //     url: siteConfig.domain +"/sku/user/findPayDynamic",
        //     data:param,
        //     success: function(returnData) {
        //         if(returnData.isSuccess&&returnData.data&&returnData.data.length>=8){
        //         //    如果返回成功，而且有返回值  那么渲染页面
        //         var html= ""
        //         for(var i = 0;i<returnData.data.length;i++){
        //         html +=' <div class="swiper-slide">'+
        //                       '<a href="'+returnData.data[i].newUrl2 +'" target="_blank">'+
        //                         '<div class="index-exchange-image">'+
        //                                 '<img src="'+siteConfig.domain+ '/'+ returnData.data[i].picUrl2 + '"alt="">'+
        //                         '</div>'+
        //                         '<div class="index-exchange-message">'+
        //                             '<span class="index-exchange-name">'+ returnData.data[i].userNickName +'</span><span>刚刚兑换了</span><span class="index-exchange-product">'+returnData.data[i].goodsName+'</span>'+
        //                         '</div>'+
        //                       '</a>'+
        //                 '</div>'
        //     }
        //         $(".js_exchangeDynamics .swiper-wrapper").html(html);
        //             if (screenWidth <= 767) {
        //                 slidesPerView = 3;
        //             } else if (screenWidth > 767 && screenWidth <= 991) {
        //                 slidesPerView = 4;
        //             } else if (screenWidth > 991 && screenWidth <= 1199) {
        //                 slidesPerView = 6;
        //             } else if (screenWidth > 1199) {
        //                 slidesPerView = 6;
        //             }
        //             var exchangeDynamics = new Swiper('.index-exchange-dynamics .swiper-container', {
        //                 slidesPerView: slidesPerView,
        //                 loop: true,
        //                 calculateHeight: true,
        //                 onInit: function(swiper) {
        //                     swiper.swipeNext();
        //                     //兑换动态处轮播图左右按钮激活方法
        //                     $('.index-exchange-dynamics .index-swiper-prev').click(function() {
        //                         exchangeDynamics.swipePrev();
        //                     });
        //                     $('.index-exchange-dynamics .index-swiper-next').click(function() {
        //                         exchangeDynamics.swipeNext();
        //                     });
        //                 },
        //             });
        //
        //     }else{
        //             var  paramS={
        //                 searchword: "",
        //                 tablename: "v_product_all", //被检索的表明
        //                 protype: "", //根据分类可以筛选出对应产品列表页中的数据
        //                 productBrand: "", //前台品牌字段筛选
        //                 lowprice: "", //前台筛选积分的最小值
        //                 highprice: "", //前台筛选积分的最大值
        //                 orderby: "+DOCPUBTIME", //排序字段，多个字段用,分开，升降序用“+”，“-”区分
        //                 currentPage: 1, //当前页码
        //                 pageSize:8, //分页个数
        //                 source: "", //默认是pc筛选，source=m时说明是移动端筛选
        //                 siteId: 14, //积分品牌ID，海贝商城-16，卡萨帝商城-14
        //                 customized: "", //定制权益类型检索，1-高级定制，2-产品定制，3-城市定制，4-服务定制，5-普通定制
        //                 citycode: "" //城市编码
        //             }
        //         //    如果没有，要取列表前6个  过来凑一下（按发布时间）
        //             $.ajax({
        //                 type: "post",
        //                 dataType: "json",
        //                 asyn: false,
        //                 url: siteConfig.domain + "/search/product/searchProduct",
        //                 data: paramS,
        //                 success: function (returnData) {
        //                     if(returnData.isSuccess){
        //                         var html= ""
        //                         for(var i = 0;i<returnData.data.returnList.length;i++){
        //                             html +=' <div class="swiper-slide">'+
        //                                 '<div class="index-exchange-image">'+
        //                                 '  <a href="'+returnData.data.returnList[i].docpubUrl +'" target="_blank"><img src="'+ returnData.data.returnList[i].proPicUrl + '"alt=""></a>'+
        //                                 '</div>'+
        //                                 '<div class="index-exchange-message">'+
        //                                 '<span class="index-exchange-product">'+returnData.data.returnList[i].productName+'</span>'+
        //                                 '</div>'+
        //                                 '</div>'
        //                         }
        //                         $(".js_exchangeDynamics .swiper-wrapper").html(html);
        //                         if (screenWidth <= 767) {
        //                             slidesPerView = 3;
        //                         } else if (screenWidth > 767 && screenWidth <= 991) {
        //                             slidesPerView = 4;
        //                         } else if (screenWidth > 991 && screenWidth <= 1199) {
        //                             slidesPerView = 6;
        //                         } else if (screenWidth > 1199) {
        //                             slidesPerView = 6;
        //                         }
        //                         var exchangeDynamics = new Swiper('.index-exchange-dynamics .swiper-container', {
        //                             slidesPerView: slidesPerView,
        //                             loop: true,
        //                             calculateHeight: true,
        //                             onInit: function(swiper) {
        //                                 swiper.swipeNext();
        //                                 //兑换动态处轮播图左右按钮激活方法
        //                                 $('.index-exchange-dynamics .index-swiper-prev').click(function() {
        //                                     exchangeDynamics.swipePrev();
        //                                 });
        //                                 $('.index-exchange-dynamics .index-swiper-next').click(function() {
        //                                     exchangeDynamics.swipeNext();
        //                                 });
        //                             },
        //                         });
        //                     }
        //                 }
        //             })
        //         }
        //
        //         init();
        //         $(window).resize(function() {
        //             init();
        //         });
        //     }
        //
        // });
    var  paramS={
            searchword: "",
            tablename: "v_product_all", //被检索的表明
            protype: "", //根据分类可以筛选出对应产品列表页中的数据
            productBrand: "", //前台品牌字段筛选
            lowprice: "", //前台筛选积分的最小值
            highprice: "", //前台筛选积分的最大值
            orderby: "+DOCPUBTIME", //排序字段，多个字段用,分开，升降序用“+”，“-”区分
            currentPage: 1, //当前页码
            pageSize:8, //分页个数
            source: "", //默认是pc筛选，source=m时说明是移动端筛选
            siteId: 14, //积分品牌ID，海贝商城-16，卡萨帝商城-14
            customized: "1", //定制权益类型检索，1-高级定制，2-产品定制，3-城市定制，4-服务定制，5-普通定制
            citycode: "" //城市编码
        }
    //    如果没有，要取列表前6个  过来凑一下（按发布时间）
    $.ajax({
        type: "post",
        dataType: "json",
        asyn: false,
        url: siteConfig.domain + "/search/product/searchProduct",
        data: paramS,
        success: function (returnData) {
            if(returnData.isSuccess){
                var html= ""
                for(var i = 0;i<returnData.data.returnList.length;i++){
                    html +=' <div class="swiper-slide">'+
                        '<div class="index-exchange-image">'+
                        '  <a href="'+returnData.data.returnList[i].docpubUrl +'" target="_blank"><img src="'+ returnData.data.returnList[i].proPicUrl + '"alt=""></a>'+
                        '</div>'+
                        '<div class="index-exchange-message">'+
                        '<span class="index-exchange-product">'+returnData.data.returnList[i].productName+'</span>'+
                        '</div>'+
                        '</div>'
                }
                $(".js_exchangeDynamics .swiper-wrapper").html(html);
                init();

                // if (screenWidth <= 767) {
                //     slidesPerView = 3;
                // } else if (screenWidth > 767 && screenWidth <= 991) {
                //     slidesPerView = 4;
                // } else if (screenWidth > 991 && screenWidth <= 1199) {
                //     slidesPerView = 6;
                // } else if (screenWidth > 1199) {
                //     slidesPerView = 6;
                // }
                // var exchangeDynamics = new Swiper('.js_exchangeDynamics .swiper-container', {
                //     slidesPerView: slidesPerView,
                //     loop: true,
                //     calculateHeight: true,
                //     onInit: function(swiper) {
                //         swiper.swipeNext();
                //         //兑换动态处轮播图左右按钮激活方法
                //         $('.index-exchange-dynamics .index-swiper-prev').click(function() {
                //             exchangeDynamics.swipePrev();
                //         });
                //         $('.index-exchange-dynamics .index-swiper-next').click(function() {
                //             exchangeDynamics.swipeNext();
                //         });
                //     },
                // });
            }
        }
    })
    init();
    $(window).resize(function() {
        init();
    });
    /**
     * 单独提出一个方法用于判断当前展示的哪个权益
     */
    function rightShow() {
        var nowRight = $(".js-right-swiper").find(".swiper-slide-active").attr("tab").split("-swiper")[0];
        $('.' + nowRight + '-rightPro').show().siblings(".index-right-product").hide();
        init();
    }

    /**
     * 权益商品 取到url地址，判断产线或者城市
     */
    nameCode();
    function nameCode() {
        for(var i = 0;i<$(".js-tab-product-rightPro").children("div").length;i++){
            var oldUrl = $(".js-tab-product-rightPro").children("div").eq(i).find("a").attr("href");
            var gname = oldUrl.split("cityName=")[1];
            for(var j =0;j<gnameCode.length;j++){
                if(gname = gnameCode[j].GNAME){
                    var newUrl = oldUrl + "&cityCode=" + gnameCode[j].CODE;
                    $(".js-tab-product-rightPro").children("div").eq(i).find("a").attr({"href":newUrl});
                }
            }
        }
        for(var i = 0;i<$(".js-tab-city-rightPro").children("div").length;i++){
            var oldUrl = $(".js-tab-city-rightPro").children("div").eq(i).find("a").attr("href");
            var gname = oldUrl.split("cityName=")[1];
            for(var j =0;j<cityCode.length;j++){
                if(gname = cityCode[j].city){
                    var newUrl = oldUrl + "&cityCode=" + cityCode[j].code;
                    $(".js-tab-city-rightPro").children("div").eq(i).find("a").attr({"href":newUrl});
                }
            }
        }
    }
//    一个方法用于公告小喇叭的显示和隐藏
    isHeadlines();
    function isHeadlines() {
        var flag = $(".index-headlines").find("a").html();
        var flagB = $(".index-bottom-notice .c-spacing").find("a h6").html();
        if(flag==""||flag==undefined){
            $(".index-headlines").css({"display": "none"});
        }else{
            $(".index-headlines").css({"display": "inline-block"});
        }
        if(isMoblie()){
            if(flagB==""||flagB==undefined){
                $(".index-bottom-notice").css({"display": "none"});
            }else{
                $(".index-bottom-notice").css({"display": "block"});
            }
        }else{
            $(".index-bottom-notice").css({"display": "none"});
        }

        function isMoblie() {
            var screenWidth = document.body.offsetWidth;
            if (screenWidth <= 991) {
                //    当前情况下表示是手机端
                return true;
            } else {
                //    当前情况下表示是PC端
                return false;
            }
        }
    }

});