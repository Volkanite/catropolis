//----------------Cart--------------------

let adoptedNumber=0;
const numberHtml=document.getElementsByClassName("cart-number");
let id=[];


//Delete it after sign-in system built
$(document).ready(function(){
    if(!$.cookie("user")||$.cookie("user")===null){
        let user=prompt("Please enter User name","Type your name here");
        $.cookie("user",user);
    }
});


function renderCartInfo(){
    let user = $.cookie("user");
    $.get(` https://catropolis-55dac-default-rtdb.firebaseio.com/User-Cart/${user}/.json`, null, function (res) {

        if(res==null){
            adoptedNumber=0;
        }else{
            adoptedNumber=Object.keys(res).length;
        }
        numberHtml[0].innerHTML=`<a href="cart.html" target="_blank"><div class="cart"><i class="bi bi-cart-fill"></i> Cart ${adoptedNumber}</div></a>`;
        
    });
};


function adoptThisCat(adoptedItemBtn){ 
    let id_no=Number(adoptedItemBtn.dataset.id);
    let catID=(id_no+(currentPage-1)*8);
    let x=0;
    let user = $.cookie("user");

    function sendToDB(){
        let data={
            id:catID
        };
        firebase.database().ref("User-Cart/" + user ).push(data, function (error) {    //set丟指定的資料; push自動給一個key值 ;data後面的func是 callback function,會在前面資料拿到之後才執行
            if (error) {
                console.log(error); 
            } else {
                alert('The Cat Is Added To Your Adoption-Cart!  Click Your Cart To Check Cats You Adopt.');
            }
            renderCartInfo();
        }) 
    }
    
    id.forEach(function(id){
        if(id==catID){
            return;
        }else{
            x++;
        };
    })

    if(x==id.length){
        console.log(catID);
        id.push(catID);
        sendToDB();

    }else{
        alert('This Cat is Already In The Cart.');
        return;
    }  
}
