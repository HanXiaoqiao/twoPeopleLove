/**
 * Created by 狗逼 on 2017/3/18.
 */
$(function(){
    var $register = $("#registerBox .two-people");
   $("#hr").click(function(){
       /*$("#userInfo").toggle(500);*/
       if($("#userInfo").css("display")=="none"){
           $("#userInfo").slideDown();
       }else{
           $("#userInfo").slideUp();
       }
   });

    function timeElapse(date){
        var current = Date();
        var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
        var days = Math.floor(seconds / (3600 * 24));
        $("#loveDate").html(days);
    }
    var str = $(".hid").val();
    timeElapse(str);

    function listInit(){
        $(".list-a").eq(0).addClass("add-background");
        $(".div-list").eq(0).show();
    }
    listInit();
    $(".list-a").on("click",function(){
        var num = $(this).parent().prevAll().find(".list-show").length;
        $(".listBox-a").eq(num).addClass("add-background1").parent().siblings(".box-list-li").children(".listBox-a").removeClass("add-background1");
        $(".list-show").eq(num).show().parent().siblings(".box-list-li").children(".list-show").hide();
        $(this).siblings(".div-list").show().parent().siblings("li").children(".div-list").hide();
        $(this).addClass("add-background").parent().siblings("li").children(".list-a").removeClass("add-background");
    });

    function listInit1(){
        $(".div-list .box-list .listBox-a").eq(0).addClass("add-background1");
        $(".div-list .box-list .list-show").eq(0).show();
    }
    listInit1();
    $(".listBox-a").on("click",function(){
        var num = $(this).parent().index();
        $(this).siblings(".list-show").show().parent().siblings(".box-list-li").children(".list-show").hide();
        $(this).addClass("add-background1").parent().siblings(".box-list-li").children(".listBox-a").removeClass("add-background1");
    });

    $("#logout").on("click",function(){
        $.ajax({
            url: '/api/user/logout',
            success: function(result){
            if(!result.code){
                window.location.href = '/';
            }
        }
        });
    });
    $("#register1").on("click",function(){
        $.ajax({
            type: 'post',
            url: '/api/user/update',
            data: {
                myphoto: $register.find('[name="myphoto"]').attr("src"),
                myname: $register.find('[name="myname"]').val(),
                mybirth: $register.find('[name="mybirth"]').val(),
                yourphoto: $register.find('[name="yourphoto"]').attr("src"),
                yourbirth: $register.find('[name="yourbirth"]').val(),
                hope: $register.find('[name="hope"]').html()
            },
            dataType: 'json',
            success: function (result) {
                console.log(result);
            }
        });
    });
});
