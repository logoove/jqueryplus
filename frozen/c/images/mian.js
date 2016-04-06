//随机读取题目
function InitTopic() {
    $.ajax({
        async: false,
        //请求方式
        type: "GET",
        //请求的地址
        url: "AjaxCommon.aspx",
        data: "action=Topic&random=" + Math.random(),
        success: function(retdata) {
            if (retdata != "nothing") {
                window.location.href = "topic" + retdata + ".html";
            }
        }
    });
}
//提交题目答案
function SubmitAnswer(Topic, Answer) {
    $.ajax({
        async: false,
        //请求方式
        type: "GET",
        //请求的地址
        url: "AjaxCommon.aspx",
        data: "action=SubmitAnswer&Topic=" + Topic + "&Answer=" + Answer + "&random=" + Math.random(),
        success: function(retdata) {
            if (retdata != "nothing") {
                if (retdata == 1) {
                    window.location.href = "succeed1.html";
                } else if (retdata == 3) {
                    window.location.href = "failure.html";
                } else {
                    InitTopic();
                }
            }
        }
    });
}

//查询答案了几题
function QueryAnswer() {
    $.ajax({
        //请求方式
        type: "GET",
        //请求的地址
        url: "AjaxCommon.aspx",
        data: "action=QueryAnswer&random=" + Math.random(),
        success: function(retdata) {
            if (retdata != "nothing") {
                $("#QueryAnswer").html(retdata);
            }
        }
    });
}

//抽奖
function PumpingAward(Award) {
    alert("活动已结束！");
//    $.ajax({
//        async: false,
//        //请求方式
//        type: "GET",
//        //请求的地址
//        url: "AjaxCommon.aspx",
//        data: "action=PumpingAward&random=" + Math.random(),
//        success: function(retdata) {
//            if (retdata != "nothing") {
//                if (retdata == 1) {
//                    $("#succeed_popupBlock1").fadeIn();
//                    $(".succeed_content").eq(0).hide();
//                    $(".succeed_content").eq(1).show();
//                } else if (retdata == 2) {
//                    $("#succeed_popupBlock2").fadeIn();
//                    $(".succeed_content").eq(0).hide();
//                    $(".succeed_content").eq(1).show();
//                } else if (retdata == 9) {
//                    alert("您已抽过奖哦！");
//                } else {
//                    $("#succeed_popupBlock3").fadeIn();
//                }
//            }
//        }
//    });
}