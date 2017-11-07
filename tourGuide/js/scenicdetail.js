var tourguideurl = "/tourGuide";
var scenid = 0;
$(function () {
    try {
        scenid = parseInt(getUrlParam("scenid"));
    }
    catch (exception) {
        alert(exception.toString());
        scenid = 1;
    }
    finally {

        if (isNaN(scenid)) {
            scenid = 1;
        }
        getScenDetail(scenid);
        listByArea(scenid, 5, 1);
        $(".andmore").on('click', function () {
            var urltext = "spotlist?tourAreaId=" + scenid;
            window.location.href = urltext;
        });

    }
    $(".morecon").click(function () {
        $(this).parent().children(".introdcontent").css("height", "auto");
        $(this).css("display", "none");
        $(".lesscon").css("display", "block");
    });
    $(".lesscon").click(function () {
        $(this).parent().children(".introdcontent").css("height", "406");
        $(this).css("display", "none");
        $(".morecon").css("display", "block");
    });


});

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

//获取服务器端景点详情信息
function getScenDetail(scenid) {
    $.ajax({
        crossDomain: true,
        xhrFields: {withCredentials: true},
        //提交数据的类型 POST GET
        type: "GET",
        //提交的网址
        url: tourguideurl + "/resource/tourArea/detail",
        //提交的数据
        data: {tourAreaId: scenid},
        //返回数据的格式
        datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
        //在请求之前调用的函数
        beforeSend: function () {
        },
        //成功返回之后调用的函数
        success: function (data) {
            //alert(data);
            var obj = JSON.parse(data);
            //$("#scentopname").html(obj.data.name);
            //设置位置区域风景区
            $("#scentopname").html(obj.data.name);
            //设置标题风景区
            $("#scenchname").html(obj.data.name);
            //拼音转换
            var pinyin = new Pinyin();
            $("#scenenname").html(pinyin.getFullChars(obj.data.name));

            //简介 introduction
            //$(".contentlight ul").html(obj.data.introduction);
            $(".contentlight ul").empty();
            $(".contentlight ul").html('<li>' + obj.data.introduction + '</li>');
            //详细介绍

            $(".introdcontent").html('<p>' + obj.data.detailIntroduct + '</p>');

            height = $(".introdcontent").height();
            if (height > 406) {
                $(".introdcontent").css("height", "406");
            } else {
                //$(".morecon").css("display","none");
                $(".morecon").css("display", "none");
            }
            //开放时间
            $("#scenopentime").html(obj.data.openingTime);
            //门票信息间
            $("#scenticketinfo").html(obj.data.ticketInfo);
            //开放时间
            $("#scentipone").html(obj.data.specialTip);
            //景区经纬度信息
            locationx = parseFloat(obj.data.locationX);
            locationy = parseFloat(obj.data.locationY);
            //加载地图，显示景区
            loadMap(locationx, locationy);

            //显示地址
            $("#scenaddress").html(obj.data.address);
            //显示类型
            $("#scentype").html(obj.data.mainTypeName);
            //景区等级
            $("#scenlevel").html(obj.data.qualityGradeStr);
            //景区评级时间  ratingDate
            $("#scentime").html(obj.data.ratingDate);
            //面积
            $("#scenarea").html(obj.data.areaSize + "平方公里");
            //景区官网
            $("#scenurl").html(obj.data.officWebsite);
            $("#scenurl").attr("href",obj.data.officWebsite);
            //景区热度
            var heatnum = parseFloat(obj.data.heat) / 2;
            $("#scenhotheat").html(' <div class="atar_Show"> <p tip="' + heatnum + '" style="width: 56px; border-bottom:none; height:16px"></p> </div>');

            $(".atar_Show p").each(function (index, element) {
                var num = $(this).attr("tip");
                var www = num * 2 * 8;//
                $(this).css("width", www);
            });

            //滚动图片调用
            /*var imgtotal = obj.data.areaImages;
            var imgs = $(".contentleft ul").find("img");
            if (imgtotal.length >= imgs.length) {
                for (var i = 0, l = imgs.length; i < l; i++) {
                    //alert(imgs[i]);
                    $(".contentleft ul").find(imgs[i]).attr("src", imgtotal[i].imageUrl);
                    //alert($(".contentleft ul").find(imgs[i]).attr("src"));
                    //imgs.get(i).attr("src", imgtotal[i].imageUrl);
                    //$(".contentleft ul").append('<li><img src="' + imgtotal[i].imageurl + '" alt="观音赏曲" /></li>');

                }
            }
			*/
            var coverimage = obj.data.coverImage;

            var imgtotal = obj.data.areaImages;

            $('.slider-relative').empty();
            var textone = '<li class="slide fix-width"> <img src="' + coverimage + '" alt=""> <span class="text"> <strong>' + obj.data.name + '</strong><small>封面</small> </span> </li>';
            $('.slider-relative').append(textone);
            for (var i = 0, l = imgtotal.length; i < l; i++) {
                var text = '<li class="slide fix-width"> <img src="' + imgtotal[i].imageUrl + '" alt=""> <span class="text"> <strong>' + obj.data.name + '</strong><small>' + imgtotal[i].description + '</small> </span> </li>';
                $('.slider-relative').append(text);
                //alert(imgtotal[i].imageUrl);

            }

            //$('.pgwSlider').pgwSlider();


        },
        //调用执行后调用的函数
        complete: function (XMLHttpRequest, textStatus) {
            // alert(XMLHttpRequest.responseText);
            //alert(textStatus);
            //HideLoading();
            //setSider();
            loadSilider();


        },
        //调用出错执行的函数
        error: function () {
            //请求出错处理
            alert("出错了");
            alert(tourguideurl + "/resource/tourArea/detail");
        }
    });

}

//获取服务器端景点列表信息
function listByArea(areaid, pagesize, currentpage) {
    $.ajax({
        crossDomain: true,
        xhrFields: {withCredentials: true},
        //提交数据的类型 POST GET
        type: "GET",
        //提交的网址
        url: tourguideurl + "/resource/tourSpot/listByArea",
        //提交的数据
        data: {areaId: areaid, pageSize: pagesize, currentPage: currentpage},
        //返回数据的格式
        datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
        //在请求之前调用的函数
        beforeSend: function () {
        },
        //成功返回之后调用的函数
        success: function (data) {
            var obj = JSON.parse(data);
            $(".scenspot_list").empty();
            var totalspot = obj.data;
            for (var i = 0; i < totalspot.length; i++) {
                var spotheatnum = parseFloat(totalspot[i].heat) / 2;
                var text = '<li onclick="toSpotDetail(\'' + totalspot[i].spotId + '\')"><img src="' + totalspot[i].coverImage + '" />' +
                    '<div class="scenspot_detail"><p>' + totalspot[i].name + '</p><div>热度:<div class="spotstar"> ' +
                    '<p tip="' + spotheatnum + '" style="width: 45px;"></p></div></div><p>点击量：' + totalspot[i].clickNum + '</p></div></li>';
                $(".scenspot_list").append(text);

            }

            //显示分数
            $(".spotstar p").each(function (index, element) {
                var num = $(this).attr("tip");
                var www = num * 2 * 5;//
                $(this).css("width", www);
            });


        },
        //调用执行后调用的函数
        complete: function (XMLHttpRequest, textStatus) {
            // alert(XMLHttpRequest.responseText);
            //alert(textStatus);
            //HideLoading();


        },
        //调用出错执行的函数
        error: function () {
            //请求出错处理
            alert("没有景点数据");
        }
    });
}

function toSpotDetail(id) {
    var areaName = $("#scentopname").html(),
        areaId = getUrlParam("scenid"),
        uri = '';
    uri += "spotdetail?id=" + id;
    uri += '&areaName=' + escape(areaName);
    uri += '&tourAreaId=' + areaId;
    window.location.href = uri;
}