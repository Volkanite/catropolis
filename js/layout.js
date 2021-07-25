
/*
$("header").load("layout/header.html", function () {
    const numberHtml = document.getElementsByClassName("cart-number");
    let user = $.cookie("user");

    $.get(` https://catropolis-55dac-default-rtdb.firebaseio.com/User-Cart/${user}/.json`, null, function (res) {
        adoptedNumber = Object.keys(res).length;
        numberHtml[0].innerHTML = `<a href="cart.html" target="_blank"><div class="cart"><i class="bi bi-cart-fill"></i> Cart ${adoptedNumber}</div></a>`;
    });

})
*/


$("header").load("layout/header.html", function () {
    const numberHtml = document.getElementsByClassName("cart-number");
    let user = $.cookie("user");
    var g_cartShowed = true;

    var params = new URLSearchParams(window.location.search);
    g_cartShowed = params.get("g_cartShowed");
    console.log(g_cartShowed);

    if (g_cartShowed == false) {
        console.log(g_cartShowed);
        return;
    } else {
        $.get(` https://catropolis-55dac-default-rtdb.firebaseio.com/User-Cart/${user}/.json`, null, function (res) {
            if(res==null){
                adoptedNumber=0;
            }else{
                adoptedNumber=Object.keys(res).length;
            }
            numberHtml[0].innerHTML=`<a href="cart.html" target="_blank"><div class="cart"><i class="bi bi-cart-fill"></i> Cart ${adoptedNumber}</div></a>`;
        });
    }


})