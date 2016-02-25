(function () {
    //->数据源
    var ary = ["img/lb1.jpg", "img/lb2.jpg", "img/lb3.jpg", "img/lb4.jpg", "img/lb5.jpg", "img/lb6.jpg"];

    //->定义几个初始的变量
    var autoTimer = null, step = 0, count = ary.length;
    var inner = document.getElementById("showInner"), imgList = inner.getElementsByTagName("img");
    var tip = document.getElementById("tip"), tipList = tip.getElementsByTagName("li");
    var btnLeft = document.getElementById("btnLeft"), btnRight = document.getElementById("btnRight");

    //->数据绑定
    bindData();
    function bindData() {
        //->图片
        var str = "";
        for (var i = 0; i < ary.length; i++) {
            str += "<div><img src='' trueImg='" + ary[i] + "'/></div>";
        }
        str += "<div><img src='' trueImg='" + ary[0] + "'/></div>";
        inner.innerHTML = str;
        inner.style.width = (count + 1) * 730 + "px";

        //->焦点
        str = "";
        for (i = 0; i < ary.length; i++) {
            str += "<li></li>";
        }
        tip.innerHTML = str;
        selectTip();
    }

    //->图片延迟加载
    window.setTimeout(lazyImg, 500);
    function lazyImg() {
        for (var i = 0; i < imgList.length; i++) {
            ~function (i) {
                var curImg = imgList[i];
                var oImg = new Image;
                oImg.src = curImg.getAttribute("trueImg");
                oImg.onload = function () {
                    curImg.src = this.src;
                    curImg.style.display = "block";
                    animate(curImg, {opacity: 1}, 500);
                }
            }(i);
        }
    }

    //->实现焦点样式的选中
    function selectTip() {
        var tempStep = step;
        tempStep >= tipList.length ? tempStep = 0 : null;
        for (var i = 0; i < tipList.length; i++) {
            tipList[i].className = i === tempStep ? "bg" : null;
        }
    }

    //->实现点击焦点切换轮播图
    tipMove();
    function tipMove() {
        for (var i = 0; i < tipList.length; i++) {
            var curTip = tipList[i];
            curTip.index = i;
            curTip.onclick = function () {
                window.clearInterval(autoTimer);
                step = this.index;
                animate(inner, {left: -step * 730}, 500);
                selectTip();
                autoTimer = window.setInterval(autoMove, 2000);
            }
        }
    }

    //->实现左右切换
    btnRight.onclick = function () {
        window.clearInterval(autoTimer);
        autoMove();
        autoTimer = window.setInterval(autoMove, 2000);
    };

    btnLeft.onclick = function () {
        window.clearInterval(autoTimer);
        step--;
        if (step < 0) {
            step = count - 1;
            inner.style.left = -count * 730 + "px";
        }
        animate(inner, {left: -step * 730}, 500);
        selectTip();
        autoTimer = window.setInterval(autoMove, 2000);
    };
    
    //->实现自动轮播
    function autoMove() {
        step++;
        if (step > count) {
            step = 1;
            inner.style.left = 0;
        }
        animate(inner, {left: -step * 730}, 500);
        selectTip();
    }

    autoTimer = window.setInterval(autoMove, 2000);
})();