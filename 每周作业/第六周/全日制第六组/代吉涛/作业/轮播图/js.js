
(function () {
    var ary = ["img/0.jpg", "img/1.jpg", "img/2.jpg", "img/3.jpg"];
    var autoTimer = null, step = 0, count = ary.length;
    var inner = document.getElementById("inner");
    var imgList = inner.getElementsByTagName("img");
    var tip = document.getElementById("tip");
    var tipList = tip.getElementsByTagName("li");
    var btnLeft = document.getElementById("btnLeft");
    var btnRight = document.getElementById("btnRight");
    function bindData() {
        var str = "";
        for (var i = 0; i < ary.length; i++) {
            str += "<div><img src='' trueImg='" + ary[i] + "'></div>"
        }
        str += "<div><img src='' trueImg='" + ary[0] + "'></div>"
        inner.innerHTML = str;
        inner.style.width = (count + 1) * 500 + "px";
        str = "";
        for (var i = 0; i < ary.length; i++) {
            str += "<li></li>"
        }
        tip.innerHTML = str;
        selectTip();
    }
    bindData()
    window.setTimeout(lazyImg, 500);
    function lazyImg() {
        for (var i = 0; i < imgList.length; i++) {
            !function (i) {
                var curImg = imgList[i];
                var oImg = new Image;
                oImg.src = curImg.getAttribute("trueImg");
                oImg.onload = function () {
                    curImg.src = this.src;
                    curImg.style.display = "block";
                    animate(curImg, {opacity: 1}, 500);
                }
            }(i)
        }
    }

    function selectTip() {
        var tempStep = step;
        tempStep >= tipList.length ? tempStep = 0 : null
        for (var i = 0; i < tipList.length; i++) {
            tipList[i].className = i === tempStep ? "bg" : null;
        }
    }

    tipMove()
    function tipMove() {
        for (var i = 0; i < tipList.length; i++) {
            var curTip = tipList[i];
            curTip.index = i;
            curTip.onclick = function () {
                window.clearInterval(autoTimer);
                step = this.index;
                animate(inner, {left: -step * 500}, 500);
                selectTip();
                autoTimer = window.setInterval(autoMove, 2000);
            }
        }
        btnRight.onclick = function () {
            window.clearInterval(autoTimer);
            autoMove();
            autoTimer = window.setInterval(autoMove, 2000);
        }
        btnLeft.onclick = function () {
            window.clearInterval(autoTimer);
            step--;
            if (step < 0) {
                step = count - 1;
                inner.style.left = -count * 500 + "px";
            }
            animate(inner, {left: -step * 500}, 500);
            selectTip()
            autoTimer = window.setInterval(autoMove, 2000)
        }
        function autoMove() {
            step++;
            if (step > count) {
                step = 1;
                inner.style.left = 0;
            }
            animate(inner, {left: -step * 500}, 500);
            selectTip();
        }

        autoTimer = window.setInterval(autoMove, 2000)
    }
})()