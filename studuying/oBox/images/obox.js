!function(t,n,i){function o(){return!(!Object.hasOwnProperty.call(t,"ActiveXObject")||t.ActiveXObject)}function s(){return navigator.userAgent.indexOf("Firefox")>=0}function e(){var t={};return t.isSupportTouch="ontouchend"in n,t.isEvent=t.isSupportTouch?"touchstart":"click","touchstart"==t.isEvent}function a(){var t=navigator.userAgent;return navigator.userAgent.indexOf("UCBrowser")>-1||t.indexOf("Android")>-1||t.indexOf("Linux")>-1}function r(){for(var t=navigator.userAgent,n=new Array("Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"),i=!0,o=0;o<n.length;o++)if(t.indexOf(n[o])>0){i=!1;break}return i}isIe=navigator.userAgent.indexOf("MSIE")>=0&&navigator.userAgent.indexOf("Opera")<0,isOpera=i.browser.opera,isSafari=i.browser.safari,isIe11=o(),isIe8=isIe&&navigator.userAgent.indexOf("MSIE 8.0")>0&&!isIe11,isIe9=isIe&&navigator.userAgent.indexOf("MSIE 9.0")>0&&!isIe11,isPC=r(),isUC=a(),isFirefox=s(),isTouch=e(),i.fn.oClear=function(){i(this).contents().filter(function(){3===i(this)[0].nodeType&&i(this).remove()})},i.fn.oSelect=function(t){var n,o={go:!0,showLenght:5,cont:i(this).parent(),openfn:function(){},closefn:function(){}},s=i.extend(o,t),e=i(this),a=e.attr("autotext"),r=s.cont,h=i("<div>").addClass("o_Dropdown"),l=i("<i>").addClass("i_down"),c=i("<span>").addClass("name").html(a),u=i("<div>").addClass("list"),p=i("<ul>"),f=e.find("option"),d=i("<li>"),g=i("<span>"),m=s.showLenght,v=s.openfn,x=s.closefn;s.go;h.css("cursor","default"),r.css({position:"relative","z-index":"0"}),f.each(function(t){if(t>0&&i(this).attr("selected")){var n=i(this).html();return c.html(n),!1}}),p.appendTo(u),h.append(l).append(c).append(u),e.before(h).css("display","none"),e.appendTo(h);var w=p.oScrollBar({});return e.init=function(){e.lose(),p.find("li").on("click",function(t){p.find("li").removeClass("cur"),i(this).addClass("cur"),$i=p.find("li").index(this),f=e.find("option"),f.attr("selected",!1).eq($i+1).attr("selected",!0),$val=i(this).find("span").html(),u.css("display","none"),c.html($val),e.change(),t.stopPropagation()}),h.on("change","select",function(t){var n=i(this).find("option:selected").html(),o=i(this).find("option[value='"+n+"']").index();p.find("li").removeClass("cur").eq(o-1).addClass("cur"),c.html(n)}),e.resetting()},e.lose=function(){h.attr("style",""),f=e.find("option"),p.html(""),c.html(a),f.each(function(t){if(t>0){var o=i(this).html(),s=d.clone(),e=g.clone();i(this).attr("selected")&&(o=i(this).html(),c.html(o),n=f.index(this),s.addClass("cur")),e.html(o),s.append(e),p.append(s)}}),c.off(),h.css("cursor","default"),e.css({display:"none"})},e.resetting=function(){isPC?(c.on("click",function(){u.css("display","inline-block"),r.css({"z-index":"1"}),f.length<=m?u.css("height",p.height()):u.css("height","200px"),v(h),w.init()}),h.hover(function(){},function(){u.css("display","none"),r.css({"z-index":"0"}),x(h)}),e.css({display:"none"})):(c.off(),e.css({display:"block"}))},e},i.fn.oMenu=function(t){var n,o,s,e,a,r={menu:"",mainbox:".o_main",linkage:!0,btnbox:i(this),zztop:0,openfn:null,closefn:null,menuwidth:null,zzclass:"o_m_zz"},h=i.extend(r,t),l=i(this),c=i(h.mainbox),u=i("<div>").addClass(h.zzclass),p=h.linkage,f=i(h.btnbox),d=i(h.menu),g=h.menuwidth?h.menuwidth:d.width();return l.on("click",function(){u.attr("style","margin-top:"+h.zztop+"px"),o=Math.abs(parseFloat(c.css("left"))),s=Math.abs(parseFloat(c.css("right"))),e=parseFloat(d.css("left")),a=parseFloat(d.css("right")),p?o>0||s>0?("left"==n?(c.oCss3({transform:"translate3d("+Math.abs(e)+"px,0px,0px)","transition-duration":"0s"},!1),c.css({left:"0px"}),setTimeout(function(){c.oCss3({transform:"translate3d(0px,0px,0px)","transition-duration":"0.3s"},!1)},10),l.removezz(),h.closefn&&h.closefn(l)):"right"==n&&(c.oCss3({transform:"translate3d("+-Math.abs(a)+"px,0px,0px)","transition-duration":"0s"},!1),c.css({right:"0px"}),setTimeout(function(){c.oCss3({transform:"translate3d(0px,0px,0px)","transition-duration":"0.3s"},!1)},10),l.removezz(),h.closefn&&h.closefn(l)),l.removeClass("cur")):(0>a?(c.oCss3({transform:"translate3d("+-Math.abs(a)+"px,0px,0px)","transition-duration":"0.3s"},!1),d.css({height:i(window).height()}),setTimeout(function(){c.oCss3({transform:"translate3d(0px,0px,0px)","transition-duration":"0.0s"},!1),c.css({right:Math.abs(a)+"px",position:"relative"}),n="right"},500),c.append(u),h.openfn&&h.openfn(l)):0>e&&(c.oCss3({transform:"translate3d("+Math.abs(e)+"px,0px,0px)","transition-duration":"0.3s"},!1),d.css({height:i(window).height()}),setTimeout(function(){c.oCss3({transform:"translate3d(0px,0px,0px)","transition-duration":"0.0s"},!1),c.css({left:Math.abs(e)+"px",position:"relative"}),n="left"},500),c.append(u),h.openfn&&h.openfn(l)),l.addClass("cur")):0===e||0===a?("left"==n?(d.oCss3({transform:"translate3d(100%,0px,0px)","transition-duration":"0s"},!1),d.css({left:"-"+g+"px"}),setTimeout(function(){d.oCss3({transform:"translate3d(0px,0px,0px)","transition-duration":"0.3s"},!1)},10),f&&f.stop().animate({marginLeft:0},300),l.removezz(),h.closefn&&h.closefn(l)):"right"==n&&(d.oCss3({transform:"translate3d(-100%,0px,0px)","transition-duration":"0s"},!1),d.css({right:"-"+g+"px"}),setTimeout(function(){d.oCss3({transform:"translate3d(0px,0px,0px)","transition-duration":"0.3s"},!1)},10),f&&f.stop().animate({marginRight:0},300),l.removezz(),h.closefn&&h.closefn(l)),l.removeClass("cur")):(0>a?(d.oCss3({transform:"translate3d(-100%,0px,0px)","transition-duration":"0.3s",height:i(window).height()+"px"},!1),setTimeout(function(){d.oCss3({transform:"translate3d(0px,0px,0px)","transition-duration":"0s",height:i(window).height()+"px"},!1),d.css({right:"0px"}),n="right"},300),f&&f.stop().animate({marginRight:g},300),c.append(u),h.openfn&&h.openfn(l)):0>e&&(d.oCss3({transform:"translate3d(100%,0px,0px)","transition-duration":"0.3s",height:i(window).height()+"px"},!1),setTimeout(function(){d.oCss3({transform:"translate3d(0px,0px,0px)","transition-duration":"0s",height:i(window).height()+"px"},!1),d.css({left:"0px"}),n="left"},300),f&&f.stop().animate({marginLeft:g},300),c.append(u),h.openfn&&h.openfn(l)),l.addClass("cur"))}),l.init=function(){p?c.attr("style",""):(f&&f.attr("style",""),d.attr("style","")),l.removeClass("cur").removezz()},i(window).resize(function(){l.init()}),l.removezz=function(){u.oCss3({opacity:0,"transition-duration":"0.5s"},!1),setTimeout(function(){u.detach()},500)},u.click(function(){l.click()}),l.allback=function(){p?(c.animate({right:"0px"},300),u.detach(),l.removeClass("cur")):("left"==n?(d.stop().animate({left:"-"+g},300),f.stop().animate({marginLeft:"0px"},300),u.detach()):"right"==n&&(d.stop().animate({right:"-"+g},300),f.stop().animate({marginRight:"0px"},300),u.detach()),l.removeClass("cur"))},l.menuback=function(){p?(c.animate({right:"0px"},300),u.remove(),l.removeClass("cur")):("left"==n?(d.stop().animate({opacity:"0.5"},300,function(){d.css({left:"-"+g,opacity:"1"})}),u.detach()):"right"==n&&(d.stop().animate({opacity:"0.5"},300,function(){d.css({right:"-"+g,opacity:"1"})}),u.detach()),l.removeClass("cur"))},l},i.fn.oAutoH=function(t){var n,o={targetObj:window,inner:!1,callback:function(){},resize:!0,minH:!1},s=i.extend(o,t),e=i(this),a=i(s.targetObj),r=e.parent(),h=e.siblings(".o_fixH"),l=h,c=e.find(".o_H100");return s.inner&&(a=r),e.init=function(){n=a.height(),l.length>0&&l.each(function(){"none"!==i(this).css("display")&&(n-=i(this).height())}),s.minH?e.css({"min-height":n+"px"}):e.css({"min-height":n+"px",height:n+"px"}),c.each(function(){i(this).css("height",n+"px")}),s.callback()},i(window).resize(function(){s.resize&&e.init()}),e},i.fn.oAutoW=function(t){var n,o={obj1:i(this).prev(),obj2:i(this).next(),targetObj:i(this).parent(),callback:function(){},resize:!0},s=i.extend(o,t),e=i(this),a=(s.obj1?i(s.obj1):0,s.obj2?i(s.obj2):0,i(s.targetObj)),r=(e.parent(),e.siblings(".o_fixW")),h=r;return e.init=function(){n=a.width(),h.each(function(){"none"!==i(this).css("display")&&(n-=i(this).width()),e.css({width:n+"px"})}),s.callback()},i(window).resize(function(){s.resize&&e.init()}),e},i.fn.oPicture=function(t){var n,o={sm:544,md:700,lg:992,xl:1200},s=i.extend(o,t),e=i(this),a=s.sm,r=s.md,h=s.lg,l=s.xl,c=e.attr("xs"),u=e.attr("sm"),p=e.attr("md"),f=e.attr("lg"),d=e.attr("xl"),g=e.attr("df"),m=e.attr("ie8");return e.init=function(){return n=i(window).width(),isIe8&&void 0!==m?(e.attr("src",m),!1):void(a>n?void 0===c?e.attr("src",g):e.attr("src",c):n>=a&&r>n?void 0===u?e.attr("src",g):e.attr("src",u):n>=r&&h>n?void 0===p?e.attr("src",g):e.attr("src",p):n>=h&&l>n?void 0===f?e.attr("src",g):e.attr("src",f):n>=l&&(void 0===d?e.attr("src",g):e.attr("src",d)))},i(window).resize(function(){e.init()}),e},i.fn.oInputclear=function(){var t=i(this).attr("autotext");i(this).attr("value",t),i(this).focus(function(){i(this).val()==t&&i(this).attr("value","")}),i(this).blur(function(){""===i(this).attr("value")&&i(this).attr("value",t)})},i.fn.oTextareaclear=function(){var t=i(this).attr("autotext");i(this).html(t),i(this).focus(function(){i(this).html()===t&&i(this).html("")}),i(this).blur(function(){""===i(this).html()&&i(this).html(t)})},i.fn.oSlider=function(t){function n(t){return Math.floor(t)===t}defaults={showBoxClass:"showbox",autoWidth:!1,loop:!1,direction:"none",scrollbar:!1,windowResize:!1,pager:null,touch:!0,speed:!1,pagershow:!1,touchClear:!1,gotofn:null,moveNum:null,playfn:null,btnHobj:null},$p=i.extend(defaults,t),""===$p.showBoxClass,i(this).oCss3({transform:"translateZ(0)"}),i(this).oClear(),i(this).find("ul").oClear(),i(this).find("."+$p.showBoxClass).oClear();var o,s,e,r,h,l=i(this),c=l.find("."+$p.showBoxClass),u=c.find("ul"),p=u.find("li"),f=p.length,d=$p.moveNum,g=null,m=i("<div>"),v=$p.loop,x=$p.scrollbar,w=$p.autoWidth,$=l.find($p.pager),b=!0,C=i("<li></li>"),X=($p.windowResize,$p.touch),M=$p.speed,Y=null,y=!0,T=$p.playfn,z=!1,I=$p.btnHobj;if(p.css("display","inline-block"),u.css({"font-size":"0","white-space":"nowrap",width:"100%",display:"block"}),c.css({overflow:"hidden",position:"relative"}),l.$showAmt=0,l.$i=0,l.$prev=i("<span class='btn_prev'></span>"),l.$next=i("<span class='btn_next'></span>"),u.appendTo(m),m.appendTo(c),v)var k=u.clone(),A=k.find("li"),P=A.clone();if(l.prepend(l.$prev),l.prepend(l.$next),l.oNoSelect(),l.init=function(){if(m.attr("style",""),u.css("margin-left","0"),l.$prev.css({display:"inline-block",position:"absolute"}),l.$next.css({display:"inline-block",position:"absolute"}),e=l.width()-l.$prev.width()-l.$next.width(),r=c.height(),l.$showAmt=Math.round(c.width()/(p.eq(0).width()+parseInt(p.eq(0).css("padding-left"))+parseInt(p.eq(0).css("padding-right")))-.4),l.$i=0,m.css({position:"relative",left:"0px",top:"0px"}),n(M)&&f>l.$showAmt&&isPC&&l.hover(function(){l.stop()},function(){l.play(M)}),f<=l.$showAmt){if(e=l.width(),c.css("width",""),l.$prev.hide(),l.$next.hide(),clearInterval(h),null===d)return X&&null!==Y&&(Y.touchClear(),X=!1),!1}else null!==Y&&(X=!0),b=null===d?f%l.$showAmt!==0:f%d!==0,console.log(f%d),p.attr("style",""),w&&(c.css({width:e+"px"}),l.$prev.css({position:"relative","float":"left"}),l.$next.css({position:"relative","float":"right"}),r=c.height()),null===I?(l.$prev.css({height:r+"px","line-height":r+"px"}),l.$next.css({height:r+"px","line-height":r+"px"})):(l.$prev.css({height:l.find(I).eq(0).height()+"px","line-height":l.find(I).eq(0).height()+"px"}),l.$next.css({height:l.find(I).eq(0).height()+"px","line-height":l.find(I).eq(0).height()+"px"}));if(null===d?s=Math.ceil(f/l.$showAmt):(s=Math.ceil(f/d),g=p.eq(0).width()),v&&!b?(u.find("li").length==f&&(l.removeLi(),l.addLi()),u.css("margin-left","-"+100*s+"%")):(u.find("li").length>f&&l.removeLi(),u.css("margin-left","0px")),$){l.find($).empty();for(var t=0;s>t;t++)if($p.pagershow){var o=C.clone(),x=p.eq(t).html();o.html(x),l.find($).append(o)}else l.find($).append(C.clone());l.find($).find("li").eq(0).addClass("cur")}l.find($).find("li").on("click",function(){var t=l.find($).find("li").index(i(this));l["goto"](t)}),n(M)&&l.play(M),X&&(Y=c.oTouch({touchStart:function(){n(M)&&l.stop()},touchMoveH:function(t){s>1&&(isIe8||isIe9||a?null===g?m.css({left:-l.$i*c.width()+(t.moveX-t.startX)+"px"}):l.$showAmt+l.$i>=f||m.css({left:-l.$i*g+(t.moveX-t.startX)+"px"}):null===g?m.oCss3({transform:"translate3d("+-(l.$i*c.width()+(t.startX-t.moveX))+"px,0px,0px)","transition-duration":"0s"}):l.$showAmt+l.$i>=f||m.oCss3({transform:"translate3d("+-(l.$i*g+(t.startX-t.moveX))+"px,0px,0px)","transition-duration":"0s"}))},touchLeft:function(t){s>1&&(t.startX-t.endX>50&&y?l.next():isIe8||isIe9||a?null===g?m.stop().animate({left:-l.$i*c.width()+"px"},300):m.stop().animate({left:-l.$i*g+"px"},300):null===g?m.oCss3({transform:"translate3d("+-(l.$i*c.width())+"px,0px,0px)","transition-duration":"0.3s"}):m.oCss3({transform:"translate3d("+-(l.$i*g)+"px,0px,0px)","transition-duration":"0.3s"}),t.gotofn&&t.gotofn(l.$i))},touchRight:function(t){s>1&&(t.startX-t.endX<-50&&y?l.pre():isIe8||isIe9||a?null===g?m.stop().animate({left:-l.$i*c.width()+"px"},300):m.stop().animate({left:-l.$i*g+"px"},300):null===g?m.oCss3({transform:"translate3d("+-(l.$i*c.width())+"px,0px,0px)","transition-duration":"0.3s"}):m.oCss3({transform:"translate3d("+-(l.$i*g)+"px,0px,0px)","transition-duration":"0.3s"}),t.gotofn&&t.gotofn(l.$i))},touchEnd:function(){isPC||n(M)&&l.play(M)}})),$p.touchClear&&c.oTouch({clearE:!0})},l.play=function(t){setTimeout(function(){clearInterval(h),h=setInterval(function(){l.next()},t)},500)},l.stop=function(){clearInterval(h)},l.change=function(){p=c.find("li"),f=p.length,u=c.find("ul"),v&&(k=u.clone(),A=k.find("li"),P=A.clone()),l.init()},l["goto"]=function(t){y=!1,v&&!b?(null===g?o=100*-t+"%":(o=-t*g+"px",l.$showAmt+t>=f&&(o=(f-l.$showAmt)/d*g+"px")),l.$i=t,isIe8||isIe9||a?m.stop().animate({left:o},300,function(){}):m.oCss3({transform:"translate3d("+o+",0px,0px)","transition-duration":"0.3s"}),t==s?(u.css("margin-left","-"+100*s+"%"),l.$i=0,setTimeout(function(){isIe8||isIe9||a?m.css({left:100*-l.$i+"%"}):m.oCss3({transform:"translate3d("+100*-l.$i+"%,0px,0px)","transition-duration":"0s"}),y=!0},300),$.find("li").eq(l.$i).addClass("cur").siblings().removeClass("cur"),n(M)&&!isPC&&l.play(M)):-1==t?(u.css("margin-left","-"+100*s+"%"),l.$i=s-1,setTimeout(function(){isIe8||isIe9||a?m.css({left:100*-l.$i+"%"}):m.oCss3({transform:"translate3d("+100*-l.$i+"%,0px,0px)","transition-duration":"0s"}),y=!0},300),$.find("li").eq(l.$i).addClass("cur").siblings().removeClass("cur"),n(M)&&!isPC&&l.play(M)):(n(M)&&!isPC&&l.play(M),$.find("li").eq(l.$i).addClass("cur").siblings().removeClass("cur"),setTimeout(function(){y=!0},200))):(null===g?o=100*t+"%":(o=t*g+"px",l.$showAmt+t>=f&&(o=(f-l.$showAmt)/d*g+"px")),l.$i=t,isIe8||isIe9||a?m.stop().animate({left:"-"+o},300,function(){}):m.oCss3({transform:"translate3d(-"+o+",0px,0px)","transition-duration":"0.3s"}),$.find("li").eq(l.$i).addClass("cur").siblings().removeClass("cur"),setTimeout(function(){y=!0},200)),null!==T&&T({i:t,next:l.$next,prev:l.$prev})},x){var S=i("<div class='scroll'></div>"),_=i("<span></span>");S.append(_)}return l.addLi=function(){z===!1&&(A.appendTo(u),P.appendTo(u),z=!0)},l.removeLi=function(){z===!0&&(A.remove(),P.remove(),z=!1)},l.$prev.click(function(){l.pre()}),l.pre=function(){y&&(l.$i--,v&&!b?l["goto"](l.$i):l.$i<0?(v?l.$i=s-1:l.$i=0,l["goto"](l.$i)):l["goto"](l.$i),$p.gotofn&&$p.gotofn(l.$i))},l.$next.click(function(){l.next()}),l.next=function(){y&&(l.$i++,v&&!b?l["goto"](l.$i):l.$i>s-1?(v?l.$i=0:l.$i=s-1,l["goto"](l.$i)):l["goto"](l.$i),$p.gotofn&&$p.gotofn(l.$i))},l},i.fn.oHrel=function(t){var n,o={resize:!0},s=i.extend(o,t),e=i(this),a=i("."+e.attr("obj"));return e.init=function(){n=a.height(),e.css("height",n+"px")},s.resize&&i(window).resize(function(){e.init()}),e},i.fn.oCss3=function(t,n){var o=i(this),s="",e=["-webkit-","-o-","-moz-"];n===!1&&(s=o.attr("style"));for(var a in t){s+=";"+a+":"+t[a];for(var r=0;r<e.length;r++)s+=";"+e[r]+a+":"+t[a]}o.attr("style",s)},i.fn.oRotate=function(t){var n=i(this);if(isIe8){var o=Math.cos(t),s=-Math.sin(t),e=Math.sin(t),a=Math.cos(t),r=n.width(),h=n.height(),l=(-r/2*Math.cos(t)+h/2*Math.sin(t)+r/2,-r/2*Math.sin(t)-h/2*Math.cos(t)+h/2,n.attr("style"));l+=";filter:progid:DXImageTransform.Microsoft.Matrix(M11="+o+",M12="+s+",M21="+e+",M22="+a+",SizingMethod='auto expand');",n.attr("style",l)}else n.oCss3({transform:"rotate("+t+"deg)"},!1)},i.fn.oPopup=function(t){defaults={obj:"",confirm:".js_confirm",callback:function(){},zz:"<div class='o_shade'></div>",closeFn:function(){},absolute:!1},$p=i.extend(defaults,t);var n,o=i(this),s=i($p.obj),e=i($p.zz),a=s.find($p.confirm),r=s.find(".js_popupClose"),h=$p.callback,l=$p.closeFn,c=$p.absolute;return c&&s.addClass("absolute"),o.on("click",function(){e.appendTo(i(".o_body")).addClass("show"),s.show().addClass("show"),a.length>0&&(a.off(),a.on("click",function(){r.click(),h(i(this),o)})),o.init()}),r.on("click",function(){s.addClass("hide"),e.removeClass("show"),setTimeout(function(){e.detach(),s.removeClass("hide").removeClass("show").hide(),l(s)},300)}),o.init=function(){var t=i(window).height(),o=i(document).height(),e=i(window).scrollTop(),a=s.height();c?t>=a?(n=e+(t-a)/2,s.css("top",n)):e+a+30>o?(e=o-(a+60),i("html,body").animate({scrollTop:e},200),n=e+30,s.css("top",n).addClass("absolute")):(n=e+30,s.css("top",n)):t>=a?(n=(t-a)/2,s.css("top",n).removeClass("absolute")):e+a+30>o?(e=o-(a+60),i("html,body").animate({scrollTop:e},200),n=e+30,s.css("top",n).addClass("absolute")):(n=e+30,s.css("top",n).addClass("absolute"))},isPC&&i(window).resize(function(){o.init()}),o},i.fn.oNoSelect=function(){isIe?isPC&&(i(this).on("selectstart",function(){return!1}),i(this).on("drag",function(){return!1})):i(this).oCss3({"user-select":"none"},!1)},i.fn.oCutImg=function(t){defaults={imgurl:[],showimg:"",min:50,windowResize:!0},$p=i.extend(defaults,t);var n,o,s,e,a,r,h,l,c,u,p,f=i(this),d=$p.imgurl,g=$p.min,m=i($p.showimg),v=i("<div class='o_cutimgbox'>"),x=i("<div class='bgbox'>"),w=i("<div class='imgbox'>"),$=i("<div class='cutbox'>"),b=i("<div class='box'>"),C=i("<div class='controlbox'>"),X=i("<div class='control'>"),M=i("<div class='resize'>"),Y=i("<img>"),y=f.height(),T=f.width(),z=e,I=0;Y.attr("src",d[0]);var k=Y.clone(!0);return f.changeImg=function(t){I=0,d=t,Y.attr("src",d[0]),k.attr("src",d[0])},f.rotate=function(){I++,I>3&&(I=0),Y.attr("src",d[I]),k.attr("src",d[I])},f.reset=function(){Y.appendTo(w),w.appendTo(x),k.appendTo(b),b.appendTo($),M.appendTo(X),X.appendTo(C),v.append(x).append($).append(C),f.append(v),w.attr("style",""),k.attr("style",""),w.attr("style",""),Y.attr("style",""),n=k.height(),s=Y.width(),o=Y.height(),Y.height()>f.height()&&(o=f.height(),w.height(o),Y.height(o),k.height(o),s=Y.width()),c=s>=o?"width":"height",isIe&&(Y.attr("style",""),w.attr("style",""),"height"==c?Y.height()>y&&(Y.height(y),w.css({height:Y.height(),width:"auto"})):"width"==c&&Y.width()>T&&(Y.width(T),w.css({width:Y.width(),height:"auto"})),s=Y.width(),o=Y.height()),e=s-o>0?o:s,e=e<X.width()?e:X.width(),z=e,a=-Math.round((s-e)/2),r=-Math.round((o-e)/2),k.css({width:s,height:o,left:a,top:r}),isIe8?(w.css({width:s,height:o}),$.css({width:s,height:o,"margin-left":-Math.floor(s/2),"margin-top":-Math.floor(o/2)}),C.css({width:s,height:o,"margin-left":-Math.floor(s/2),"margin-top":-Math.floor(o/2)})):(w.css({width:s,height:o}),$.css({width:s,height:o,"margin-left":-Math.round(s/2),"margin-top":-Math.floor(o/2)}),C.css({width:s,height:o,"margin-left":-Math.round(s/2),"margin-top":-Math.floor(o/2)})),h=Math.round((s-e)/2),l=Math.round((o-e)/2),X.css({width:e,height:e,left:h,top:l}),b.css({width:e,height:e,left:h,top:l}),"width"==c?u=o/e:"height"==c&&(u=s/e),m.each(function(){var t=i(this).parent().width()/e;i(this).parent().css({position:"relative",overflow:"hidden","-webkit-transform":"translateZ(0)","-webkit-backface-visiblity":"hidden"}),"width"==c?i(this).attr("src",d[I]).css({position:"absolute",height:i(this).parent().width()*u,width:"auto",left:-h*t,top:-l*t}):"height"==c&&i(this).attr("src",d[I]).css({position:"absolute",width:i(this).parent().width()*u,height:"auto",left:-h*t,top:-l*t})})},X.oTouch({touchStart:function(){},touchMove:function(t){h+(t.moveX-t.startX)>=0&&h+(t.moveX-t.startX)<=s-e?(b.css({left:h+(t.moveX-t.startX)}),X.css({left:h+(t.moveX-t.startX)}),k.css({left:a-(t.moveX-t.startX)})):h+(t.moveX-t.startX)<0?(k.css({left:0}),b.css({left:0}),X.css({left:0})):h+(t.moveX-t.startX)>s-e&&(k.css({left:e-s}),b.css({left:s-e}),X.css({left:s-e})),l+(t.moveY-t.startY)>=0&&l+(t.moveY-t.startY)<=o-e?(k.css({top:r-(t.moveY-t.startY)}),b.css({top:l+(t.moveY-t.startY)}),X.css({top:l+(t.moveY-t.startY)})):l+(t.moveY-t.startY)<0?(k.css({top:0}),b.css({top:0}),X.css({top:0})):l+(t.moveY-t.startY)>o-e&&(k.css({top:e-o}),b.css({top:o-e}),X.css({top:o-e})),m.each(function(){i(this).css({left:k.position().left*(i(this).width()/k.width()),top:k.position().top*(i(this).width()/k.width())})})},touchEnd:function(t){h=X.position().left,l=X.position().top,a=k.position().left,r=k.position().top},clearE:!0}),M.oTouch({touchStart:function(t){},touchMove:function(t){var n=Math.abs(t.moveX-t.startX)>Math.abs(t.moveY-t.startY)?t.moveX-t.startX:t.moveY-t.startY;s>=e+n+h&&o>=e+n+l&&e+n>=g?(X.css({width:e+n,height:e+n}),b.css({width:e+n,height:e+n})):e+n+h>s&&o>=e+n+l?(X.css({width:s-h,height:s-h}),b.css({width:s-h,height:s-h})):e+n+l>o&&s>=e+n+h?(X.css({width:o-l,height:o-l}),b.css({width:o-l,height:o-l})):g>e+n&&(X.css({width:g,height:g}),b.css({width:g,height:g})),"width"==c?u=s/X.width():"height"==c&&(u=o/X.height()),m.each(function(){var t=i(this).parent().width()/X.width();"width"==c?i(this).css({width:i(this).parent().width()*u,height:"auto",left:k.position().left*t,top:k.position().top*t}):"height"==c&&i(this).css({height:i(this).parent().width()*u,width:"auto",left:k.position().left*t,top:k.position().top*t})})},touchEnd:function(){e=X.width()},clearE:!0}),f.init=function(){Y.load(function(){f.reset()})},$p.windowResize&&i(window).resize(function(){f.reset()}),f.cut=function(){var t=n/Y.height();return p={url:d[I]+"",x:Math.floor(X.position().left*t),y:Math.floor(X.position().top*t),width:Math.floor(X.height()*t)}},f},i.fn.oTouch=function(t){function n(t){var n=t.originalEvent.targetTouches[0];r=n.pageX,h=n.pageY,d({self:f,startX:r,startY:h}),X=!1}function o(t){M&&(t.stopPropagation(),t.preventDefault());var n=t.originalEvent.targetTouches[0];u=n.pageX,p=n.pageY,null!==g&&(g({self:f,startX:r,startY:h,moveX:u,moveY:p}),X=!0),null!==m&&Math.abs(u-r)>Math.abs(p-h)&&Math.abs(u-r)>1&&(m({self:f,startX:r,startY:h,moveX:u,moveY:p}),t.stopPropagation(),t.preventDefault(),X=!0),null!==v&&Math.abs(u-r)<Math.abs(p-h)&&Math.abs(p-h)>1&&(v({self:f,startX:r,startY:h,moveX:u,moveY:p}),t.stopPropagation(),t.preventDefault(),X=!0)}function s(t){var n=t.originalEvent.changedTouches[0];l=n.pageX,c=n.pageY,X&&(X=!1,-1>r-l&&w({self:f,startX:r,endX:l,startY:h,endY:c}),r-l>1&&x({self:f,startX:r,endX:l,startY:h,endY:c}),h-c>1&&$({self:f,startX:r,endX:l,startY:h,endY:c}),-1>h-c&&b({self:f,startX:r,endX:l,startY:h,endY:c}),C({self:f,startX:r,endX:l,startY:h,endY:c}))}function e(t){u=t.pageX,p=t.pageY,(u-r>10||-10>u-r)&&f.on("click",function(){return!1}),null!==g&&(g({self:f,startX:r,startY:h,moveX:u,moveY:p}),t.stopPropagation(),t.preventDefault(),X=!0),null!==m&&Math.abs(u-r)>Math.abs(p-h)&&Math.abs(u-r)>10&&(m({self:f,startX:r,startY:h,moveX:u,moveY:p}),t.stopPropagation(),t.preventDefault(),X=!0),null!==v&&Math.abs(u-r)<Math.abs(p-h)&&Math.abs(p-h)>10&&(v({self:f,startX:r,startY:h,moveX:u,moveY:p}),t.stopPropagation(),t.preventDefault(),X=!0)}function a(t){i("body,html").off("mousemove"),i("body,html").off("mouseup"),l=t.pageX,c=t.pageY,-1>r-l&&w({self:f,startX:r,endX:l,startY:h,endY:c}),r-l>1&&x({self:f,startX:r,endX:l,startY:h,endY:c}),h-c>1&&$({self:f,startX:r,endX:l,startY:h,endY:c}),-1>h-c&&b({self:f,startX:r,endX:l,startY:h,endY:c}),C({self:f,startX:r,endX:l,startY:h,endY:c}),setTimeout(function(){f.off("click")},10)}defaults={clearE:!1,touchStart:function(){},touchMove:null,touchMoveH:null,touchMoveV:null,touchLeft:function(){},touchRight:function(){},touchUp:function(){},touchDown:function(){},touchEnd:function(){}},t=i.extend(defaults,t);var r,h,l,c,u,p,f=i(this),d=t.touchStart,g=t.touchMove,m=t.touchMoveH,v=t.touchMoveV,x=t.touchLeft,w=t.touchRight,$=t.touchUp,b=t.touchDown,C=t.touchEnd,X=!0,M=t.clearE;return f.length&&(isPC?f.on("mousedown",function(t){return r=t.pageX,h=t.pageY,d({self:f,startX:r,startY:h}),i("body,html").bind("mousemove",function(t){return e(t),!1}),i("body,html").bind("mouseup",function(t){return a(t),!1}),!1}):(f.on("touchstart",function(t){n(t)}),f.on("touchmove",function(t){o(t)}),f.on("touchend",function(t){s(t)}))),f.touchClear=function(){isPC?f.off("mousedown"):(f[0].removeEventListener("touchstart",n,!1),f[0].removeEventListener("touchmove",o,!1),f[0].removeEventListener("touchend",s,!1))},f},i.fn.oToggle=function(t,n){var o=i(this);return o.on("click",function(){return"0"===o.attr("auto")||void 0===o.attr("auto")?(t(o),o.attr("auto","1")):"1"==o.attr("auto")&&(n(o),o.attr("auto","0")),!1}),o},i.fn.oToggleAll=function(t){defaults={fn1:function(){},fn2:function(){},target:"",door:function(){return!0}},$p=i.extend(defaults,t);var n=i(this),o=$p.target,s=$p.fn1,e=$p.fn2,a=$p.door;n.on("click",o,function(){if(a()){var t=i(this).attr("auto");"0"===t||void 0===t?(s(i(this)),i(this).attr("auto","1")):"1"===t&&(e(i(this)),i(this).attr("auto","0"))}})},i.fn.oScrollGoto=function(t){defaults={spped:1e3,count:0,beforefn:null,afterfn:null,door:null,doorclass:null},t=i.extend(defaults,t);var n,o=i(this),s=i("."+o.attr("target")),e=t.speed,a=t.count,r=t.afterfn,h=t.beforefn,l=t.timeout,c=i("."+t.door),u=t.doorclass;return o.on("click",function(){n=s.offset().top+a,null!==h?null!==u&&(c.hasClass(u)?(h(),setTimeout(function(){o["goto"]()},l)):(h(),o["goto"]())):o["goto"]()}),o["goto"]=function(){i("html,body").animate({scrollTop:n},e),setTimeout(function(){null!==r&&r()},l)},o},i.fn.oScrollFn=function(t){defaults={upFn:function(){},downFn:function(){}},t=i.extend(defaults,t);var o=i(this),s=t.upFn,e=t.downFn,a="onmousewheel"in n?"mousewheel":"DOMMouseScroll";o.scrollfun=function(t){ev=t.originalEvent,d=parseInt(ev.wheelDelta||-ev.detail),d>0?s():e(),t.stopPropagation(),t.preventDefault()},i.event.add(o[0],a,o.scrollfun)},i.fn.oScrollBar=function(t){var n={step:50,surplus:7,vShowBar:!0,vPScroll:!0};t=i.extend(n,t);var o,s,e,a,r,h=i(this),l=h.parent(),c=i("<div class='o_scrollWin'>"),u=i("<div class='o_scrollbody'>"),p=i("<div class='o_barbox'>"),f=i("<span>"),d=t.step,g=i("<div class='o_bar'>"),m=0,v=1,x=0;return g.appendTo(p),f.appendTo(p),p.appendTo(c),h.appendTo(u),u.appendTo(c),c.appendTo(l),h.init=function(){x=0,g.css("top",x+"px"),u.css("margin-top",x),c.css("padding-right",p.width()+"px"),o=c.height(),s=u.height(),a=p.height(),v=a/s,m=s-o,e=p.height()/Math.max(s/o,1),g.css("height",e+"px"),0>=m?p.hide():p.show()},isPC?(h.scrollDown=function(){s>o&&(r=x-d,-r+o>s&&(r=o-s),x=r,g.css("top",-r*v+"px"),u.css("margin-top",r))},h.scrollUp=function(){s>o&&(r=x+d,r>0&&(r=0),x=r,g.css("top",-r*v+"px"),u.css("margin-top",r))},c.oScrollFn({upFn:function(){h.scrollUp()},downFn:function(){h.scrollDown()}})):u.oTouch({touchMove:function(t){r=x+(t.moveY-t.startY),r>0?r=0:-r+o>s&&(r=o-s),x=r,g.css("top",-r*v+"px"),u.css("margin-top",r)},clearE:!0}),g.oTouch({touchStart:function(){},touchMove:function(t){moveH=t.moveY-t.startY,r=x-moveH/v,r>0?r=0:-r+o>s&&(r=o-s),u.css("margin-top",r),g.css("top",-r*v+"px")},touchEnd:function(){x=r},clearE:!0}),h},i.fn.oHoverMove=function(t){function n(t){a=t.pageX,r=t.pageY,p({self:c,startX:s,startY:e,moveX:a,moveY:r})}function o(t){h=t.pageX,l=t.pageY,f({self:c,startX:s,startY:e,leaveX:h,leaveY:l})}defaults={clearE:!1,mouseStart:function(){},mouseMove:function(){},mouseLeave:function(){}},t=i.extend(defaults,t);var s,e,a,r,h,l,c=i(this),u=t.mouseStart,p=t.mouseMove,f=t.mouseLeave;c.on("mouseenter",function(t){s=t.pageX,e=t.pageY,u({self:c,startX:s,startY:e}),c.bind("mousemove",function(t){return n(t),!1}),c.bind("mouseleave",function(t){o(t),c.off("mousemove"),c.off("mouseleave")})})},i.fn.oBgCover=function(){var t=i(this),n=t.parent();return n.css({position:"relative",overflow:"hidden"}),t.init=function(){t.css({width:"auto",height:"auto"});var i=n.width(),o=n.height(),s=t.width(),e=t.height();0===s?t.load(function(){var i=n.width(),o=n.height(),s=t.width(),e=t.height();return i/s>o/e?(t.css({width:i+"px",height:"auto",position:"absolute"}),t.css({"margin-left":-t.width()/2+"px",left:"50%",top:"50%","margin-top":-t.height()/2+"px"})):(t.css({height:o+"px",width:"auto",position:"absolute"}),t.css({"margin-left":-t.width()/2+"px",left:"50%",top:"50%","margin-top":-t.height()/2+"px"})),!1}):i/s>o/e?(t.css({width:i+"px",height:"auto",position:"absolute"}),t.css({"margin-left":-t.width()/2+"px",left:"50%",top:"50%","margin-top":-t.height()/2+"px"})):(t.css({height:o+"px",width:"auto",position:"absolute"}),t.css({"margin-left":-t.width()/2+"px",left:"50%",top:"50%","margin-top":-t.height()/2+"px"}))},isPC&&i(window).resize(function(){t.init()}),t},i.fn.oBoxCenter=function(){var t=i(this),n=t.parent();return t.init=function(){var i=t.width(),o=t.height();n.css("position","relative"),t.css({position:"absolute",top:"50%",left:"50%","margin-top":-o/2+"px","margin-left":-i/2+"px"})},isPC&&i(window).resize(function(){t.init()}),t},i.fn.oScale=function(t){defaults={w:1,h:1,base:"width"},t=i.extend(defaults,t);var n,o,s=i(this),e=t.w,a=t.h,r=t.base;return s.attr("w")&&(e=parseInt(s.attr("w"))),s.attr("h")&&(a=parseInt(s.attr("h"))),s.attr("base")&&(r=s.attr("base")),s.init=function(){"width"==r?(n=s.width(),o=Math.round(n/e*a),s.css("height",o+"px")):"height"===r&&(o=s.height(),n=Math.round(o/a*e),s.css("width",n+"px"))},isPC&&i(window).resize(function(){s.init()}),s}}(window,document,jQuery),$().ready(function(){$(".o_autoH").each(function(){$(this).oAutoH().init()}),$(".o_main").oAutoH({minH:!0}).init(),$(".o_autoW").each(function(){$(this).oAutoW().init()}),$(".o_input").each(function(){$(this).oInputclear()}),$(".o_textarea").each(function(){$(this).oTextareaclear()}),isIe&&$(".o_noselect").each(function(){$(this).oNoSelect()}),$(".o_g").oClear(),$(".o_main").oClear(),$(".o_autoH").oClear()});