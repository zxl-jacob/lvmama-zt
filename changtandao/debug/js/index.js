
$(document).ready(function() {

    $('.banner-btn').click(function(){

        var TargetPosition = $(document.body).height() - $('.product-list-group').height() - $('.footimg').height()- $('.product').height()-100;
        $('html,body').animate({ scrollTop: TargetPosition }, 1500);
    });
    
    function view(){
        $(window).scroll(function(e) {
             if ($(window).scrollTop()>100)
                $(".banner-btn").fadeIn(1000);
             else
                $(".banner-btn").fadeOut(1000);
        });
    };
    view();

    var ajaxdata = function () {
        var content = '',i=1;
        $.ajax({
            url: 'http://10.113.1.116/activity/index.php?s=L1609/getCtProductInfos',
            dataType: 'jsonp',
            timeout: 5000,
            type: "GET",
            async: false,
            success: function (data) {
                for(var k=0; k<data.length; k++) {
                    content += '<a href="http://m.lvmama.com/tuan/product-' + data[k].productId + '"><li class="product-list-item" id="' + i + '">'
                            + '<img class="product-pic proimg"  data-src="' + data[k].imgUrl + '" alt="">'
                            + '<div class="pruduct-tab">'
                            + '<div class="tab-item">'
                            + '<span><i>' + data[k].orderCount + '</i></span>份已售'
                            + '</div><div class="tab-item tab-middle"><span><i>' + data[k].commentGood + '</i></span>好评</div>'
                            + '<div class="tab-item"><span><i>' + data[k].back4 + '</i></span>收藏</div>'
                            + '</div><div class="product-item-content"><span class="product-name">'+ data[k].productName
                            + '</span><div class="Highlights"><span>' + data[k].desc + 'span></div>'
                            + ' <div class="product-item-price"><div class="item-label">撒欢价</div><span class="sellprice">￥' + item.sellPriceYuan + '</span>'
                            + '<span class="marketprice"> <s>￥' + data[k].marketPriceYuan + '</s> | ' + data[k].discountV200 + '折</span>'
                            + '<button class="item-btn">立即抢购</button></div>'
                            + '</div></li></a>';
                            i++;
                }   
                $('.product-list-group').append(content);    
                $('.proimg').lazyLoad();
                $(".product-list-item").click(function() {
                    var id = $(this).attr('id');
                    element_cm('立即抢购'+id);
                    
                });   
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    ajaxdata();
    // 按钮埋点 
    function element_cm(elementId) {
        var isPrerender = navigator.userAgent.indexOf("prerender") != -1; //是否是prerender访问
        var agent = navigator.userAgent;
        if (isPrerender) {
            return;
        }
        var interval = setInterval(function() {
            if (!_LVMAMA_COREMETRICS)
                return;
            _LVMAMA_COREMETRICS.init(document.domain);
            cmCreateElementTag(elementId,"长滩爆款专题页");
            clearInterval(interval);
        }, 200);
    }

    // lazyload
    $.fn.lazyLoad = function(option) {
        var _this={
            imgArea : 0,                //图片高度范围
            loadComplete : undefined,   //图片处理后回调
            callback : undefined        //回调函数
        }
        $.extend(_this,option);
        var h = $(window).height();
        var st = $(window).scrollTop();
        var imgArea = _this.imgArea;
        var viewArea = h+st;
        var item = $(this);

        function loadImg(item) {
            h = $(window).height();
            st = $(window).scrollTop();
            viewArea = h+st;
            item.each(function(index) {
                if (!$(this).hasClass("load")&&($(this).offset().top!=st)) {
                    var itemTop = $(this).offset().top;
                    if ((itemTop<viewArea) && (itemTop>st-imgArea)) { //如果图片进入到这个范围则进行load处理                    
                        if ($(this)[0].nodeName == "IMG") {
                            $(this).attr("src",$(this).attr("data-src"));
                        }else {
                            $(this).css("backgroundImage","url("+$(this).attr("data-src")+")");
                        }
                        $(this).addClass("load");
                        if (typeof(_this.loadComplete) != 'undefined') {
                            _this.loadComplete.apply($(this), arguments);
                        }
                    }
                }
            })
        }
        setTimeout(function() {      //初始化，为了避免加载中出现不确定问题增加了延时执行
            loadImg(item);
        },50);
        if (typeof(_this.callback) != 'undefined') {
            _this.callback.apply($(this), arguments);
        }
        $(window).scroll(function() {
            h = $(window).height();
            st = $(window).scrollTop();
            viewArea = h+st;
            loadImg(item);
        })
    }
    $('.proimg').lazyLoad();
});















