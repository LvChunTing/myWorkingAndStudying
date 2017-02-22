(function() {

	$.fn.LCTchajian = function(params) {
		var defaults = {
			name: /^[a-zA-Z0-9]{6,12}$/,
			password: /^[a-zA-Z0-9]{6,}$/,
			phone: /^1[34578]\d{9}$/,
			email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
			age: /^([0-9]|[0-9]{2}|100)$/,
			about: /^([-_0-9A-Za-z\u4e00-\u9fa5]){15,50}$/,
			sex: /^['男'|'女']$/
		}
		var Reg = $.extend(defaults, params);
		//必填字段  在html中只要添加 LCT-requird 自动在input后面加一个 *
		$(this).find("input[LCT-requird]").parent().append('<span class="req">*</span>');
		//这个主要是因为火狐浏览器刷新页面input中的内容不清空
		$(this).find("input:not([type=button])").val("");
		$(this).find("textarea").val("");
		if((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)) {
			//由于IE9以下浏览器不支持placeholder属性  如果是IE9以及以下浏览器 就把placeholder属性换掉
			//ie8下 无法更改input的type属性 ie8不支持oninput事件  是最麻烦的！！！！！  
			if(navigator.userAgent.indexOf("MSIE 9.0") > 0 && !window.innerWidth) {
				alert("ie8浏览器，改为失去焦点时验证");
				var Input = $(this).find("input:not([type=button])")
				Input.push($(this).find("textarea")[0])
				$.each(Input, function(i, kidinp) {
					if(kidinp.type == "password") {
						kidinp.value = "";
						//					kidinp.value = kidinp.getAttribute("placeholder");
					} else {
						kidinp.value = kidinp.getAttribute("placeholder");
					}
					var Name = $("input[LCT-name]").get(0)
					Name.onblur = function() {
							//正则验证
							var flag_name = Reg.name.test($(this).val());
							//判断验证是否通过
							if(!flag_name) {
								Err($(this))
							} else {
								Rit($(this))
							}
						}
						//密码
					var Pass = $("input[LCT-password]").get(0)
					Pass.onblur = function() {
							//正则验证
							var flag_password = Reg.password.test($(this).val());
							//判断验证是否通过
							if(!flag_password) {
								Err($(this))
							} else {
								Rit($(this))
							}
						}
						//确认密码
					var PassQD = $("input[LCT-passwordQD]").get(0)
					PassQD.onblur = function() {
							var flag_password = Reg.password.test($(this).val());

							//取到密码中的值
							if($(this).val() == $("input[LCT-password]").val() && flag_password) {

								Rit($(this))
							} else {
								Err($(this))
							}
							if($(this).val() == "") {
								Err($(this))
							}
						}
						//手机号
					var Phone = $("input[LCT-phone]").get(0)
					Phone.onblur = function() {
							//正则验证
							var flag_phone = Reg.phone.test($(this).val());
							if(!flag_phone) {
								Err($(this))
							} else {
								Rit($(this))
							}
						}
						//邮箱
					var Email = $("input[LCT-email]").get(0)
					Email.onblur = function() {
							//正则验证
							var flag_email = Reg.email.test($(this).val());
							if(!flag_email) {
								Err($(this))
							} else {
								Rit($(this))
							}
						}
						//性别
					var Sex = $("input[LCT-sex]").get(0)
					Sex.onblur = function() {
							if($(this).val() != "") {
								//正则验证
								var flag_sex = Reg.sex.test($(this).val());
								if(!flag_sex) {
									Err($(this))
								} else {
									Rit($(this))
								}
							}
						}
						//年龄
					var Age = $("input[LCT-age]").get(0)
					Age.onblur = function() {
							if($(this).val() != "") {
								//正则验证
								var flag_age = Reg.age.test($(this).val());
								if(!flag_age) {
									Err($(this))
								} else {
									Rit($(this))
								}
							}
						}
						//个人说明
					var About = $("textarea[LCT-about]").get(0)
					About.onblur = function() {
						if($(this).val() != "") {
							//正则验证
							var flag_about = Reg.about.test($(this).val());
							if(!flag_about) {
								Err($(this))
							} else {
								Rit($(this))
							}
						}
					}
					kidinp.onfocus = function() {
						if(this.value == this.getAttribute("placeholder")) {
							this.value = ""
						}
					}
					kidinp.onblur = function() {
						if(this.getAttribute("LCT-password") == null && this.getAttribute("LCT-passwordQD") == null) {
							if(this.value == "") {
								this.value = this.getAttribute("placeholder")
							}
						}

					}
				});
				$("#btn").click(function() {
					$.each(Input, function(i, kidinp) {
						if(kidinp.value == kidinp.getAttribute("placeholder") && kidinp.getAttribute("LCT-requird") != null) {
							$(this).parent().append('<span class="err">' + $(this).attr("errMsg") + '</span>');
						}
					});
				})
			} else if(navigator.userAgent.indexOf("MSIE 9.0") > 0 && window.innerWidth) {
				alert("ie9")
				var Input = $(this).find("input:not([type=button])")
				Input.push($(this).find("textarea")[0])
				$.each(Input, function(i, kidinp) {
					if(kidinp.type == "password") {
						kidinp.type = "text";
					}
					kidinp.value = kidinp.getAttribute("placeholder");
					kidinp.onfocus = function() {
						if(this.getAttribute("LCT-password") != null || this.getAttribute("LCT-passwordQD") != null) {
							this.type = "password"
						}
						if(this.value == this.getAttribute("placeholder")) {
							this.value = ""
						}
					}
					kidinp.onblur = function() {
						if(this.getAttribute("LCT-password") == null && this.getAttribute("LCT-passwordQD") == null) {
							if(this.value == "") {
								this.value = this.getAttribute("placeholder")
							}
						}

					}
				});
				$("#btn").click(function() {
					$.each(Input, function(i, kidinp) {
						if(kidinp.value == kidinp.getAttribute("placeholder") && kidinp.getAttribute("LCT-requird") != null) {
							$(this).parent().append('<span class="err">' + $(this).attr("errMsg") + '</span>');
						}
					});
				})
			} else {
				alert("浏览器版本过低，最高兼容到ie8")
			}
		}
		//正确时候的提示信息
		var Rmsg = "验证通过";
		//错误时候的提示信息写在了html中
		//用户名的填写验证
		var Name = $("input[LCT-name]").get(0)
		Name.oninput = function() {
				console.log(45665)
					//正则验证
				var flag_name = Reg.name.test($(this).val());
				//判断验证是否通过
				if(!flag_name) {
					Err($(this))
				} else {
					Rit($(this))
				}
			}
			//密码
		var Pass = $("input[LCT-password]").get(0)
		Pass.oninput = function() {
				//正则验证
				var flag_name = Reg.password.test($(this).val());
				//判断验证是否通过
				if(!flag_name) {
					Err($(this))
				} else {
					Rit($(this))
				}
			}
			//确认密码
		var PassQD = $("input[LCT-passwordQD]").get(0)
		PassQD.oninput = function() {
				//取到密码中的值
				if($(this).val() != $("input[LCT-password]").val()) {
					Err($(this))
				} else {
					Rit($(this))
				}
			}
			//手机号
		var Phone = $("input[LCT-phone]").get(0)
		Phone.oninput = function() {
				//正则验证
				var flag_phone = Reg.phone.test($(this).val());
				if(!flag_phone) {
					Err($(this))
				} else {
					Rit($(this))
				}
			}
			//邮箱
		var Email = $("input[LCT-email]").get(0)
		Email.oninput = function() {
				//正则验证
				var flag_email = Reg.email.test($(this).val());
				if(!flag_email) {
					Err($(this))
				} else {
					Rit($(this))
				}
			}
			//性别
		var Sex = $("input[LCT-sex]").get(0)
		Sex.oninput = function() {
				//正则验证
				var flag_sex = Reg.sex.test($(this).val());
				if(!flag_sex) {
					Err($(this))
				} else {
					Rit($(this))
				}
			}
			//年龄
		var Age = $("input[LCT-age]").get(0)
		Age.oninput = function() {
				//正则验证
				var flag_age = Reg.age.test($(this).val());
				if(!flag_age) {
					Err($(this))
				} else {
					Rit($(this))
				}
			}
			//个人说明
		var About = $("textarea[LCT-about]").get(0)
		About.oninput = function() {
			//正则验证
			var flag_about = Reg.about.test($(this).val());
			if(!flag_about) {
				Err($(this))
			} else {
				Rit($(this))
			}
		}

		//验证不通过的时候应该调用的方法
		function Err($elm) {
			var Ferr = $elm.siblings(".err").length;
			var Frit = $elm.siblings(".rit").length;
			if(Ferr == 0) {
				$elm.siblings(".rit").remove();
				$elm.parent().append('<span class="err">' + $elm.attr("errMsg") + '</span>');
			}
		}
		//验证通过的时候应该调用的方法
		function Rit($elm) {
			var Ferr = $elm.siblings(".err").length;
			var Frit = $elm.siblings(".rit").length;
			if(Frit == 0) {
				$elm.siblings(".err").remove();
				$elm.parent().append('<span class="rit">' + Rmsg + '</span>');
			}
		}

		$("#btn").click(function() {
			var Flag_req = true;
			//提交的时候  要判断没有错误信息  以及必须要填写的内容都填写好了才能成功提交
			var errNum = $("#yanzheng").find(".err").length;
			var Req = $("input[LCT-requird]");
			$.each(Req, function(i, kidReq) {
				if(kidReq.value.length == 0) {
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