/**
 * Created by Administrator on 2017/1/16 0016.
 */
(function () {
    $.fn.LCTchajian=function (params) {
        var defaults = {
            name: /^[a-zA-Z0-9]{6,12}$/,
            password: /^[a-zA-Z0-9]{6,}$/,
            passwordQD: /^[a-zA-Z0-9]{6,}$/,
            phone: /^1[34578]\d{9}$/,
            email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            age: /^([0-9]|[0-9]{2}|100)$|^$/,
            about: /^([-_0-9A-Za-z\u4e00-\u9fa5]){15,50}$|^$/,
            sex: /^['男'|'女']$|^$/
        }
        var Reg = $.extend(defaults, params);                                                     //如果params中有，用params的，如果没有就用defaults的
        var Rmsg = "验证通过";                                                                    //正则验证通过的时候应该提示的信息

        $(this).find("input[LCT-requird]").parent().append('<span class="req">*</span>');         //必填字段加一个*
        $(this).find("input:not([type=button])").val("");
        $(this).find("textarea").val("");                                                         //解决火狐浏览器不清空input的问题
        var Input = $(this).find("input:not([type=button])");
        Input.push($(this).find("textarea")[0]);                                                  //找到所有的input
        if((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0))//处理IE9浏览器问题
        {
            $("input:not([type=button])").css({"min-width": "250px"})
            if(navigator.userAgent.indexOf("MSIE 9.0") > 0 && window.innerWidth) {
                alert("ie9")
                $.each(Input, function (i, kidInput) {
                    if (kidInput.type == "password") {
                        kidInput.type = "text";
                    }
                    kidInput.value = kidInput.getAttribute("errMsg");
                    kidInput.onfocus = function (e) {
                        if (this.getAttribute("LCT") == "password" || this.getAttribute("LCT") == "passwordQD") {
                            this.type = "password"
                        }
                        if (this.value == this.getAttribute("errMsg")) {
                            this.value = ""
                        }
                    }
                    kidInput.onblur = function (e) {
                        zhengze(e)
                    }
                })
            }else if(navigator.userAgent.indexOf("MSIE 9.0") > 0 && !window.innerWidth){
                alert("ie8,暂时未解决")
                $.each(Input, function (i, kidInput) {
                    kidInput.value = kidInput.getAttribute("errMsg");
                    kidInput.onfocus = function (e) {
                        if (this.getAttribute("LCT") == "password" || this.getAttribute("LCT") == "passwordQD") {
                            this.type = "password"
                        }
                        if (this.value == this.getAttribute("errMsg")) {
                            this.value = ""
                        }
                    }
                    kidInput.onblur = function (e) {
                        zhengze(e)
                    }
                })

            }
        }else{
        $.each(Input,function (i,kidInput) {                                                     //给所有的input加事件
            kidInput.oninput=function (e) {
                zhengze(e)
            }
        })
        }
    //    写一个方法用于正则验证
        function zhengze($eve) {
            var nodeValue =$eve.target.attributes['LCT'].nodeValue;                                  //取到对应的正则表达式
            var Ferr = $($eve.target).siblings(".err").length;                                   //判断当前需要验证的输入框后面是否有了错误信息或正确信息
            var Frit = $($eve.target).siblings(".rit").length;
            var flag = Reg[nodeValue].test($eve.target.value);                                       //正则验证输入的值
            var Flag=true;                                                                          //单独验证一次确定密码的值是不是等于密码的值
            if  (nodeValue=="passwordQD"){
                if($($eve.target).val()==$("input[LCT=password]").val()){
                    Flag=true;
                }else{
                    Flag=false;
                }
            }
            if(flag&&Flag){
                if(Frit == 0) {
                    $($eve.target).siblings(".err").remove();
                    $($eve.target).parent().append('<span class="rit">' + Rmsg + '</span>');
                }
            }else{
                if(Ferr == 0) {
                    $($eve.target).siblings(".rit").remove();
                    $($eve.target).parent().append('<span class="err">' + $($eve.target).attr("errMsg") + '</span>');
                }
            }
            if($($eve.target).val()==""){                                                            //非空字段如果不填或者填了之后删除可以通过验证，但是不提示验证通过
                $($eve.target).siblings(".rit").remove();
            }
        }

        //点击提交时应该调用的方法
        $("#btn").click(function() {
            var Flag_req = true;
            //提交的时候  要判断没有错误信息  以及必须要填写的内容都填写好了才能成功提交
            var errNum = $("#yanzheng").find(".err").length;
            var Req = $("input[LCT-requird]");
            $.each(Req, function(i, kidReq) {
                if(kidReq.value.length == 0|| kidReq.value==kidReq.getAttribute("errMsg")) {
                    if($(this).parent().find(".err").length == 0) {
                        $(this).parent().append('<span class="err">' + $(this).attr("errMsg") + '</span>');
                    }
                    Flag_req = false;
                } else {
                    Flag_req = true;
                }
            })
            if(Flag_req == true && errNum == 0) {
                alert("验证通过")
            } else {
                alert("验证不通过")
            }
        })
    }















})(jQuery)