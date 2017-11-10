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
// var page=1;
var finished=0;
var sover=0;

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
		console.log(searchname);
		searchByCity(cityid,searchname, orderbyheat, orderbyclicknum, pagesize, 1);
		$(".searchinput").val("");

	});
	// 给more img添加点击事件
	$('.search_list').on('click', "#moreId", function () {
        var areaid=parseInt($(this).attr("data-href").substring(20));
        //var url = $(this).attr("data-href");

		listByArea(areaid);
  
    });

	// 给 cover img添加点击事件
	$('.search_list').on('click', "#coverId", function () {
        var areaid=parseInt($(this).attr("data-href").substring(20));
        //var url = $(this).attr("data-href");

		listAreaImages(areaid);


    });

    // 给 cover img添加点击事件
	$('#popoverImgId').on('click',".popoverli", function () {
        var areaid=parseInt($(this).attr("data-href").substring(20));
        //var url = $(this).attr("data-href");

		listAreaImages(areaid);


    });


});








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
        	console.log(searchname);
        },
        //成功返回之后调用的函数
        success: function (data) {

            var obj = JSON.parse(data);console.log(data);
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
									'<img src="images/more.gif" class="btn_more" title="" data-original-title="Heading" data-href="scenid='+datatotal[i].areaId+'" data-index="0" data-id="121681"></div></div>' +
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
            //getPageBar();

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
function listByCity(cityid, pagesize, currentpage) {
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
            //$('.search_list').empty();
            for (var i = 0, l = datatotal.length; i < l; i++) {
                //$('.search_list').html(text);
                var text = '<li style="width:100%" > ' +
						'<fieldset>' +
						'<legend class="legend">'+ datatotal[i].name +'</legend>'+
						'<div class="list_box">' +
	            '<div class="price_box">' +
	                '<div class="price"> <strong>' + datatotal[i].qualityGradeStr + '<b></b> </strong>&nbsp;<span></span></div>' +
									'<div>热度:<div class="atar_Show"><p tip="' + parseInt(datatotal[i].heat) / 2 + '" style="width: 60px;"></p>'+
									'<img src="images/more.gif" id ="moreId"  title="" data-original-title="'+ datatotal[i].name  +'" class=" btn_more" data-href="scenicdetail?scenid='+datatotal[i].areaId+'" data-index="0" data-id="121681"></div></div>' +
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
function listByArea(areaid) {
    $.ajax({
		crossDomain: true,
        xhrFields: {withCredentials: true},
        //提交数据的类型 POST GET
        type: "GET",
        //提交的网址
        //url: "http://172.16.3.251/tourGuide/resource/tourArea/licityidstByCity",
        url: tourguideurl + "/resource/areaImage/listSpotImagesByAreaId",
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
            curentpage = parseInt(obj.currentPage);
            pagesize = parseInt(obj.pageSize);
            totalpage = parseInt(obj.totalPage);
            totalitem = parseInt(obj.totalItem);
            var datatotal = obj.data;
            var htmltext = '<ul>';
            ///$('.search_list').empty();
            for (var i = 0, l = datatotal.length; i < l; i++) {
                //$('.search_list').html(text);
                var text = '<li class="popoverli">' +
						'<img id="popoverImgId" class="cover" src="' + datatotal[i].coverImage + '" alt="" data-href="scenicdetail?scenid='+areaid+'" data-index="0" data-id="123332">' +
				
						
	            '<span>'+ datatotal[i].name +'</span></li>' ;
                //$('.search_list').append(text);

                htmltext += text;


            }
            htmltext+='</ul>'

             $('.search_list #moreId').popover({
                html: true,
                placement: 'bottom',
                //trigger: 'manual',
                container: 'body',
            content: function(){return htmltext;}
        }).click(function (e) {
                 e.preventDefault();
                 // Exibe o popover.
                 $(this).popover('show');

                $('.popover').css('left', '73px'); 
              });

        },
        //调用执行后调用的函数
        complete: function (XMLHttpRequest, textStatus) {
            // alert(XMLHttpRequest.responseText);
            //alert(textStatus);
            //HideLoading();
            //getPageBar();

            //关闭
            // $('htmltext').popover('close');
            
            

        },
        //调用出错执行的函数
        error: function () {
            //请求出错处理
            $('.search_list #moreId').popover('close');
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
        data: { areaId: areaid},
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
            //$('.scenicsearch').empty();
            $('.searchbox').remove();
            for (var i = 0, l = datatotal.length; i < l; i++) {
                //$('.search_list').html(text);

                var areaimages = datatotal[i].areaImages;
                for (var j = 0, l = areaimages.length; j < l; j++) {
                    var text = '<a class="example-image-link" href="' + areaimages[j].imageUrl + '" data-lightbox="example-set" data-title="'+ datatotal[i].name +'">' +
                        '<img class="example-image" src="' + areaimages[j].imageUrl + '" alt=""></a>';
                     $('.image-set').append(text);
                }

            }
            finished = 1;

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






//如果屏幕未到整屏自动加载下一页补满
var setdefult=setInterval(function (){
	if(sover==1)
		clearInterval(setdefult);	
	else if($(".search_list").height()<$(window).height())
		loadmore($(window));
	else
		clearInterval(setdefult);
},500);

//加载完
function loadover(){
	if(sover==1)
	{	
		var overtext="Duang～到底了";
		$(".loadmore").remove();
		if($(".loadover").length>0)
		{
			$(".loadover span").eq(0).html(overtext);
		}
		else
		{
			var txt='<div class="loadover"><span>'+overtext+'</span></div>';
			$("body").append(txt);
		}
	}
}

//加载更多
var vid=0;
function loadmore(obj){
	if(finished==0 && sover==0)
	{
		var scrollTop = $(obj).scrollTop();
		var scrollHeight = $(document).height();
		var windowHeight = $(obj).height();
		
		if($(".loadmore").length==0)
		{
			var txt='<div class="loadmore"><span class="loading"></span>加载中..</div>';
			$("search_list").append(txt);
		}
		if (scrollTop + windowHeight -scrollHeight<=50 ) {
			//此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作
			
			
			//防止未加载完再次执行
			finished=1;
			
			// var result = '';
			// for(var i = 0; i < 6; i++){
			// 	vid++;
			// 	result+='<li>'
			// 				+'<a href="http://www.86y.org/art_detail.aspx?id=744">好经典人生语句，经典得让人心痛！'+parseInt(vid)+'</a>'
			// 			+'</li>';
			// }
			setTimeout(function(){
				$(".loadmore").remove();
				
				currentpage+=1;
				listByCity(cityid, pagesize, currentpage);
				//$('.search_list').append(result);

				finished=0;
				//最后一页
				if(currentpage==7)
				{
					sover=1;
					loadover();
				}
			},1000);
			/*$.ajax({
				type: 'GET',
				url: 'json/more.json?t=25&page='+page,
				dataType: 'json',
				success: function(data){
					var result = '';
					for(var i = 0; i < data.lists.length; i++){
						result+='<li>'
									+'<a href="'+data.lists[i].link+'">'+data.lists[i].title+parseInt(page+1)+"-"+i+'</a>'
								+'</li>';
					}
					
					// 为了测试，延迟1秒加载
					setTimeout(function(){
						$(".loadmore").remove();
						$('.prolist').append(result);
						page+=1;
						finished=0;
						//最后一页
						if(page==10)
						{
							sover=1;
							loadover();
						}
					},1000);
				},
				error: function(xhr, type){
					alert('Ajax error!');
				}
			});*/
		}
	}
}
//页面滚动执行事件
$(window).scroll(function (){
	loadmore($(this));
});
