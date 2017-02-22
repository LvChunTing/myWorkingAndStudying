$(document).ready(function() {
	$("#form").validate({
		debug:true,
		rules: {
			name: {
				isname: true
			},
			maidian: {
				ismai: true
			},
			jiage: {
				isjiage: true
			},
			shichangjia: {
				isshichangjia: true
			},
			chengbenjia: {
				ischengbenjia: true
			},
			kucun: {
				iskucun: true
			},
			yujing: {
				isyujing: true
			},
			huohao: {
				ishuohao: true
			},
			pinpai: {
				ispinpai: true
			},
			yunfei: {
				isyunfei: true
			}
		},
		errorPlacement: function(error, element) {
			error.appendTo(element.parent());
		}
	});
	//表单提交验证(之前是用submit写的提交误打误撞，这是正确的)
	$("#tijiao").click(function (event) {
	var flag=$('#form').valid()
	if (flag) {
		alert("验证通过")
	} else{
		alert("验证失败")
	}
	
	})
	jQuery.validator.addMethod("isname", function(value, element) {
		var name = /^[\u4e00-\u9fa5]{3,50}$|^[\dA-Za-z_]{3,50}$/;
		return this.optional(element) || (name.test(value));
	}, "请按照要求填写商品名称");
	jQuery.validator.addMethod("ismai", function(value, element) {
		var name = /^[\u4e00-\u9fa5]{1,140}$/;
		return this.optional(element) || (name.test(value));
	}, "请按照要求填写商品卖点");
	jQuery.validator.addMethod("isjiage", function(value, element) {
		var name = /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,8}\.\d{0,2}$|^[1-9]\d{0,6}$/;
		zhekou();
		var SPJG = $("#spjg").val() - 0
		var SCJG = $("#scjg").val() - 0
		if(SPJG > SCJG && $("#scjg").val() !== "") {
			return this.optional(element)
		} else {
			return(name.test(value));
		}
		return this.optional(element) || (name.test(value));
	}, "商品价格高于市场价或商品价格式不正确");
	jQuery.validator.addMethod("isshichangjia", function(value, element) {
		var name = /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,8}\.\d{0,2}$|^[1-9]\d{0,6}$/;
		zhekou();
		var SPJG = $("#spjg").val() - 0
		var SCJG = $("#scjg").val() - 0
		if(SPJG > SCJG) {
			return this.optional(element)
		} else {
			return(name.test(value));
		}
	}, "商品价格高于市场价或市场价格式不正确");
	jQuery.validator.addMethod("ischengbenjia", function(value, element) {
		var name = /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,8}\.\d{0,2}$|^[1-9]\d{0,6}$/;
		return this.optional(element) || (name.test(value));
	}, "请按照要求填写成本价");
	jQuery.validator.addMethod("iskucun", function(value, element) {
		var name = /^([0-9]|([1-9][0-9])|([1-3][0-5][0-9]))\d{0,5}$/;
		return this.optional(element) || (name.test(value));
	}, "请按照要求填写商品库存");
	jQuery.validator.addMethod("isyujing", function(value, element) {
		var name = /^(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;
		return this.optional(element) || (name.test(value));
	}, "请按照要求填写库存预警值");
	jQuery.validator.addMethod("ishuohao", function(value, element) {
		var name = /^[\s\S]{0,20}$/;
		return this.optional(element) || (name.test(value));
	}, "请按照要求填写商家货号");
	jQuery.validator.addMethod("ispinpai", function(value, element) {
		//       var name = ;
		return this.optional(element) || (name.test(value));
	}, "请按照要求填写商品品牌");
	jQuery.validator.addMethod("isyunfei", function(value, element) {
		var name = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
		return this.optional(element) || (name.test(value));
	}, "请按照要求填写运费");

	function zhekou() {
		var zk = $("#spjg").val() / $("#scjg").val()
		zk = zk * 100
		zk = zk.toFixed(2)
		$("#zhekou").html(zk)
	}
	
})
	//上传图片
	//       if(window.FileReader) {
	var SC = document.getElementById("scanniu")
	var oFile = document.getElementById("file")
	var SPT = document.getElementsByClassName("shangpint")[0]
	var oYL = document.getElementById("yulan")
	oFile.onchange = function() {
			var aFiles = oFile.files;
			console.log(aFiles);
			for(var i = 0; i < aFiles.length; i++) {
                var reader = new FileReader();
				reader.readAsDataURL(aFiles[i])
				if (aFiles[i].size/1024>1024) {
					alert("图片"+aFiles[i].name+"尺寸太大，与要求不符,请按照要求上传")
				} else{
					reader.onload = function() {
					var img = new Image();
					img.src = this.result;
					SPT.appendChild(img)
				}
			
				}
			}
		}
