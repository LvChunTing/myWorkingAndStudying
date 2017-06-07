jQuery.ajaxSetup({
    type: "post",
    dataType: "json",
    cache: false,
    box_obj: null,
    scroll: null,
    beforeSend: function() {},
    success: function(data) {
        if (data.isSuccess != undefined) {
            if (data.isSuccess) {
                if (this.success_cb) {
                    this.success_cb(data);
                }
            } else {

                /**
                 * ids未登录错误转为用户未登录
                 */
                if (this.url.indexOf('showSku') < 0 && this.url.indexOf('getSeckillSuccess') < 0 && this.url.indexOf('payOrder') < 0) {
                    data.resultMsg = data.resultMsg.replace("ids", "用户");
                    alert(data.resultMsg); //增加各个服务统一的提示
                }

                /**
                 * 获取用户是否有秒杀资格不作提示
                 */
                if (this.url.indexOf('getSeckillSuccess') > 0) {
                    if (this.success_cb) {
                        this.success_cb(data);
                    }
                }
            }
        }
    },
    error: function(jqXHR, textStatus, errorThrown) {}
});

var seckillInfo = {}; //秒杀信息

/**
 * 营销活动
 */
var activity = {
    /**
     * 加载活动sku信息（买家）
     */
    showSku: function(productId, skuId) {
        var url = devUrl + "/activity/common/showSku";
        var params = {
            productId: productId,
            skuId: skuId
        };
        $.ajax({
            url: url,
            data: params,
            success_cb: function(data) {
                /**
                 * 显示sku库存和标记skuId
                 */
                $('#js-stock').html(data.data.sku[0].stock).parent().show();
                if (data.data.sku[0].stock > 0) {
                    $('#js-preSaveOrder').attr('skuId', skuId);
                }
            }
        });
    },
    /**
     * 获取剩余秒杀库存总数
     */
    loadStock: function(activityGoodsId) {
        var url = devUrl + "/activity/user/seckill/loadStock";
        var params = {
            activityGoodsId: activityGoodsId,
        };
        $.ajax({
            url: url,
            data: params,
            success_cb: function(data) {
                /**
                 * 回显秒杀库存
                 */
                $('#js-stock').html(data.data.stock).parent().show();
                if (data.data.stock > 0) {
                    $('#js-preSaveOrder').html("点击秒杀").removeClass('disable');
                } else {
                    $('#js-preSaveOrder').addClass('disable').off();
                }

                return data;
            }
        });
    },

    /**
     * 暴露秒杀地址
     */
    exposer: function(activityGoodsId) {
        var url = devUrl + "/activity/user/seckill/exposer";
        var params = {
            activityGoodsId: activityGoodsId,
        };
        $.ajax({
            url: url,
            data: params,
            success_cb: function(data) {
                seckillInfo = data.data;
                /**
                 * 获取秒杀成功记录
                 * 如果用户已有秒杀资格直接跳转确认订单页面
                 * 否则正常秒杀流程
                 */
                var url = devUrl + "/activity/user/seckill/getSeckillSuccess";
                var params = {
                    seckillId: data.data.seckillId,
                };
                $.ajax({
                    url: url,
                    data: params,
                    success_cb: function(data) {
                        if (data.data) {
                            if (data.data.seckilledStatus == 0) {
                                $('#js-preSaveOrder').html("开始秒杀");
                                $('#js-captcha').after("<img src='data:image/png;base64," + seckillInfo.base64Captcha + "'/>");
                                seckillInfo.seckillId = data.data.seckillId;
                                seckillInfo.seckilledId = data.data.seckilledId;
                                $('#js-preSaveOrder').removeClass('disable');
                                $('#js-seckill').off().on('click', function() {
                                    window.location.href = formSureUrl +
                                        "?productId=" + productId +
                                        "&skuId=" + $('#js-preSaveOrder').attr('skuid') +
                                        "&buyNum=" + $('#js-buyNum').val() +
                                        "&activityGoodsId=" + $('#js-preSaveOrder').attr('activitygoodsid') +
                                        "&activitySkuId=" + $('#js-preSaveOrder').attr('activityskuid') +
                                        "&activityType=" + $('#js-preSaveOrder').attr('activitytype') +
                                        "&seckilledId=" + data.data.seckilledId +
                                        "&payType=" + $('#js-preSaveOrder').attr('payType');
                                });
                            } else {
                                $('#js-preSaveOrder').html("已秒杀");
                            }
                        } else {
                            if (seckillInfo.exposed) { //开始秒杀
                                $('#js-preSaveOrder').html("开始秒杀");
                                $('#js-captcha').after("<img src='data:image/png;base64," + seckillInfo.base64Captcha + "'/>");

                                $('#js-seckill').off().on('click', function() {
                                    activity.seckill(productId);
                                });
                            } else { //秒杀未开始
                                if (seckillInfo.now < seckillInfo.start) {
                                    $('#js-preSaveOrder').html("未开始");
                                } else if (seckillInfo.now > seckillInfo.end) {
                                    $('#js-preSaveOrder').html("已结束");
                                }
                            }
                        }
                    }
                });
            }
        });
    },

    /**
     * 取得秒杀资格后异步加载sku库存
     */
    commonLoadStock: function(saveSku, productId) {
        var url = devUrl + "/activity/common/loadStock";
        var params = {
            activitySkuId: saveSku.activitySkuId,
        };
        $.ajax({
            url: url,
            data: params,
            success_cb: function(data) {
                /**
                 * 有活动库存则标记相关信息
                 */
                $('#js-stock').html(data.data.sku[0].availableStock).parent().show();
                if (data.data.sku[0].availableStock > 0 && !$('#js-preSaveOrder').hasClass('disable')) {
                    $('#js-preSaveOrder').attr('skuId', saveSku.skuId);
                    $('#js-preSaveOrder').attr('activityGoodsId', saveSku.activityGoodsId);
                    $('#js-preSaveOrder').attr('activitySkuId', saveSku.activitySkuId);
                    $('#js-preSaveOrder').attr('activityType', saveSku.activityType);

                    /**
                     * 跳转下订单页面
                     */
                    $('#js-preSaveOrder').off().on('click', function() {
                        var flag = $("#limitWarn").val();
                        if(flag!=""){
                            $(".js-proDialog").show();
                            $(".js-dialog-message").text($("#limitWarn").val());
                        }else{
                            $(".js-proDialog").hide();
                            /**
                             * 判断买家是否已选择商品规格，若未选择，弹框提示
                             */
                            if ($("#js-propertys .x-proDelparaLi").length != $("#js-propertys .x-paralistlive").length) {
                                alert('请选择商品规格');
                            } else {
                                if ($(".js_s_beginSecKill").text() == "开始秒杀") {
                                    $(".js_s_checkCode input").val("");
                                    $(".js_s_checkCode").show();
                                }
                            }
                        }

                        $(".js_giveUp").click(function () {
                            //window.close();
                            location.href = "../";
                        });
                        $(".js_goOn").click(function () {
                            $(".js-proDialog").hide();
                            /**
                             * 判断买家是否已选择商品规格，若未选择，弹框提示
                             */
                            if ($("#js-propertys .x-proDelparaLi").length != $("#js-propertys .x-paralistlive").length) {
                                alert('请选择商品规格');
                            } else {
                                if ($(".js_s_beginSecKill").text() == "开始秒杀") {
                                    $(".js_s_checkCode input").val("");
                                    $(".js_s_checkCode").show();
                                }
                            }
                        })

                    });
                } else {
                    $('#js-preSaveOrder').addClass('disable').off(); //无库存则解绑事件
                }
            }
        });
    },

    /**
     * 执行秒杀
     */
    seckill: function(productId) {
        var url = devUrl + "/activity/user/seckill/execute/" + seckillInfo.md5;
        var params = {
            seckillId: seckillInfo.seckillId,
            captcha: $('#js-captcha').val() //验证码
        };
        $.ajax({
            url: url,
            data: params,
            success_cb: function(data) {
                if (data.isSuccess) {
                    if (data.data.status == 1) {
                        window.location.href = formSureUrl +
                            "?productId=" + productId +
                            "&skuId=" + $('#js-preSaveOrder').attr('skuid') +
                            "&buyNum=" + $('#js-buyNum').val() +
                            "&activityGoodsId=" + $('#js-preSaveOrder').attr('activitygoodsid') +
                            "&activitySkuId=" + $('#js-preSaveOrder').attr('activityskuid') +
                            "&activityType=" + $('#js-preSaveOrder').attr('activitytype') +
                            "&seckilledId=" + data.data.seckilled.seckilledId +
                            "&payType=" + $('#js-preSaveOrder').attr('payType');
                    } else {
                        $(".js_s_checkCode").hide();
                        alert(data.data.statusDesc);
                    }
                } else {
                    alert(data.resultMsg);
                }
            }
        });
    }
};

var sku = {
    /**
     * 加载当前sku信息（买家）
     */
    show: function(productId) {
        var url = devUrl + "/sku/user/show";
        var params = {
            productId: productId
        };
        $.ajax({
            url: url,
            data: params,
            success_cb: function(data) {

                var allSkuId = '';

                for (i = 0; i < data.data.sku.length; i++) {
                    allSkuId += data.data.sku[i].skuId;
                    if (i < data.data.sku.length - 1) {
                        allSkuId += ',';
                    }
                }

                /**
                 * 大小家电维护库存
                 */
                if (data.data.skuStockMgr == 2 || data.data.skuStockMgr == 4) {
                    $(".js_s_isShowSend").show();
                } else {
                    $(".js_s_isShowSend").hide();
                }

                /**
                 * 遍历规格
                 */
                var propertys = data.data.propertys;
                var skuInfo = data.data.sku;
                var activityType = "";
                var propertysHtml = "";
                for (var i = 0; i < propertys.length; i++) {
                    propertysHtml += '<div class="x-proDelparaLi">' +
                        '<label>' + propertys[i].typeName + ':</label>' +
                        '<span>';
                    for (var j = 0; j < propertys[i].list.length; j++) {
                        propertysHtml += '<p class="x-proDelparalist" skuValue="' + propertys[i].list[j].typeId + ':' + propertys[i].list[j].no + '">' + propertys[i].list[j].valueName + '</p>';
                    }
                    propertysHtml += '</span></div>';
                }

                $('#js-propertys').html(propertysHtml);

                /**
                 * 查询活动信息
                 */
                var url = devUrl + "/activity/common/showSku";
                var params = {
                    productId: productId,
                };
                $.ajax({
                    url: url,
                    data: params,
                    success_cb: function(activeData) {
                        if (activeData.data) {
                            skuInfo = jQuery.extend(true, skuInfo, activeData.data.sku);
                            activityType = activeData.data.activityType;
                            if (activeData.data.activityType == 2) { //activityType 1：普通 2:秒杀

                                var allActivitySkuId = '';
                                for (i = 0; i < skuInfo.length; i++) {
                                    allActivitySkuId += skuInfo[i].activitySkuId;
                                    if (i < skuInfo.length - 1) {
                                        allActivitySkuId += ',';
                                    }
                                }

                                /**
                                 * 查询秒杀库存 确认秒杀资格
                                 */
                                var url = devUrl + "/activity/user/seckill/loadStock";
                                var params = {
                                    activityGoodsId: activeData.data.activityGoodsId,
                                };

                                $.ajax({
                                    url: url,
                                    data: params,
                                    success_cb: function(data) {
                                        /**
                                         * 回显秒杀库存
                                         * 如果没有秒杀库存则秒杀按钮灰色
                                         * 如果用户有秒杀资格则蓝色允许正常下单
                                         */
                                        $('#js-stock').html(data.data.stock).parent().show();
                                        if (data.data.stock > 0) {
                                            $('#js-preSaveOrder').html("点击秒杀").removeClass('disable');
                                        } else {
                                            $('#js-preSaveOrder').addClass('disable').off();
                                        }

                                        var activityInfo = data;

                                        /**
                                         * 查活动库存
                                         * 2、4大小家电
                                         */
                                        if (data.data.skuStockMgr == 2 || data.data.skuStockMgr == 4) {
                                            if (activityInfo && activityInfo.isSuccess) {
                                                activity.exposer(activeData.data.activityGoodsId);
                                                var url = devUrl + "/activity/common/loadStock";
                                                var params = {
                                                    activitySkuId: allActivitySkuId,
                                                };
                                                $.ajax({
                                                    url: url,
                                                    data: params,
                                                    success_cb: function(data) {
                                                        for (var i = 0; i < data.data.sku.length; i++) {
                                                            if (data.data.sku[i].skuId == skuInfo[i].skuId) {
                                                                skuInfo[i].stock = data.data.sku[i].availableStock;
                                                            }
                                                        }
                                                    }
                                                });
                                            }
                                        } else {
                                            if (activityInfo && activityInfo.isSuccess) {
                                                activity.exposer(activeData.data.activityGoodsId);
                                                var url = devUrl + "/activity/common/loadStock";
                                                var params = {
                                                    activitySkuId: allActivitySkuId,
                                                };
                                                $.ajax({
                                                    url: url,
                                                    data: params,
                                                    success_cb: function(data) {
                                                        for (var i = 0; i < data.data.sku.length; i++) {
                                                            if (data.data.sku[i].skuId == skuInfo[i].skuId) {
                                                                skuInfo[i].stock = data.data.sku[i].availableStock;
                                                            }
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    }
                                });
                            } else {
                                /**
                                 * 加载所有sku库存--普通活动
                                 */
                                var url = devUrl + "/sku/user/loadStock";
                                var params = {
                                    productId: productId,
                                    skuId: allSkuId
                                };
                                $.ajax({
                                    url: url,
                                    data: params,
                                    success_cb: function(data) {
                                        // console.log(data);
                                        for (var i = 0; i < data.data.sku.length; i++) {
                                            if (data.data.sku[i].skuId == skuInfo[i].skuId) {
                                                skuInfo[i].stock = data.data.sku[i].stock;
                                            }
                                        }
                                    }
                                });
                            }
                        } else {
                            /**
                             * 加载所有sku库存--非活动
                             */
                                // var allActivitySkuId = '';
                                // for (i = 0; i < skuInfo.length; i++) {
                                //     allSkuId += skuInfo[i].skuId;
                                //     if (i < skuInfo.length - 1) {
                                //         allSkuId += ',';
                                //     }
                                // }
                            var url = devUrl + "/sku/user/loadStock";
                            var params = {
                                productId: productId,
                                skuId: allSkuId
                            };
                            $.ajax({
                                url: url,
                                data: params,
                                success_cb: function(data) {
                                    for (var i = 0; i < data.data.sku.length; i++) {
                                        if (data.data.sku[i].skuId == skuInfo[i].skuId) {
                                            skuInfo[i].stock = data.data.sku[i].stock;
                                        }
                                    }
                                }
                            });
                        }

                        /**
                         * 选中默认规格
                         */
                        for (var i = 0; i < $('.x-proDelpara .x-proDelparaLi').length; i++) {
                            $('.x-proDelpara .x-proDelparaLi').eq(i).find('p').eq(0).click();
                        }
                    }
                });


                /**
                 * 选择规格
                 */
                $('.x-proDelparalist').on('click', function() {
                    $('#js-preSaveOrder').off(); //解绑提交事件
                    if ($(this).hasClass('disable')) {
                        return false;
                    }

                    /**
                     * 标记选择的规格
                     */
                    if ($(this).hasClass('x-paralistlive')) {
                        $(this).removeClass('x-paralistlive');
                        $('#js-propertys .x-proDelparalist').removeClass('disable').css('color', 'black');
                    } else {
                        $(this).addClass('x-paralistlive').siblings().removeClass('x-paralistlive');
                    }
                    var selectedSkuValue = $(this).attr('skuvalue');

                    $('#js-propertys .x-proDelparalist').removeClass('disable').css('color', 'black');

                    /**
                     * 选择某一规格 校验包涵该规格的所有sku是否有库存
                     */
                    if (data.data.skuStockMgr == 2 || data.data.skuStockMgr == 4) {
                    } else {
                        for (var i = 0; i < skuInfo.length; i++) {
                            if (skuInfo[i].value.indexOf(selectedSkuValue) >= 0) {
                                if (skuInfo[i].stock == 0) {
                                    var otherPropertys = $(this).parent().parent().siblings().find('.x-proDelparalist');
                                    for (var j = 0; j < otherPropertys.length; j++) {
                                        if (skuInfo[i].value.indexOf(otherPropertys.eq(j).attr('skuvalue')) >= 0) {
                                            otherPropertys.eq(j).addClass('disable'); //如果库存为零则不不可选择  目前还没有库存为零的商品  此功能待测试
                                        }
                                    }
                                }
                            }
                        }
                    }

                    /**
                     * 选择结束加载库存
                     */
                    if ($('#js-propertys .x-proDelparaLi').length == $('#js-propertys .x-paralistlive').length) {
                        var skuValue = "";

                        for (i = 0; i < $('#js-propertys .x-proDelparaLi').length; i++) {
                            skuValue += $('#js-propertys .x-proDelparaLi').eq(i).find('.x-paralistlive').attr('skuValue');
                            if (i < $('#js-propertys .x-proDelparaLi').length - 1) {
                                skuValue += ',';
                            }
                        }

                        var saveSku;
                        for (i = 0; i < skuInfo.length; i++) {
                            if (skuInfo[i].value == skuValue) {
                                saveSku = skuInfo[i];
                                if (skuInfo[i].pcScoreNow) {
                                    $('#js-pcScorePrice').html(skuInfo[i].pcScoreNow); //有活动价格

                                    if (saveSku.strategy == 1) {
                                        $('.js_changeBox').addClass('x-none').eq(0).removeClass('x-none');
                                    } else {
                                        $('.js_changeBox').addClass('x-none').eq(2).removeClass('x-none');

                                        $('.js_s_cash').html(saveSku.pcPriceNow);
                                        $('.js_s_haiBei').html(saveSku.pcScoreNow);
                                    }
                                } else {
                                    $('#js-pcScorePrice').html(skuInfo[i].pcScorePrice); //无活动价格

                                    if (saveSku.strategy == 1) {
                                        $('.js_changeBox').addClass('x-none').eq(0).removeClass('x-none');
                                    } else {
                                        $('.js_changeBox').addClass('x-none').eq(2).removeClass('x-none');

                                        $('.js_s_cash').html(saveSku.pcSalePrice);
                                        $('.js_s_haiBei').html(saveSku.pcScorePrice);
                                    }
                                }
                            }
                        }

                        $(".js_s_payType").attr("payType", saveSku.strategy); //支付方式

                        /**
                         * 秒杀活动查看活动库存、其他查询普通库存
                         */
                        if (activityType == 2) {
                            activity.commonLoadStock(saveSku, productId);
                        } else {
                            sku.loadStock(productId, saveSku, data.data.skuStockMgr);
                        }
                    } else {
                        /**
                         * 规格未选全 点击兑换弹出提示
                         */
                        $('#js-preSaveOrder').off().on('click', function() {
                            alert("请选择商品规格");
                        });
                    }
                });

                /**
                 * 加载商品支付方式
                 */
                var strategy = data.data.sku[0].strategy; //获取商品的支付方式
                if (strategy == 2) {
                    $(".js_changeBox").filter(".1Box").addClass("x-none");
                    $(".js_changeBox").filter(".2Box").removeClass("x-none");
                    $(".js_s_cash").html(data.data.sku[0].pcSalePrice);
                    $(".js_s_haiBei").html(data.data.sku[0].pcScorePrice);
                }
            }
        });
    },

    /**
     *加载大小家电某个区域的商品库存
     */
    areaStore: function(params) {
        if(params.area.indexOf("请选择")<0){
            var url = devUrl + "/sku/user/loadRegionStock";
            $.ajax({
                url: url,
                data: params,
                success_cb: function(data) {
                    if (data.isSuccess) {
                        if (data.data < 1) {
                            $(".js_s_areaStore").html("无库存");
                        } else {
                            $(".js_s_areaStore").html("有库存");
                        }
                    }
                }
            });
        }
    },

    /**
     *判断商品是否支持卡兑换
     */
    isExchange: function(productId) {
        var url = devUrl + "/score/card/isexchange";
        var params = {
            goodsId: productId
        };
        $.ajax({
            url: url,
            data: params,
            success_cb: function(data) {
                if (data == true) {
                    $(".js_changeBox").filter(".3Box").removeClass("x-none");
                    $(".js_changeBox").filter(".1Box").addClass("x-none");
                    $(".js_changeBox").filter(".2Box").addClass("x-none");
                    $(".js_s_payType").attr("payType", "3");
                }
            }
        });
    },

    /**
     * 根据sku异步加载库存
     */
    loadStock: function(productId, saveSku, skuStockMgr) {
        var url = devUrl + "/sku/user/loadStock";
        var params = {
            productId: productId,
            inSkuCode: saveSku.inSkuCode
        };
        $.ajax({
            url: url,
            data: params,
            success_cb: function(data) {
                /**
                 * 大小家电维护库存
                 */
                if (skuStockMgr == 2 || skuStockMgr == 4) {

                    $('#js-preSaveOrder').attr('skuId', saveSku.skuId);
                    $('#js-preSaveOrder').attr('activityGoodsId', saveSku.activityGoodsId);
                    $('#js-preSaveOrder').attr('activitySkuId', saveSku.activitySkuId);
                    $('#js-preSaveOrder').attr('activityType', saveSku.activityType);

                    /**
                     * 跳转下订单页面
                     */
                    $('#js-preSaveOrder').off().on('click', function() {
                        var flag = $("#limitWarn").val();
                        if(flag!=""){
                            $(".js-proDialog").show();
                            $(".js-dialog-message").text($("#limitWarn").val());
                        }else{
                            $(".js-proDialog").hide();
                            /**
                             * 判断是否选择正确的配送区域
                             */
                            if(!($(".js_getProvince").val()!=" "&&$(".js_getCity").val()!=" "&&$(".js_getCityArea ").val()!=" ")){
                                alert("请选择您所在的地区后进行兑换")
                                return;
                            }
                            // console.log("通过！")
                            /**
                             * 判断买家是否已选择商品规格，若未选择，弹框提示
                             */

                        if ($("#js-propertys .x-proDelparaLi").length != $("#js-propertys .x-paralistlive").length) {
                            alert('请选择商品规格');
                        } else {
                            if ($(".js_s_beginSecKill").text() == "开始秒杀") {
                                $(".js_s_checkCode input").val("");
                                $(".js_s_checkCode").show();
                            }
                        }

                        if ($('.js_s_areaStore').html()=='无库存') {
                            alert("库存不足");
                            return false;
                        }

                            if ($("#js-preSaveOrder").attr('skuId')) {
                                if (!istrsidssdssotoken()) {
                                    showJumpCount.creatJumpCount().setCount(5).setUrl("http://user.haier.com/ids/cn/haier_login.jsp?regFrom=haierhaibeiWeb&returnUrl=" + window.location.href).setOperate("后跳转到登录页面。").show();
                                } else {
                                    window.location.href = formSureUrl + "?productId=" + productId + "&skuId=" + $("#js-preSaveOrder").attr('skuId') + "&buyNum=" + $('#js-buyNum').val() + "&activityGoodsId=" + $("#js-preSaveOrder").attr('activityGoodsId') + "&activitySkuId=" + $("#js-preSaveOrder").attr('activitySkuId') + "&activityType=" + $("#js-preSaveOrder").attr('activityType') + "&payType=" + $('#js-preSaveOrder').attr('payType') + "&skuStockMgr=" + skuStockMgr + "&area=" + $('.js_getProvince').find("option:selected").html() + " " + $('.js_getCity').find("option:selected").html() + " " + $('.js_getCityArea').find("option:selected").html();
                                }
                            }
                        }

                        $(".js_giveUp").click(function () {
                            //window.close();
                            location.href = "../";
                        });
                        $(".js_goOn").click(function () {
                            $(".js-proDialog").hide();
                            /**
                             * 判断是否选择正确的配送区域
                             */
                            if(!($(".js_getProvince").val()!=" "&&$(".js_getCity").val()!=" "&&$(".js_getCityArea ").val()!=" ")){
                                alert("请选择您所在的地区后进行兑换")
                                return;
                            }
                            // console.log("通过！")
                            /**
                             * 判断买家是否已选择商品规格，若未选择，弹框提示
                             */

                            if ($("#js-propertys .x-proDelparaLi").length != $("#js-propertys .x-paralistlive").length) {
                                alert('请选择商品规格');
                            } else {
                                if ($(".js_s_beginSecKill").text() == "开始秒杀") {
                                    $(".js_s_checkCode input").val("");
                                    $(".js_s_checkCode").show();
                                }
                            }

                            if ($('.js_s_areaStore').html()=='无库存') {
                                alert("库存不足");
                                return false;
                            }

                            if ($("#js-preSaveOrder").attr('skuId')) {
                                if (!istrsidssdssotoken()) {
                                    showJumpCount.creatJumpCount().setCount(5).setUrl("http://user.haier.com/ids/cn/haier_login.jsp?regFrom=haierhaibeiWeb&returnUrl=" + window.location.href).setOperate("后跳转到登录页面。").show();
                                } else {
                                    window.location.href = formSureUrl + "?productId=" + productId + "&skuId=" + $("#js-preSaveOrder").attr('skuId') + "&buyNum=" + $('#js-buyNum').val() + "&activityGoodsId=" + $("#js-preSaveOrder").attr('activityGoodsId') + "&activitySkuId=" + $("#js-preSaveOrder").attr('activitySkuId') + "&activityType=" + $("#js-preSaveOrder").attr('activityType') + "&payType=" + $('#js-preSaveOrder').attr('payType') + "&skuStockMgr=" + skuStockMgr + "&area=" + $('.js_getProvince').find("option:selected").html() + " " + $('.js_getCity').find("option:selected").html() + " " + $('.js_getCityArea').find("option:selected").html();
                                }
                            }
                        });
                    });
                } else {

                    $('#js-stock').html(data.data.sku[0].stock).parent().show();
                    $('#js-preSaveOrder').attr('skuId', saveSku.skuId);
                    $('#js-preSaveOrder').attr('activityGoodsId', saveSku.activityGoodsId);
                    $('#js-preSaveOrder').attr('activitySkuId', saveSku.activitySkuId);
                    $('#js-preSaveOrder').attr('activityType', saveSku.activityType);

                    /**
                     * 跳转下订单页面
                     */
                    $('#js-preSaveOrder').off().on('click', function() {
                        var flag = $("#limitWarn").val();
                        if(flag!=""){
                            $(".js-proDialog").show();
                            $(".js-dialog-message").text($("#limitWarn").val());
                        }else{
                            $(".js-proDialog").hide();
                            /**
                             * 判断买家是否已选择商品规格，若未选择，弹框提示
                             */
                            if ($("#js-propertys .x-proDelparaLi").length != $("#js-propertys .x-paralistlive").length) {
                                alert('请选择商品规格');
                            } else {
                                if ($(".js_s_beginSecKill").text() == "开始秒杀") {
                                    $(".js_s_checkCode input").val("");
                                    $(".js_s_checkCode").show();
                                }
                            }
                            if (data.data.sku[0].stock <= 0) {
                                alert("库存不足");
                                return false;
                            }

                            if ($("#js-preSaveOrder").attr('skuId')) {
                                if (!istrsidssdssotoken()) {
                                    showJumpCount.creatJumpCount().setCount(5).setUrl("http://user.haier.com/ids/cn/haier_login.jsp?regFrom=haierhaibeiWeb&returnUrl=" + window.location.href).setOperate("后跳转到登录页面。").show();
                                } else {
                                    window.location.href = formSureUrl + "?productId=" + productId + "&skuId=" + $("#js-preSaveOrder").attr('skuId') + "&buyNum=" + $('#js-buyNum').val() + "&activityGoodsId=" + $("#js-preSaveOrder").attr('activityGoodsId') + "&activitySkuId=" + $("#js-preSaveOrder").attr('activitySkuId') + "&activityType=" + $("#js-preSaveOrder").attr('activityType') + "&payType=" + $('#js-preSaveOrder').attr('payType') + "&skuStockMgr=" + skuStockMgr;
                                }
                            }
                        }

                        $(".js_giveUp").click(function () {
                            //window.close();
                            location.href = "../";
                        });
                        $(".js_goOn").click(function () {
                            $(".js-proDialog").hide();
                            /**
                             * 判断买家是否已选择商品规格，若未选择，弹框提示
                             */
                            if ($("#js-propertys .x-proDelparaLi").length != $("#js-propertys .x-paralistlive").length) {
                                alert('请选择商品规格');
                            } else {
                                if ($(".js_s_beginSecKill").text() == "开始秒杀") {
                                    $(".js_s_checkCode input").val("");
                                    $(".js_s_checkCode").show();
                                }
                            }
                            if (data.data.sku[0].stock <= 0) {
                                alert("库存不足");
                                return false;
                            }

                            if ($("#js-preSaveOrder").attr('skuId')) {
                                if (!istrsidssdssotoken()) {
                                    showJumpCount.creatJumpCount().setCount(5).setUrl("http://user.haier.com/ids/cn/haier_login.jsp?regFrom=haierhaibeiWeb&returnUrl=" + window.location.href).setOperate("后跳转到登录页面。").show();
                                } else {
                                    window.location.href = formSureUrl + "?productId=" + productId + "&skuId=" + $("#js-preSaveOrder").attr('skuId') + "&buyNum=" + $('#js-buyNum').val() + "&activityGoodsId=" + $("#js-preSaveOrder").attr('activityGoodsId') + "&activitySkuId=" + $("#js-preSaveOrder").attr('activitySkuId') + "&activityType=" + $("#js-preSaveOrder").attr('activityType') + "&payType=" + $('#js-preSaveOrder').attr('payType') + "&skuStockMgr=" + skuStockMgr;
                                }
                            }
                        });
                    });
                }
            }
        });
    },
};
function showDialog() {
    var flag = $("#limitWarn").val();
    if(flag!=""){
        $(".js-proDialog").show();
        $(".js-dialog-message").text($("#limitWarn").val());
    }else{
        $(".js-proDialog").hide();
    }

    $(".js_giveUp").click(function () {
        //window.close();
        location.href = "../";
    });
    $(".js_goOn").click(function () {
        $(".js-proDialog").hide();
    })
}
