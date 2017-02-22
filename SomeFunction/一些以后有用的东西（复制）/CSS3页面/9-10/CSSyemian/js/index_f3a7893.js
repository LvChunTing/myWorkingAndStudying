nie.define("Index", function() {
	var e = ["http://res.juexing.netease.com/pc/gw/20160721140935/img/person_1_2235a46.jpg", "http://res.juexing.netease.com/pc/gw/20160721140935/img/person_2_019d652.jpg", "http://res.juexing.netease.com/pc/gw/20160721140935/img/person_3_ca69b48.jpg", "http://res.juexing.netease.com/pc/gw/20160721140935/img/person_4_8330873.jpg", "http://res.juexing.netease.com/pc/gw/20160721140935/img/person_5_51f1aba.jpg", "http://res.juexing.netease.com/pc/gw/20160721140935/img/person_6_210c889.jpg", "http://res.juexing.netease.com/pc/gw/20160721140935/img/person_7_d93ae4e.jpg"],
		i = $(".container_3"),
		t = $(".imgWrap"),
		n = $(".slideTxtBox2");
	$(".slideTxtBox2").slide({
		titCell: ".hd ul",
		mainCell: ".bd ul",
		effect: "leftLoop",
		autoPlay: !1,
		prevCell: ".prev",
		nextCell: ".next",
		trigger: "click",
		autoPage: "<li></li>"
	});
	var a = function() {
		var e = window.pageYOffset || document.body.scrollTop;
		(e > 700 || ca.browser.versions.mobile) && $(".container_3").addClass("active"), 
		(e > 1300 || ca.browser.versions.mobile) && $(".container_4").addClass("active"),
		(e > 2e3 || ca.browser.versions.mobile) && $(".container_5").addClass("active"), 
		(e > 2800 || ca.browser.versions.mobile) && $(".container_6").addClass("active"),
		(e > 3400 || ca.browser.versions.mobile) && $(".footer").addClass("active")
	};
	$(".person_list li").mouseover(function() {
		var t = $(this).index();
		i.css("background-image", "url(" + e[t] + ")")
	}), 
	$(".play_wrap").mouseover(function() {
		$(".container_6 .mask").css("width", "0")
	}),
	$(".play_wrap").mouseleave(function() {
		$(".container_6 .mask").css("width", "50%")
	}), 
	$(window).scroll(a),
	a(),
	$(".container_2,.container_1").addClass("active"), 
	t.click(function() {
		var e = $(this).index();
		n.find(".hd li").eq(e).click();
	});
	var s = $(".page");
	$(".replace").click(function() {
		var e = $(this).data("page");
		e++, e > 2 && (e = 0), $(this).data("page", e), s.hide().eq(e).show()
	});
	nie.require("ui.lightBox");
	$(".jzzq_a,.cell_s .mask").lightBox();
	var o = ($(".container_6"), $(".pop")),
		c = function() {
			nie.require("nie.util.videoV2");
			$(".mask_p").click(function() {
				o.hide()
			})
		},
		r = $(".container_2 .cell_1"),
		l = $(".title_1"),
		p = ($(".container_1 .title,.container_1 .subtitle"), function(e) {
			var i = 340 - (1920 - e);
			0 > i && (i = 0), r.css("left", i + "px"), l.css("padding-left", i + 20 + "px")
		});
	c(), p(document.documentElement.clientWidth), $(window).resize(function() {
		var e = document.documentElement.clientWidth;
		1920 > e && p(e)
	}); {
		var d = $("#share_pic").attr("data-src"),
			g = $("#share_desc").html(),
			m = $("#share_title").html(),
			u = nie.require("nie.util.shareV5");
		u({
			fat: "#share",
			type: 2,
			defShow: [23, 22, 2, 1],
			title: m,
			img: d,
			content: g
		})
	}
});