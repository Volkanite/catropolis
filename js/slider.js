

//console.log(100)

let items=document.querySelectorAll("div img");
let currentIndex=0;
function scro_img(){
  for(let index=0;index<items.length;index++){
    items[index].setAttribute("style","display:none");
    items[index].classList.add("fade");  //這是幫element加上class的好方法，如果不想一個一個複製貼上
  }
  items[currentIndex].setAttribute("style","display:block");
}

function go_pre(){
  if(currentIndex==0){
    currentIndex=items.length-1;
  }else{
    currentIndex--;
  }
  scro_img();
}

function go_nxt(){
  if(currentIndex==items.length-1){
    currentIndex=0;
  }else{
    currentIndex++;
  }
  scro_img();
}

function sleep(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function start_slide(ms)
{
    while(1)
    {
        go_nxt();

        await sleep(ms);
    }
}

function slide_show()
{
    start_slide(5000);
}

scro_img();
slide_show();
