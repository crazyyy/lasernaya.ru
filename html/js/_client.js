"use strict";function _typeof2(i){return(_typeof2="function"==typeof Symbol&&"symbol"===_typeof2(Symbol.iterator)?function(t){function i(i){return t.apply(this,arguments)}return i.toString=function(){return t.toString()},i}(function(i){return void 0===i?"undefined":_typeof2(i)}):function(t){function i(i){return t.apply(this,arguments)}return i.toString=function(){return t.toString()},i}(function(i){return i&&"function"==typeof Symbol&&i.constructor===Symbol&&i!==Symbol.prototype?"symbol":void 0===i?"undefined":_typeof2(i)}))(i)}function _typeof(i){return(_typeof="function"==typeof Symbol&&"symbol"==_typeof2(Symbol.iterator)?function(i){return void 0===i?"undefined":_typeof2(i)}:function(i){return i&&"function"==typeof Symbol&&i.constructor===Symbol&&i!==Symbol.prototype?"symbol":void 0===i?"undefined":_typeof2(i)})(i)}flexbe_cli.block.register(10,{onLoad:function(){var t=this;if(flexbe_cli.is_admin){this.$map=$(".component-map",this.$block),this.data=this.$map.data("data");var e=this.$map[0].offsetHeight;clearInterval(this.timer),this.timer=setInterval(function(){var i=t.$map[0].offsetHeight;i!=e&&(e=i,t.$map.trigger("resizeMap"))},100)}}}),flexbe_cli.block.register(102,{onLoad:function(){this.fixHeight()},onUpdate:function(i){i.templateRendered&&this.fixHeight()},fixHeight:function(){if(!(window.innerWidth<=768)){var e=0,i=this.$block.find(".item-title");i.css("min-height",""),i.each(function(i,t){e=Math.max($(t).outerHeight(),e)}),i.css("min-height",e+"px")}}}),flexbe_cli.block.register(103,{onLoad:function(){var i=this;this.fixWidth();var t=0;$(window).off("resize."+this.id).on("resize."+this.id,function(){clearTimeout(t),t=setTimeout(i.fixWidth.bind(i),250)})},fixWidth:function(){if(!(window.innerWidth<=768)){var i=this.$block.find(".table"),t=i.data("size")+1,e=i.innerWidth();i.find(".td").css("width",e/t+"px")}}}),flexbe_cli.block.register(104,{onLoad:function(){var i=this;this.fixWidth();var t=0;$(window).off("resize."+this.id).on("resize."+this.id,function(){clearTimeout(t),t=setTimeout(i.fixWidth.bind(i),250)})},onScreen:function(i){i&&this.fixWidth()},fixWidth:function(){if(!(window.innerWidth<=768)){var i=this.$block.find(".table"),t=i.find(".row"),s=[];i.find(".td").css("width",""),t.each(function(i,t){var e=$(t).find("> .td");0===i&&e.each(function(i,t){void 0===s[i]&&(s[i]=$(t).outerWidth().toString()+"px")}),e.each(function(i,t){$(t).css("width",s[i])})})}}}),flexbe_cli.block.register(106,{require:["/js//swiper.v4.js"],onLoad:function(i){var t=this,e=t.$block.find(".slider-main"),s=t.$block.find(".slider-preview"),n=t.$block.find(".slider-button"),a=e.data("count");1!=a&&(t.current=Math.floor(t.$block.data("slide-move"))||0,t.current>=a&&(t.current=a-1),t.current<0&&(t.current=0),t.swiper=new Swiper(e[0],{wrapperClass:"slider",slideClass:"slide",noSwipingClass:"redactor-box",navigation:{prevEl:n[0],nextEl:n[1]},touchMoveStopPropagation:!0,preventClicksPropagation:!0,preventClicks:!0,spaceBetween:15,autoHeight:!0,initialSlide:t.current,on:{init:function(){var i=this;flexbe_cli.is_admin&&(this.update(),setTimeout(function(){return i.update()},200),setTimeout(function(){return i.update()},1e3),setTimeout(function(){return i.update()},3e3))},slideChange:function(){t.current=this.activeIndex,t.setCurrent()}}}),this.preview=new Swiper(s[0],{wrapperClass:"slider",slideClass:"slide",touchMoveStopPropagation:!0,preventClicksPropagation:!0,preventClicks:!0,slidesPerView:"auto",spaceBetween:0,slideToClickedSlide:!0,initialSlide:this.current,on:{tap:function(){void 0!==this.clickedIndex&&(t.current=this.clickedIndex,t.setCurrent())}}}),i&&"items_add"===i.reason&&(this.swiper.slideTo(i.reasonData.to),this.preview.slideTo(i.reasonData.to)),t.setCurrent())},setCurrent:function(){this.swiper&&this.swiper.slideTo(this.current||0),this.preview&&this.preview.slideTo(Math.max(this.current-1,0)),this.$block.data("slide-move",this.current),this.$block.find(".slide").removeClass("active").closest('[data-item-id="'+(this.current+1)+'"]').addClass("active")},onUpdate:function(i){i.styleRendered&&this.swiper&&this.swiper.update(!1)}}),flexbe_cli.block.register(107,{require:["/js//swiper.v4.js"],onLoad:function(i){var t=this,e=this.$block.find(".slider-main"),s=this.$block.find(".slider-button"),n=this.$block.find(".slider-pagination"),a=e.data("count"),r=e.data("slider");a<=4||!r||(this.current=Math.floor(this.$block.data("slide-move"))||0,this.current>=a&&(this.current=a-1),this.current<0&&(this.current=0),this.swiper=new Swiper(e[0],{wrapperClass:"slider",slideClass:"slide",noSwipingClass:"redactor-box",navigation:{prevEl:s[0],nextEl:s[1]},pagination:{el:n[0],type:"bullets",clickable:!0},touchMoveStopPropagation:!0,preventClicksPropagation:!0,preventClicks:!0,spaceBetween:0,initialSlide:this.current,simulateTouch:!flexbe_cli.is_admin,on:{slideChange:function(){t.current=this.activeIndex,t.$block.data("slide-move",this.activeIndex)}}}),i&&"items_add"===i.reason&&this.swiper.slideTo(i.reasonData.to))}}),flexbe_cli.block.register(111,{mapInit:!1,index:!1,onLoad:function(){var i=this;this.$map=$(".component-map",this.$block),this.$map.length?this.initMap():setTimeout(function(){i.onLoad()},50)},initMap:function(){var e=this;if(this.data=this.$map.data("data"),this.$map.on("mapInit",function(){e.mapInit=!0,e.selectMark(e.index||0,!0)}),this.$block.find(".tab-list").on("click","a",function(i){var t=parseInt($(i.currentTarget).closest(".tab").attr("data-item-id"),10)-1;e.selectMark(t)}),this.$map.on("balloonOpen",function(i,t){e.selectMark(t)}),flexbe_cli.is_admin){var t=this.$map[0].offsetHeight;clearInterval(this.timer),this.timer=setInterval(function(){var i=e.$map[0].offsetHeight;i!=t&&(t=i,e.$map.trigger("resizeMap"))},100)}},selectMark:function(i,t){void 0===t&&(t=!1);var e=this.data.places[i];if(e&&(this.index!=i||t)){this.index=i;var s=this.$block.find(".tab-list"),n=this.$block.find(".item-list");s.find(".active").removeClass("active"),n.find(".active").removeClass("active"),s.find('[data-item-id="'+(this.index+1)+'"]').addClass("active"),n.find('[data-item-id="'+(this.index+1)+'"]').addClass("active"),this.data.center=e.coords,this.$map.trigger("selectMark",this.index)}}}),flexbe_cli.block.register(112,{onLoad:function(){if($(".grid.expanded",this.$block).length){var n=$(".item",this.$block),i=flexbe_cli.is_admin?".expand-button":".item-title";$(i,n).on("click",function(i){var t=$(i.currentTarget).parents(".item"),e=t.find(".item-desc").get(0),s=t.find(".desc").outerHeight(!0);flexbe_cli.is_admin||(n.not(t).addClass("collapsed"),e.style.cssText=s?"max-height: "+s+"px":"max-height: none"),t.toggleClass("collapsed")})}}}),flexbe_cli.block.register(117,{onLoad:function(){var t=this;if(this.$map=$(".component-map",this.$block),this.data=this.$map.data("data"),flexbe_cli.is_admin){var e=this.$map[0].offsetHeight;clearInterval(this.timer),this.timer=setInterval(function(){var i=t.$map[0].offsetHeight;i!=e&&(e=i,t.$map.trigger("resizeMap"))},100)}}}),flexbe_cli.block.register(118,{onLoad:function(){}}),flexbe_cli.block.register(46,{onLoad:function(){this.$block.find(".overlayed")[0]&&this.$block.on("mouseover mouseout",".item",function(i){var t=$(i.currentTarget),e=t.find(".overlay");if(t.toggleClass("hover","mouseover"===i.type),"mouseover"===i.type){var s=parseInt(e.find(".img-title").outerHeight(!0)||0,10),n=parseInt(e.find(".img-desc").outerHeight(!0)||0,10),a=parseInt(e.find(".img-text").outerHeight(!0)||0,10);e.css("minHeight",40+s+n+a+"px")}else e.attr("style","")})}}),flexbe_cli.block.register(48,{require:["/js//swiper.v4.js"],onLoad:function(i){var t=this,e=this.$block.find(".slider-main"),s=this.$block.find(".slider-button"),n=this.$block.find(".slider-pagination"),a=e.data("count");a<=1||!e[0]||(this.slideshow=!flexbe_cli.is_admin&&Math.floor(1e3*e.data("slideshow"))||0,this.current=Math.floor(this.$block.data("slide-move"))||0,this.current=Math.max(0,Math.min(a-1,this.current)),this.swiper=new Swiper(e[0],{wrapperClass:"slider",slideClass:"slide",noSwipingClass:"redactor-box",navigation:{prevEl:s[0],nextEl:s[1]},pagination:{el:n[0],type:"bullets",clickable:!0},touchMoveStopPropagation:!1,preventClicksPropagation:!0,preventClicks:!0,simulateTouch:!flexbe_cli.is_admin,speed:650,slidesPerView:3,slidesPerGroup:3,spaceBetween:0,autoHeight:!1,threshold:10,initialSlide:this.current,autoplay:this.slideshow&&{delay:this.slideshow},breakpoints:{768:{slidesPerView:1,slidesPerGroup:1,speed:350}},on:{slideChange:function(){t.current=this.activeIndex,t.setCurrent()}}}),i&&"items_add"===i.reason&&this.swiper.slideTo(i.reasonData.to))},setCurrent:function(){this.$block.data("slide-move",this.current)},onFocus:function(i){this.swiper&&this.swiper.autoplay&&this.slideshow&&(i?this.swiper.autoplay.run():this.swiper.autoplay.pause())},onUpdate:function(i){i.styleRendered&&this.swiper&&this.swiper.update(!1)}}),flexbe_cli.block.register(49,{onLoad:function(){var i=this;this.$fluid=this.$block.find(".container-fluid"),this.$list=this.$block.find(".item-list"),this.$items=this.$block.find(".item");var t={cols:3,margin:this.$list.data("margin")};this.loadImages(function(){return i.render(t)}),$(window).off("resize.b"+this.id).on("resize.b"+this.id,function(){return i.render(t,200)})},tmt:0,render:function(s,i,c){var d=this;void 0===i&&(i=0),void 0===c&&(c=!1),clearTimeout(this.tmt),this.tmt=setTimeout(function(){if($(window).width()<767)return d.$list.removeAttr("style"),d.$fluid.removeAttr("style"),d.$items.removeAttr("style"),!1;var i,n,a,t,r,o=0,l=[];t=parseInt(s.cols||3),i=d.$list.outerWidth(),n=parseInt(s.margin||0,10),a=parseInt(i/t,10)-n,r=1==t?-n/2:i%(a+n)/2;for(var e=0;e<t;e++)l.push(-n/2);d.$items.each(function(i,t){var e=$(t),s=d.getColumn(l);e.css({position:"absolute",width:a,margin:n/2,top:l[s]+n/2,left:(a+n)*s+r}),l[s]+=e.outerHeight()+n,o<l[s]&&(o=l[s])}),o&&d.$list.css("min-height",o+parseInt(n/2,10)+"px"),c||d.render(s,1e3,!0)},i)},loadImages:function(s){void 0===s&&(s=function(){});var i=this.$items.find("img"),n=i.length-1;0===n&&s(),i.each(function(i,t){var e=new Image;e.onload=e.onerror=function(){return 0<n?n--:s()},e.src=t.src})},getColumn:function(i){var t;return 0<(t=$.inArray(Math.min.apply(Math,i),i))&&i[t-1]-i[t]<20?t--:0<t&&i[0]-i[t]<20&&(t=0),t}}),flexbe_cli.block.register(69,{onLoad:function(){flexbe_cli.run.is_mobile&&this.$block.find(".parallax").removeClass("parallax")}}),flexbe_cli.block.register(70,{require:["/js//swiper.v4.js"],onLoad:function(i){var t=this,e=t.$block.find(".slider-main"),s=t.$block.find(".slider-button"),n=t.$block.find(".slider-pagination"),a=e.data("count"),r=e.data("slider");a<=2||!r||(t.current=Math.floor(t.$block.data("slide-move"))||0,i&&"items_add"===i.reason&&(t.current=i.reasonData.to),t.current>=a&&(t.current=a-1),t.current<0&&(t.current=0),t.swiper=new Swiper(e.find(".slider-wrapper")[0],{wrapperClass:"slider",slideClass:"slide",noSwipingClass:"fr-element",navigation:{prevEl:s[0],nextEl:s[1]},pagination:{el:n[0],type:"bullets",clickable:!0},simulateTouch:!flexbe_cli.is_admin,touchMoveStopPropagation:!0,preventClicksPropagation:!0,preventClicks:!0,speed:450,slidesPerView:2,slidesPerGroup:2,spaceBetween:20,autoHeight:!flexbe_cli.is_admin,initialSlide:t.current,breakpoints:{768:{speed:350,slidesPerView:1,slidesPerGroup:1}},on:{slideChange:function(){t.current=this.activeIndex,t.$block.data("slide-move",this.activeIndex)}}}))},onUpdate:function(i){i.styleRendered&&this.swiper&&this.swiper.update(!1)}}),flexbe_cli.block.register(71,{require:["/js//swiper.v4.js"],onLoad:function(i){var t=this,e=t.$block.find(".slider-main"),s=t.$block.find(".slider-button"),n=t.$block.find(".slider-pagination"),a=e.data("count");1!=a&&(t.slideshow=!flexbe_cli.is_admin&&Math.floor(1e3*e.data("slideshow"))||0,t.current=Math.floor(t.$block.data("slide-move"))||0,t.current>=a&&(t.current=a-1),t.current<0&&(t.current=0),t.swiper=new Swiper(e[0],{wrapperClass:"slider",slideClass:"slide",noSwipingClass:"redactor-box",navigation:{prevEl:s[0],nextEl:s[1]},pagination:{el:n[0],type:"bullets",clickable:!0},simulateTouch:!flexbe_cli.is_admin,touchMoveStopPropagation:!0,preventClicksPropagation:!0,preventClicks:!0,paginationClickable:!0,speed:450,spaceBetween:0,autoHeight:!1,initialSlide:t.current,loop:!1,autoplay:t.slideshow&&{delay:t.slideshow},on:{init:function(){$(".swiper-slide-duplicate .img-popup",this.$wrapperEl).on("click",function(i){var t=$(i.currentTarget).parents(".swiper-slide-duplicate");$(".img-popup",t.siblings(".slide[data-swiper-slide-index="+t.attr("data-swiper-slide-index")+"]")).trigger("click"),i.preventDefault()})},slideChange:function(){t.current=this.activeIndex,t.setCurrent()}}}),i&&"items_add"===i.reason&&this.swiper.slideTo(i.reasonData.to))},setCurrent:function(){this.$block.data("slide-move",this.current)},onFocus:function(i){this.swiper&&this.swiper.autoplay&&this.slideshow&&(i?this.swiper.autoplay.run():this.swiper.autoplay.pause())},onUpdate:function(i){i.styleRendered&&this.swiper&&this.swiper.update(!1)}}),flexbe_cli.block.register(72,{require:["/js//swiper.v4.js"],onLoad:function(i){var t=this,e=t.$block.find(".slider-main"),s=t.$block.find(".slider-button"),n=t.$block.find(".slider-pagination"),a=e.data("count");1!=a&&(t.slideshow=!flexbe_cli.is_admin&&Math.floor(1e3*e.data("slideshow"))||0,t.current=Math.floor(t.$block.data("slide-move"))||0,t.current>=a&&(t.current=a-1),t.current<0&&(t.current=0),t.swiper=new Swiper(e[0],{wrapperClass:"slider",slideClass:"slide",noSwipingClass:"redactor-box",navigation:{prevEl:s[0],nextEl:s[1]},pagination:{el:n[0],type:"bullets",clickable:!0},simulateTouch:!flexbe_cli.is_admin,touchMoveStopPropagation:!0,preventClicksPropagation:!0,paginationClickable:!0,preventClicks:!0,speed:450,spaceBetween:0,autoHeight:!1,initialSlide:t.current,loop:!1,autoplay:t.slideshow&&{delay:t.slideshow},on:{init:function(){$(".swiper-slide-duplicate .img-popup",this.$wrapperEl).on("click",function(i){var t=$(i.currentTarget).parents(".swiper-slide-duplicate");$(".img-popup",t.siblings(".slide[data-swiper-slide-index="+t.attr("data-swiper-slide-index")+"]")).trigger("click"),i.preventDefault()})},slideChange:function(){t.current=this.activeIndex,t.setCurrent()}}}),i&&"items_add"===i.reason&&this.swiper.slideTo(i.reasonData.to))},setCurrent:function(){this.$block.data("slide-move",this.current)},onFocus:function(i){this.swiper&&this.swiper.autoplay&&this.slideshow&&this.swiper.autoplay[i?"start":"stop"]()},onUpdate:function(i){i.styleRendered&&this.swiper&&this.swiper.update(!1)}}),flexbe_cli.block.register(74,{onLoad:function(){this.form=flexbe_cli.form.create({id:this.id,block:this.$block,form:".component-form"}),this.form.customize()}}),flexbe_cli.block.register(75,{require:["/js//swiper.v4.js"],onLoad:function(i){var t=this,e=this.$block.find(".slider-main"),s=this.$block.find(".slider-button"),n=e.data("count"),a=!flexbe_cli.is_admin&&e.data("slider");1!=n&&a&&(this.slideshow=flexbe_cli.run.is_mobile||flexbe_cli.is_admin?0:1e3*Math.floor(e.data("slideshow")),this.current=Math.floor(this.$block.data("slide-move"))||0,this.current>=n&&(this.current=n-1),this.current<0&&(this.current=0),this.swiper=new Swiper(e[0],{wrapperClass:"slider",slideClass:"slide",noSwipingClass:"fr-element",slideActiveClass:"active",navigation:{prevEl:s.closest(".slider-prev").toArray(),nextEl:s.closest(".slider-next").toArray()},effect:"fade",fadeEffect:{crossFade:!0},paginationClickable:!0,simulateTouch:!1,touchMoveStopPropagation:!0,preventClicksPropagation:!0,preventClicks:!0,speed:650,autoHeight:!flexbe_cli.is_admin,initialSlide:t.current,autoplay:!!t.slideshow&&{delay:t.slideshow},on:{slideChange:function(){t.current=this.activeIndex,t.setCurrent()}}}),this.swiper.autoplay.pause())},setCurrent:function(){this.$block.data("slide-move",this.current)},onScreen:function(i){this.swiper&&this.swiper.autoplay&&this.swiper.autoplay.running&&this.slideshow&&!flexbe_cli.run.is_mobile&&(i?this.swiper.autoplay.run():this.swiper.autoplay.pause())},onUpdate:function(i){i.styleRendered&&this.swiper&&this.swiper.update(!1)}}),flexbe_cli.block.register(76,{require:["/js//swiper.v4.js"],onLoad:function(i){var e=this,t=e.$block.find(".slider-main"),s=e.$block.find(".slider-button"),n=t.data("count"),a=t.data("slider");1!=n&&a&&(e.current=Math.floor(e.$block.data("slide-move"))||0,e.current>=n&&(e.current=n-1),e.current<0&&(e.current=0),e.$block.find(".slider-pager .item").on("click",function(i){var t=+$(i.currentTarget).data("itemId");"number"==typeof t&&(e.current=t-1,e.setCurrent())}),e.swiper=new Swiper(t.find(".slider-wrapper")[0],{wrapperClass:"slider",slideClass:"slide",noSwipingClass:"fr-element",slideActiveClass:"active",navigation:{prevEl:s[0],nextEl:s[1]},simulateTouch:!flexbe_cli.is_admin,touchMoveStopPropagation:!0,preventClicksPropagation:!0,preventClicks:!0,speed:350,spaceBetween:30,autoHeight:!flexbe_cli.is_admin,initialSlide:e.current,loop:!1,on:{slideChange:function(){e.current=this.activeIndex,e.setCurrent()}}}),i&&"items_add"===i.reason&&(e.current=i.reasonData.to),e.setCurrent())},setCurrent:function(){this.swiper&&this.swiper.slideTo(this.current||0),this.$block.data("slide-move",this.current),this.$block.find(".slider-pager .item").removeClass("active").closest('[data-item-id="'+(this.current+1)+'"]').addClass("active")},onUpdate:function(i){i.styleRendered&&this.swiper&&this.swiper.update(!1)}}),flexbe_cli.block.register(78,{require:["/js//swiper.v4.js"],onLoad:function(i){var e=this,t=e.$block.find(".slider-main"),s=e.$block.find(".slider-button"),n=e.$block.find(".slider-pagination"),a=t.data("count"),r=t.data("slider");1!=a&&r&&(e.current=Math.floor(e.$block.data("slide-move"))||0,e.current>=a&&(e.current=a-1),e.current<0&&(e.current=0),e.swiper=new Swiper(t.find(".slider-wrapper")[0],{wrapperClass:"slider",slideClass:"slide",noSwipingClass:"fr-element",slideActiveClass:"active",navigation:{prevEl:s[0],nextEl:s[1]},pagination:{el:n[0],type:"bullets",clickable:!0},paginationClickable:!0,simulateTouch:!1,touchMoveStopPropagation:!0,preventClicksPropagation:!0,preventClicks:!0,speed:350,spaceBetween:30,autoHeight:!flexbe_cli.is_admin,initialSlide:e.current,on:{slideChange:function(){e.current=this.activeIndex,e.setCurrent()}}}),e.$block.find(".slider-pager .item").on("click",function(i){var t=+$(i.currentTarget).data("itemId");"number"==typeof t&&(e.current=t-1,e.setCurrent())}),i&&"items_add"===i.reason&&(e.current=i.reasonData.to),e.setCurrent())},setCurrent:function(){this.swiper&&this.swiper.slideTo(this.current||0),this.$block.data("slide-move",this.current),this.$block.find(".slider-pager .item").removeClass("active").closest('[data-item-id="'+(this.current+1)+'"]').addClass("active")},onUpdate:function(i){i.styleRendered&&this.swiper&&this.swiper.update(!1)}}),flexbe_cli.block.register(9,{require:["/js//swiper.v4.js"],onLoad:function(i){var t=this,e=t.$block.find(".slider-main"),s=t.$block.find(".slider-button"),n=t.$block.find(".slider-pagination"),a=e.data("count"),r=e.data("slider");flexbe_cli.run.is_desctop&&a<=3||!r||(t.current=Math.floor(t.$block.data("slide-move"))||0,i&&"items_add"===i.reason&&(t.current=i.reasonData.to),t.current>=a&&(t.current=a-1),t.current<0&&(t.current=0),t.swiper=new Swiper(e.find(".slider-wrapper")[0],{wrapperClass:"slider",slideClass:"slide",noSwipingClass:"fr-element",navigation:{prevEl:s[0],nextEl:s[1]},pagination:{el:n[0],type:"bullets",clickable:!0},simulateTouch:!flexbe_cli.is_admin,touchMoveStopPropagation:!0,preventClicksPropagation:!0,preventClicks:!0,speed:650,slidesPerView:3,slidesPerGroup:3,spaceBetween:30,autoHeight:!flexbe_cli.is_admin,initialSlide:t.current,breakpoints:{768:{speed:350,slidesPerView:1,slidesPerGroup:1}},on:{slideChange:function(){t.current=this.activeIndex,t.$block.data("slide-move",t.current)}}}))},onUpdate:function(i){i.styleRendered&&this.swiper&&this.swiper.update(!1)}}),flexbe_cli.modal.register(100,{types:{},pay_id:"",hash:"",selectors:{},onLoad:function(){var e=this;this.start(),flexbe_cli.events.on("pay",function(i,t){t&&"init"==t.action&&e.start()})},start:function(){this.loadSelectors();var i=this.getQueryParams();if(i){switch(i){case"success":this.showSuccessAlert();break;case"fail":this.showFailAlert();break;case"pay":this.getBill()}setTimeout(function(){flexbe_cli.modal.open("pay")},300)}},loadSelectors:function(){this.selectors.$container=this.$modal.find(".container"),this.selectors.$bill=this.$modal.find(".action-bill"),this.selectors.$cash=this.$modal.find(".action-cash"),this.selectors.$already=this.$modal.find(".action-already"),this.selectors.$success=this.$modal.find(".action-success"),this.selectors.$fail=this.$modal.find(".action-fail")},getQueryParams:function(){var i=!1;try{i=JSON.parse('{"'+decodeURI(location.search.substring(1)).replace(/"/g,'\\"').replace(/&/g,'","').replace(/=/g,'":"')+'"}')}catch(i){}if(!i.pay_id)return!1;if(this.pay_id=i.pay_id,this.hash=i.h,i.pay_status){try{history.pushState(null,null,window.location.pathname)}catch(i){}return i.pay_status}return"pay"},getBill:function(){var t=this;this.pay_id&&!1!==this.pay_id&&$.ajax({url:"/mod/pay/ajax",type:"GET",dataType:"json",data:{act:"payData",pay_id:this.pay_id,hash:this.hash}}).done(function(i){if(0===i.status)return!1;t.types=i.pay.support_types,2==i.pay.pay_status?t.showAlreadyPayed(i.pay):t.cashonly()?t.showCashInstruction(i.pay):t.showBillForm(i.pay)})},showBillForm:function(i){var s=this;this.selectors.$container.attr("data-type","bill");var n=this.selectors.$bill.find(".pay-methods-list").empty(),t=this.selectors.$bill.find(".pay-action"),e=this.selectors.$bill.find(".component-button");for(var a in this.types){var r=this.types[a];if(r.name){var o='<label class="item" data-type="'+a+'" title="'+r.name+'" for="'+a+'">\n                                <input type="radio" name="form[pay_method]" value="'+a+'" id="'+a+'">\n                                <div class="preview"><i></i></div>\n                                <span class="text-style-tiny">'+r.name+"</span>\n                            </label>";n.append(o)}}t.find(".title > span").text(i.pay_id),t.find(".price > span").text(i.pay_sum),n.on("click",".item",function(i){return i.preventDefault(),$(i.currentTarget).find("input").prop("checked",!0),e.removeClass("disabled"),!1}),e.on("click",function(i){var t=n.find("input:checked").val();if(!t)return alert("Выберите способ оплаты"),!1;if("cash"==t)return s.showCashInstruction(),!1;var e="/mod/pay/?pay_type="+t+"&pay_id="+s.pay_id+"&h="+s.hash;$(i.currentTarget).attr("href",e),flexbe_cli.run.is_mobile&&flexbe_cli.run.is_OSX||$(i.currentTarget).addClass("busy")})},showCashInstruction:function(){this.selectors.$container.attr("data-type","cash"),this.types.cash&&this.types.cash.instruction&&this.selectors.$cash.find(".text").html(this.types.cash.instruction),$.ajax({url:"/mod/pay/ajax",type:"GET",dataType:"json",data:{act:"selectCash",pay_id:this.pay_id,hash:this.hash}})},showAlreadyPayed:function(i){this.selectors.$container.attr("data-type","already");var t=this.selectors.$already.find(".pay-action"),e="";"0"!=i.pay_time_done&&(e=i.pay_time_done),this.selectors.$already.find(".text > span.num").text(i.pay_id),t.find(".title > span.num").text(i.pay_id),t.find(".sub > span").text(e),t.find(".price > span").text(i.pay_sum)},showSuccessAlert:function(){this.selectors.$container.attr("data-type","success"),flexbe_cli.stat.reach_goal("pay_done")},showFailAlert:function(){var i=this;this.selectors.$container.attr("data-type","fail"),this.selectors.$fail.find(".component-button").off("click").on("click",function(){i.getBill()})},cashonly:function(){return!(!this.types.cash||1!=Object.keys(this.types).length)}}),flexbe_cli.modal.register(2,{onInit:function(){this.video=this.$modal.find("iframe")[0],this.videoOrigin=this.video?this.video.src||this.video.getAttribute("data-src"):""},onOpen:function(){this.bindVideo(!0)},onClose:function(){this.bindVideo(!1)},bindVideo:function(i){if(void 0===i&&(i=!1),!this.video)return!1;this.video.src&&i||(this.video.src="",this.video.src=this.videoOrigin)}}),flexbe_cli.modal.register(20,{onInit:function(){this.video=this.$modal.find("iframe")[0],this.videoOrigin=this.video?this.video.src||this.video.getAttribute("data-src"):""},onOpen:function(){this.bindVideo(!0)},onClose:function(){this.bindVideo(!1)},bindVideo:function(i){if(void 0===i&&(i=!1),!this.video)return!1;this.video.src&&i||(this.video.src="",this.video.src=this.videoOrigin)}}),flexbe_cli.modal.register(3,{onInit:function(){this.video=this.$modal.find("iframe")[0],this.videoOrigin=this.video?this.video.src||this.video.getAttribute("data-src"):""},onOpen:function(){this.bindVideo(!0)},onClose:function(){this.bindVideo(!1)},bindVideo:function(i){if(void 0===i&&(i=!1),!this.video)return!1;this.video.src&&i||(this.video.src="",this.video.src=this.videoOrigin)}}),flexbe_cli.widget.register(1,{list:[],$list:null,$sum:null,$button:null,is_open:!1,onInit:function(){this.$container=this.$widget.find(".widget-data"),this.$list=this.$widget.find(".order-list > ul"),this.$sum=this.$widget.find(".checkout .price"),this.$button=this.$widget.find(".cart-button"),this.events(),flexbe_cli.is_admin?this.list=[{id:"7832324_1",count:1,img:"/img/1000000945_200.jpg",title:"Тестовый товар 1",price:750},{id:"7832464_2",count:2,img:"/img/1000000948_200.jpg",title:"Тестовый товар 2",price:2550}]:this.loadFromStorage(),this.renderList()},onLoad:function(){this.formInit()},onUpdate:function(){this.onInit(),this.is_open&&(this.$container.addClass("fade-in noanimate"),this.open())},formInit:function(){var t=this;flexbe_cli.components.instances[this.id].forEach(function(i){"form"===i.is&&((t.form=i).onBeforeSend(function(){if(!t.list.length)return t.$container.removeClass("shake"),setTimeout(function(){return t.$container.addClass("shake")},50),!1;i&&i.addItems(t.list)}),i.onAfterSent(function(){t.close(),flexbe_cli.stat.ecommerce.purchase(t.list),t.list=[],t.renderList()}))})},events:function(){var n=this;flexbe_cli.events.off("cart_command.w3").on("cart_command.w3",function(i,t){if(t)switch(t.command){case"toggle":n.is_open?n.close():n.open();break;case"open":n.open(t);break;case"close":n.close(t);break;case"add":n.add(t.item);break;case"remove":n.remove(t.id)}}),this.$widget.off("click.cart-button").on("click.cart-button",".cart-button",function(){n.$container.hasClass("show")?n.close():n.open()}),this.$list.off("click").on("click","[data-action]",function(i){var t=$(i.currentTarget).closest("li"),e=$(i.currentTarget).data("action"),s=t.data("id");s&&("remove"==e?n.remove(s):n.updateCount(s,e))}),this.$list.off("input").on("input",".count",function(i){var t=$(i.currentTarget).closest("li").attr("data-id"),e=+i.target.value;e||(e=1,$(i.currentTarget).val(1)),n.updateCount(t,e)}),this.$container.off("click.close").on("click.close","a.close, .scroller, .widget-content-wrapper",function(i){i.target===i.currentTarget&&n.close()}),$(document).off("keyup.cart_esc_close").on("keyup.cart_esc_close",function(i){27==i.which&&n.close()})},open:function(){var i=this;this.is_open=!0,this._onScreen({state:!0}),this._onView({state:!0}),flexbe_cli.is_admin?(this.$container.addClass("is-editor"),$(".container-list").addClass("editor-stop")):(this.$button.addClass("hide"),this.loadFromStorage()),this.renderList(),$("body").addClass("overflow"),this.$container.hasClass("noanimate")?(this.$container.addClass("show fade-in"),this.$container.removeClass("noanimate")):(this.$container.addClass("show"),setTimeout(function(){i.$container.addClass("fade-in"),i.$container.removeClass("noanimate")},50)),flexbe_cli.run.is_OSX&&flexbe_cli.run.is_mobile&&(this.lastScroll=flexbe_cli.scroll.latest,$(".container-list, .modal-list, .mobile-menu, header, footer").css({display:"none"}),this.$container.css({position:"relative"}),$("body, html").scrollTop(0))},close:function(){var i=this;$(window).off("keyup.cart_esc_close"),this.is_open&&(this.is_open=!1,$("body").removeClass("overflow"),$(".container-list").removeClass("editor-stop"),this.$button.removeClass("hide"),this.$container.removeClass("fade-in"),this.$container.addClass("fade-out"),setTimeout(function(){i.$container.removeClass("fade-out show noanimate")},350),flexbe_cli.run.is_OSX&&flexbe_cli.run.is_mobile&&(this.$container.css({position:""}),$(".container-list, .modal-list, .mobile-menu, header, footer").css({display:""}),$("body, html").scrollTop(this.lastScroll)))},add:function(t,i){var e=this;if(void 0===i&&(i=!1),(!this.is_open||i)&&t){t.count=parseInt(t.count,10)||1,t.price=parseFloat(t.price)||0;var s=!1;this.list&&this.list.length&&(this.list=this.list.map(function(i){return i.id==t.id&&(i.count+=t.count,s=!0),i})),s||this.list.push(t),flexbe_cli.stat.ecommerce.add(t.id,t.title,t.count,t.price),flexbe_cli.stat.reach_goal("add_to_cart",t),this.renderList(),this.$button.removeClass("blink"),setTimeout(function(){e.$button.addClass("blink")},50)}},remove:function(t){if(void 0===t&&(t=!1),!1!==t){var i=this.list.filter(function(i){return i.id==t})[0];flexbe_cli.stat.ecommerce.remove(i.id,i.title),this.list=this.list.filter(function(i){return i.id!=t}),this.renderList()}},updateCount:function(e,s){var n=this;void 0===e&&(e=!1),void 0===s&&(s="+"),!1!==e&&(this.list&&this.list.length&&(this.list=this.list.map(function(i){if(i.id==e){"+"==s?i.count+=1:"-"==s&&1<i.count?i.count-=1:(s=parseInt(s,10),i.count=s||1),i.count=parseInt(i.count,10)||1;var t=n.$list.find('[data-id="'+e+'"]');t.find(".price").text(n.formatPrice(i.count*i.price)),"-"!==s&&"+"!==s||t.find(".count").val(i.count),flexbe_cli.stat.ecommerce.add(i.id,i.title,i.count,i.price)}return i})),this.saveToStorage(),this.renderCount())},renderList:function(){var e=this;this.saveToStorage(),this.renderCount();var s="";this.list.length&&this.list.forEach(function(i){var t;s+='<li data-id="'+(t=i).id+'">\n                <div class="img-holder">\n                    <div class="img" '+(t.img&&'style="background-image: url('+t.img+')"')+'></div>\n                </div>\n\n                <div class="content-holder">\n                    <div class="flex-line">\n                        <div class="item-title">'+(t.title||"-")+'</div>\n                        <a class="times" data-action="remove"></a>\n                    </div>\n                    <div class="flex-line">\n                        <div class="item-count">\n                            <a data-action="-"></a>\n                            <input type="number" class="count" min="1" value="'+t.count+'"/>\n                            <a data-action="+"></a>\n                        </div>\n\n                        <div class="item-price">\n                            <span class="price">'+e.formatPrice(t.price*t.count)+'</span>\n                            <span class="curr">'+flexbe_cli.lang.currency+"</span>\n                        </div>\n                    </div>\n                </div>\n            </li>"}),this.$list.html(s),this.$container.find(".cart-container").toggleClass("empty",0===this.list.length),this.form&&this.form.addItems(this.list)},renderCount:function(){var t=0,e=0;this.list.length&&this.list.forEach(function(i){i.count&&(t+=parseInt(i.count,10),i.price&&(e+=parseInt(i.count,10)*parseFloat(i.price)))}),this.$sum.text(this.formatPrice(e)),this.$button.attr("data-count",t),this.$container.find(".product-count .count").text(t)},formatPrice:function(i){return(i=(i=String(i).replace(",",".").replace(/[^0-9.]/g,"")).split("."))[0]=chunkSplit(i[0]),i[1]&&(i[1]=i[1].length<2?i[1]+="0":i[1].substr(0,2)),2<i.length&&(i=i.splice(0,2)),i.join(".")},loadFromStorage:function(){if(!flexbe_cli.is_admin&&localStorage)try{var i=JSON.parse(localStorage.getItem("f_cart"));i&&i instanceof Array&&(this.list=i)}catch(i){}},saveToStorage:function(){if(!flexbe_cli.is_admin&&localStorage)if(this.list&&this.list instanceof Array)try{localStorage.setItem("f_cart",JSON.stringify(this.list))}catch(i){}else this.list=[]}}),flexbe_cli.widget.register(2,{require:["/js/anime.min.js"],$list:null,onLoad:function(){var e=this;this.$list=this.$widget.find(".anchors-list"),this.list="object"==_typeof(this.$list.data("anchors"))&&this.$list.data("anchors").list||[],this.style=this.$list.data("anchors").style||1,this.show_title=this.$list.data("anchors").show_title,this.$list.removeAttr("data-anchors"),flexbe_cli.run.is_mobile||(this.drawList(),this.setActive(),flexbe_cli.is_admin&&flexbe_cli.events.off("layout_change.anchors").on("layout_change.anchors",function(i,t){"block"===t.is&&e.drawList()}))},check:function(){var t=$(".b_block").not('[data-b-type*="overflow"]');this.list=this.list.filter(function(i){if(i.enabled&&t.closest('[data-id="'+i.id+'"]')[0])return!0})},drawList:function(){var t=this;if(0===flexbe_cli.block.$blocks.length)return this.$list.hide(),!1;this.$list.show(),this.check();var e="";flexbe_cli.is_admin&&0===this.list.length?e='<svg style="color: #adadad" width="18" height="98" viewBox="0 0 18 98" xmlns="http://www.w3.org/2000/svg">\n                <g fill="none" fill-rule="evenodd">\n                    <circle opacity=".05" cx="9" cy="5" r="5"/>\n                    <circle opacity=".2" cx="9" cy="25" r="5"/>\n                    <circle opacity=".2" cx="9" cy="73" r="5"/>\n                    <circle opacity=".05" cx="9" cy="93" r="5"/>\n                    <path d="M9 40a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm5.126 9.626h-4.5v4.5H8.34v-4.5h-4.5V48.34h4.5v-4.5h1.286v4.5h4.5v1.286z" opacity=".45"/>\n                </g>\n            </svg>':0<this.list.length&&(this.list.forEach(function(i){e+="<li"+(t.show_title&&i.title?' data-title="'+i.title+'"':"")+'><a href="#'+i.id+'"></a></li>'}),e+='<li class="helper"><a></a></li>'),this.$list.find("ul").html(e),this.$helper=this.$list.find(".helper"),this.animateList()},animateList:function(){var i=this;if(0!==this.list.length){if(flexbe_cli.is_admin)this.$helper.css({opacity:1,transform:"translateY("+24*this.index+"px)"});else{var t=anime({targets:this.$list.find("li").not(this.$helper).get(),duration:200,opacity:[0,1],scale:[.4,1],easing:"easeOutBack",autoplay:!1,delay:function(i,t){return 200*t},complete:function(){anime({targets:i.$helper.get(),duration:400,translateY:24*i.index,scale:[2.5,1],opacity:[0,1],easing:"easeInExpo"})}});this.$list.addClass("hide"),setTimeout(function(){i.$list.removeClass("hide"),t.play()},1500)}this.$list.find("li").removeClass("active").eq(this.index).addClass("active")}},index:0,setActive:function(){var n=this;if(0!==this.list.length){var s=function(e){n.$list.css("color",e.tween.color);var s=n.index;n.list.some(function(i,t){if(i.id==e.id)return s=t,!0}),(s=Math.max(0,Math.min(n.list.length-1,s)))!=n.index&&(function(i){if(n.$list.find("li").removeClass("active"),n.$list.find("li").eq(i).addClass("active"),1==n.style){var t=24*i,e=0<i-n.index?12:-12;anime.remove(n.$helper[0]),anime({targets:n.$helper[0],translateY:t-e,scaleY:2.5,scaleX:.6,duration:100,easing:"easeInQuad",complete:function(){anime({targets:n.$helper[0],translateY:t,scaleY:1,scaleX:1,duration:100,easing:"easeOutQuad"})}})}}(s),n.index=s)};flexbe_cli.block.$list.find(".b_block").each(function(i,t){var e=t._core;e&&e.isFocused&&s(e)}),flexbe_cli.events.off("entity_event.anchors").on("entity_event.anchors",function(i,t){t&&t.type&&"focus"==t.type&&t.state&&t.core&&"block"===t.core.is&&s(t.core)}),this.$list.on("click","li",function(i){if(!$(i.target).is("a"))return $(i.currentTarget).find("[href]").trigger("click"),i.preventDefault(),!1})}}});
//# sourceMappingURL=maps/_client.js.map
