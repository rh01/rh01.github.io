// JavaScript Document
//定义服务器的地址
var tourguideurl = "http://tourinfo.ibdsr.cn/tourGuide";
var cityid = 170;
var currentpage = 1;
var pagesize = 4;
var totalitem;
var totalpage;
var orderbyheat=null;
var orderbyclicknum=null;
var searchname="";

$(function () {
    //获取景区列表
    listByCity(cityid, searchname, orderbyheat, orderbyclicknum, pagesize, currentpage);
    //listByCity(cityid, pagesize, curentpage);
    //添加点击事件
    $('.c_page_list').on('click', 'a', function () {
        var pageset = $(this).html();
        var pagenum = parseInt(pageset);
        //listByCity(cityid, pagesize, pagenum);
        listByCity(cityid,searchname, orderbyheat, orderbyclicknum, pagesize, pagenum);

    })
    //添加前一页
    $(".c_up").on('click', function () {
        if (curentpage >= 2) {
            //listByCity(cityid, pagesize, curentpage - 1);
            listByCity(cityid,searchname, orderbyheat, orderbyclicknum, pagesize, curentpage - 1);
        }
    });

    //添加后一页
    $(".c_down").on('click', function () {
        if (curentpage < totalpage) {
            //listByCity(cityid, pagesize, curentpage + 1);
            listByCity(cityid,searchname, orderbyheat, orderbyclicknum, pagesize, curentpage + 1);
        }
    });

    //添加跳转事件
    $(".c_page_submit").on('click', function () {
        var pagenum = $(".c_page_num").val();
        pagenum = parseInt(pagenum);
        if (pagenum > 0 && pagenum <= totalpage) {
            listByCity(cityid, searchname, orderbyheat, orderbyclicknum, pagesize, pagenum);
        }else{
            alert("请输入正确的序号！");
            $(".c_page_num").val("");
        }
    });

    
    //添加搜索事件
    $(".searchbutton").on('click',function() {
        var text=$(".searchinput").val();
        searchname=text;
        searchByCity(cityid,searchname, orderbyheat, orderbyclicknum, pagesize, currentpage);
        $(".searchinput").val("");

    });
    // 给img添加点击事件
    $('.search_list').on('click', "#moreId", function () {
        var areaid=parseInt($(this).attr("data-href").substring(20));
        //var url = $(this).attr("data-href");

        listByArea(areaid,pagesize);
        //window.location.href = url;
        //addClick(areaid,url);

    });

    // 给 cover img添加点击事件
    $('.search_list').on('click', "#coverId", function () {
        var areaid=parseInt($(this).attr("data-href").substring(20));
        //var url = $(this).attr("data-href");

        listAreaImages(areaid);
        //window.location.href = url;
        //addClick(areaid,url);

    });


});
//点击事件+1，增加点击量
function addClick(areaid,url){
       $.ajax({
        //提交数据的类型 POST GET
        crossDomain: true,
        xhrFields: {withCredentials: true},
        type: "POST",
        //提交的网址
        //url: "http://172.16.3.251/tourGuide/resource/tourArea/listByCity",
        url: tourguideurl + "/resource/tourArea/addClick",
        //提交的数据
        data: { areaId: areaid},
        //返回数据的格式
        datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
        //在请求之前调用的函数
        beforeSend: function () {
        },
        //成功返回之后调用的函数
        success: function (data) {
           var obj = JSON.parse(data);
           //alert(obj.data);
           //获取景区列表
           listByCity(cityid, searchname, orderbyheat, orderbyclicknum, pagesize, currentpage);
           window.location.href = url;
        },
        //调用执行后调用的函数
        complete: function (XMLHttpRequest, textStatus) {

        },
        //调用出错执行的函数
        error: function () {
            //请求出错处理
        }
    });

}

//获取服务器端景点列表信息
function searchByCity(cityid,searchname,orderbyheat, orderbyclicknum, pagesize, currentpage) {
    $.ajax({
        crossDomain: true,
        xhrFields: {withCredentials: true},
        //提交数据的类型 POST GET
        type: "GET",
        //提交的网址
        //url: "http://172.16.3.251/tourGuide/resource/tourArea/listByCity",
        url: tourguideurl + "/resource/tourArea/selectByQuery" ,
        //提交的数据
        data: { cityId: cityid,isPublished: true, searchName: searchname, orderByHeat: orderbyheat, orderByClickNum: orderbyclicknum, pageSize: pagesize, currentPage: currentpage },
        //返回数据的格式
        datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
        //在请求之前调用的函数
        beforeSend: function () {
        },
        //成功返回之后调用的函数
        success: function (data) {
            var obj = JSON.parse(data);
            curentpage = parseInt(obj.currentPage);
            pagesize = parseInt(obj.pageSize);
            totalpage = parseInt(obj.totalPage);
            totalitem = parseInt(obj.totalItem);
            var datatotal = obj.data;
            $('.search_list').empty();
            for (var i = 0, l = datatotal.length; i < l; i++) {
                //$('.search_list').html(text);
                var text = '<li style="width:100%" data-href="scenicdetail?scenid='+datatotal[i].areaId+'" data-index="0" data-id="121681">' +
                        '<fieldset>' +
                        '<legend class="legend">'+ datatotal[i].name +'</legend>'+
                        '<div class="list_box">' +
                '<div class="price_box">' +
                    '<div class="price"> <strong>' + datatotal[i].qualityGradeStr + '<b></b> </strong>&nbsp;<span></span></div>' +
                                    '<div>热度:<div class="atar_Show"><p tip="' + parseInt(datatotal[i].heat) / 2 + '" style="width: 60px;"></p>'+
                                    '<img src="images/more.gif" class="btn_more" data-href="scenid='+datatotal[i].areaId+'" data-index="0" data-id="121681"></div></div>' +
                        '<div class="img_pane">' +
                '<img class="pic" style="float:left"  src="' + datatotal[i].coverImage + '" alt="">' +
                            '<img class="pic" src="' + datatotal[i].coverImage + '" alt="">' +
                    
                        '</div>' + 

                '</fieldset>' +
    '</li>';
                $('.search_list').append(text);

            }

        },
        //调用执行后调用的函数
        complete: function (XMLHttpRequest, textStatus) {
            // alert(XMLHttpRequest.responseText);
            //alert(textStatus);
            //HideLoading();
            getPageBar();

            //评分插件
            $(".atar_Show p").each(function (index, element) {
                var num = $(this).attr("tip");
                var www = num * 2 * 8;//
                $(this).css("width", www);
            });

        },
        //调用出错执行的函数
        error: function () {
            //请求出错处理
        }
    });

}

//获取服务器端景点列表信息
function listByCity(cityid,searchname,orderbyheat, orderbyclicknum, pagesize, currentpage) {
    $.ajax({
        crossDomain: true,
        xhrFields: {withCredentials: true},
        //提交数据的类型 POST GET
        type: "GET",
        //提交的网址
        //url: "http://172.16.3.251/tourGuide/resource/tourArea/listByCity""/resource/tourArea/selectByQuery",
        url: tourguideurl + "/resource/areaImage/listAreasByCity?" ,
        //提交的数据
        data: {cityId:cityid, pageSize: pagesize, currentPage: currentpage},
        //返回数据的格式
        datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
        //在请求之前调用的函数
        beforeSend: function () {
        },
        //成功返回之后调用的函数
        success: function (data) {
            var obj = JSON.parse(data);
            curentpage = parseInt(obj.currentPage);
            pagesize = parseInt(obj.pageSize);
            totalpage = parseInt(obj.totalPage);
            totalitem = parseInt(obj.totalItem);
            var datatotal = obj.data;
            $('.search_list').empty();
            for (var i = 0, l = datatotal.length; i < l; i++) {
                //$('.search_list').html(text);
                var text = '<li style="width:100%" > ' +
                        '<fieldset>' +
                        '<legend class="legend">'+ datatotal[i].name +'</legend>'+
                        '<div class="list_box">' +
                '<div class="price_box">' +
                    '<div class="price"> <strong>' + datatotal[i].qualityGradeStr + '<b></b> </strong>&nbsp;<span></span></div>' +
                                    '<div>热度:<div class="atar_Show"><p tip="' + parseInt(datatotal[i].heat) / 2 + '" style="width: 60px;"></p>'+
                                    '<img src="images/more.gif" id ="moreId" class="btn_more" data-href="scenicdetail?scenid='+datatotal[i].areaId+'" data-index="0" data-id="121681"></div></div>' +
                        '<div  class="img_pane">' +
                '<img  class="pic" id="coverId" style="float:left"  src="' + datatotal[i].coverImage + '" alt="" data-href="scenicdetail?scenid='+datatotal[i].areaId+'" data-index="0" data-id="122222"> ' +
                            '<div><img class="pic" id="coverId" src="' + datatotal[i].areaImages[0].imageUrl + '" alt="" data-href="scenicdetail?scenid='+datatotal[i].areaId+'" data-index="0" data-id="122222">' +
                    '<div style="position:relative; float:right; padding:0 10px 0 0; bottom:95px; font-weight:bold;font-family:"Microsoft YaHei"; background-color:#FFF; opacity: 0.5;">' +
                        datatotal[i].areaImages[0].description +
                '</div></div>'+
                        '</div>' + 

                '</fieldset>' +
    '</li>';
                $('.search_list').append(text);

            }

        },
        //调用执行后调用的函数
        complete: function (XMLHttpRequest, textStatus) {
            // alert(XMLHttpRequest.responseText);
            //alert(textStatus);
            //HideLoading();
            getPageBar();

            //评分插件
            $(".atar_Show p").each(function (index, element) {
                var num = $(this).attr("tip");
                var www = num * 2 * 8;//
                $(this).css("width", www);
            });

        },
        //调用出错执行的函数
        error: function () {
            //请求出错处理
        }
    });

}











//获取服务器端景点列表信息
function listByArea(areaid,searchname,orderbyheat, orderbyclicknum, pagesize, currentpage) {
    $.ajax({
        crossDomain: true,
        xhrFields: {withCredentials: true},
        //提交数据的类型 POST GET
        type: "GET",
        //提交的网址
        //url: "http://172.16.3.251/tourGuide/resource/tourArea/licityidstByCity",
        url: tourguideurl + "/resource/areaImage/listSpotImagesByAreaId",
        //提交的数据
        data: { areaId: areaid, pageSize: pagesize, currentPage: currentpage },
        //返回数据的格式
        datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
        //在请求之前调用的函数
        beforeSend: function () {
        },
        //成功返回之后调用的函数
        success: function (data) {
            var obj = JSON.parse(data);
            curentpage = parseInt(obj.currentPage);
            pagesize = parseInt(obj.pageSize);
            totalpage = parseInt(obj.totalPage);
            totalitem = parseInt(obj.totalItem);
            var datatotal = obj.data;
            $('.search_list').empty();
            for (var i = 0, l = datatotal.length; i < l; i++) {
                //$('.search_list').html(text);
                var text = '<li style="width:100%">' +
                        '<fieldset>' +
                        '<legend class="legend">'+ datatotal[i].name +'</legend>'+
                        
               
                        '<div class="img_pane">' +
                '<img class="pic" style="float:left"  src="' + datatotal[i].coverImage + '" alt="">' +
                            
                        '</div>' + 

                '</fieldset>' +
    '</li>';
                $('.search_list').append(text);

            }

        },
        //调用执行后调用的函数
        complete: function (XMLHttpRequest, textStatus) {
            // alert(XMLHttpRequest.responseText);
            //alert(textStatus);
            //HideLoading();
            getPageBar();

            //评分插件
            $(".atar_Show p").each(function (index, element) {
                var num = $(this).attr("tip");
                var www = num * 2 * 8;//
                $(this).css("width", www);
            });

        },
        //调用出错执行的函数
        error: function () {
            //请求出错处理
        }
    });

}




//获取服务器端景点列表信息
function listAreaImages(areaid) {
    $.ajax({
        crossDomain: true,
        xhrFields: {withCredentials: true},
        //提交数据的类型 POST GET
        type: "GET",
        //提交的网址
        //url: "http://172.16.3.251/tourGuide/resource/tourArea/licityidstByCity",
        url: tourguideurl + "/resource/areaImage/listSpotImagesByAreaId",
        //提交的数据
        data: { areaId: areaid },
        //返回数据的格式
        datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
        //在请求之前调用的函数
        beforeSend: function () {
        },
        //成功返回之后调用的函数
        success: function (data) {
            var obj = JSON.parse(data);
            //curentpage = parseInt(obj.currentPage);
            //pagesize = parseInt(obj.pageSize);
            totalpage = parseInt(obj.totalPage);
            totalitem = parseInt(obj.totalItem);
            var datatotal = obj.data;
            $('.scenicsearch').empty();
            $('.search_list').empty();
            $('.scenicsearch').empty();
            $('.page_box').empty();
            for (var i = 0, l = datatotal.length; i < l; i++) {
                //$('.search_list').html(text);

                var areaimages = datatotal[i].areaImages;
                for (var j = 0, l = areaimages.length; j < l; j++) {
                    var text = '<a class="example-image-link" href="' + areaimages[j].imageUrl + '" data-lightbox="example-set" data-title="'+ datatotal[i].name +'">' +
                        '<img class="example-image" src="' + areaimages[j].imageUrl + '" alt=""></a>';
                     $('.image-set').append(text);
                }

            }

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
        }
    });

}


























//获取分页条
function getPageBar() {
    $(".c_page_list").empty();
    var pageStr = "";
    //页码大于最大页数
    if (curentpage > totalpage) {
        curentpage = totalpage;
    }
    //页码小于1
    if (curentpage < 1) {
        curentpage = 1;
    }
    for (var i = 1; i < totalpage + 1; i++) {
        if (i == curentpage)
            pageStr = pageStr + '<a href="javascript:void(0)" class="current" title="当前第' + i + '页" >' + i + '</a>';
        else
            pageStr = pageStr + '<a href="javascript:void(0)" title="前往第' + i + '页" >' + i + '</a>';
    }
    $(".c_page_list").html(pageStr);
    if (curentpage == 1){
        $(".c_up").css("disable", false);
        //$(".c_up").css("visibility", 'hidden');
        $(".c_up").css("color", '#6FDCC5');
        $(".c_up").css("background", '#ffffff');
    }
    else {
        $(".c_up").css("disable", true);
        //$(".c_up").css("visibility", 'visible');
        $(".c_up").css("color", '#ffffff');
        $(".c_up").css("background", '#6FDCC5');
    }
    if (curentpage == totalpage){
        $(".c_down").css("disable", false);
        //$(".c_down").css("visibility", 'hidden');
        $(".c_down").css("color", '#6FDCC5');
        $(".c_down").css("background", '#ffffff');
    }
    else {
        $(".c_down").css("disable", true);
        //$(".c_down").css("visibility", 'visible');
        $(".c_down").css("color", '#ffffff');
        $(".c_down").css("background", '#6FDCC5');
    }
    // $(".c_page_list").find("a")[curentpage].css('class', 'current');


}
