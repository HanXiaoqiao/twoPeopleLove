/**
 * Created by 狗逼 on 2017/7/20.
 */

$(function(){
    //轮播
    var $register = $("#registerBox .two-people");
    var $login = $("#loginBox");
    $(".ba-img .po-image").eq(0).css("display","block");
    var i = 1;
    setInterval(function(){
        $(".ba-img .po-image").eq(i).fadeIn().siblings().fadeOut();
        i ++;
        if(i >= $(".ba-img .po-image").length){
            i = 0;
        }
    },3000);
    //获取路径函数
    function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) {
            url = window.createObjectURL(file)
        } else if (window.URL != undefined) {
            url = window.URL.createObjectURL(file)
        } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file)
        }
        return url
    }
    //图片上传
    $(".filepath").on("change",function() {
        var srcs = getObjectURL(this.files[0]);   //获取路径
        $(this).nextAll(".img1").hide();
        $(this).nextAll(".img2").show();
        $(this).nextAll('.close').show();
        $(this).parent().siblings(".addimg").hide();
        $(this).nextAll(".img2").attr("src",srcs);
        $(this).val('');    //必须制空
        $(".close").on("click",function() {
            $(this).hide();
            $(this).nextAll(".img2").hide();
            $(this).nextAll(".img1").show();
            $(this).parent().siblings(".addimg").show();
        })
    });
    //注册
    $("#register").on("click",function(){
        var loginD = new Date().getTime();
        $.ajax({
            type: 'post',
            url: '/api/user/register',
            data: {
                myphoto: $register.find('[name="myphoto"]').attr("src"),
                email: $register.find('[name="email"]').val(),
                myname: $register.find('[name="myname"]').val(),
                yourphoto: $register.find('[name="yourphoto"]').attr("src"),
                youremail: $register.find('[name="youremail"]').val(),
                yourname: $register.find('[name="yourname"]').val(),
                password: $register.find('[name="password"]').val(),
                date: $register.find('[name="date"]').val(),
                loginDate: loginD
            },
            dataType: 'json',
            success: function (result) {
                $("#registerBox").find(".err-info").html(result.message);
                if(!result.code){
                    window.setTimeout(function () {
                        location.href = '/user/login';
                    },1000);
                }
            }
        });
    });
    //登录
    $("#login").on("click",function(){
        $.ajax({
            type: 'post',
            url: '/api/user/login',
            data: {
                email: $login.find('[name="email"]').val(),
                password: $login.find('[name="password"]').val()
            },
            dataType: 'json',
            success: function (result) {
                console.log(result);
                $("#loginBox").find(".err-info").html(result.message);
                if(!result.code){
                    window.setTimeout(function () {
                        location.href = '/main';
                    },1000)
                }
            }
        });
    });
});