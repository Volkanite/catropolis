

$( "header" ).load( "layout/header.html",function(){
    const numberHtml=document.getElementsByClassName("cart-number");
    let user = $.cookie("user");
    
        $.get(` https://catropolis-55dac-default-rtdb.firebaseio.com/User-Cart/${user}/.json`, null, function (res) {
            console.log(res);
            let adoptedNumber=Object.keys(res).length;
            numberHtml[0].innerHTML=`<a href="cart.html" target="_blank"><div class="cart"><i class="bi bi-cart-fill"></i> Cart ${adoptedNumber}</div></a>`;
        });
   
} )


