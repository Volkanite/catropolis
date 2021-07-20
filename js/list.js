let typeCategorySet = new Set();
let totalItems = [];
let typeFilter = "All";
let currentPage=1;
let totalPage=0;
const numbersInaPage=8
let items_layout_query=document.getElementById('items_layout');


function renderPagitation(){
    let pagination_html="";
    pagination_html+= 
                `<div class="pagination_div">
                    <ul  class="pagination">
                        <li ${(currentPage===1)?'class="disabled"':'onclick="afterPushButtonPutVarIn(1)"'} ><<</li>
                        <li ${(currentPage===1)?'class="disabled"':`onclick="afterPushButtonPutVarIn(${currentPage-1})"`}><</li>
                        ${createPagitationList()}
                        <li ${(currentPage===totalPage)?'class="disabled"':`onclick="afterPushButtonPutVarIn(${currentPage+1})"`}>></li>
                        <li ${(currentPage===totalPage)?'class="disabled"':'onclick="afterPushButtonPutVarIn(totalPage)"'}>>></li>
                    </ul>
                </div>`
                items_layout_query.innerHTML+=pagination_html;
}


function createPagitationList(){
    let totalPage_Array=new Array(totalPage);
    for(let i=1;i<=totalPage;i++){
        totalPage_Array[i]=i;
    }
    return totalPage_Array.reduce((accmulator,currentValue)=>{
        return accmulator+=`<li ${(currentPage===currentValue)?'class="active"':`onclick="afterPushButtonPutVarIn(${currentValue})"`}>${currentValue}</li>`
    },"") //最後要加 " " ：是initial value，加initial value來告訴電腦return value 的type，例如要產出array就加[]
}


function afterPushButtonPutVarIn(page){
    currentPage=page;
    items_layout_query.innerHTML="";
    layoutItems(totalItems);
}


function rerenderItemsByTypeFilter(type) {
    typeFilter = type;
    let filterItems = (typeFilter === "All") ? totalItems : totalItems.filter((item)=>{
        return item.type === type;
    })
    currentPage = 1;
    layoutItems(filterItems);
}


function renderDataFilter() {
    const typeCategoryArray = Array.from(typeCategorySet)
    items_layout_query.innerHTML +=
        `<div id="filter-element" class="filter-element">
            <span>Type:</span>
            <select onchange="rerenderItemsByTypeFilter(this.options[this.selectedIndex].value);">
                <option value="All">All</option>
                ${ typeCategoryArray.reduce((accumulator, currentValue, currentIndex)=>{
                    return accumulator += `<option value="${currentValue}" ${typeFilter === currentValue ? "selected":""}>${currentValue}</option>`
                }, "")}
            </select>
        </div>`
    document.getElementById('filter-division').appendChild(document.getElementById('filter-element'));
}


function getCalculatedId(badIndex){
    return (numbersInaPage * (currentPage - 1)) + badIndex;
}


function layoutItems(items){
    items_layout_query.innerHTML = '<div id="filter-division" class="filter-division"></div>';
    let i = 1;
    let id=0;

    totalPage= Math.floor((items.length-1)/numbersInaPage)+1;
    const itemsInCertainPage=items.slice((currentPage-1)*numbersInaPage,currentPage*numbersInaPage);
    renderPagitation();

    totalItems.forEach(function(item){typeCategorySet.add(item.type);})

    itemsInCertainPage.forEach(function(item){
        let item_html="";

        item_html+="<div class=item>";
        item_html+='<a href="'+"cat.html?id="+ getCalculatedId(i++) +'">';
        item_html+='<div class=item_img><img src="'+item.image_link+'"/></div>';
        item_html+='</a>';
        item_html+='<div><span class=item_name>'+item.name+'</span>';
        item_html+='<span class=item_type>'+item.type+'</span></div>';
        item_html+='<div class=item_body>';
        item_html+='<div class=item_attr><ul><li>age:'+item.age+'</li><li>'+item.gender+'</li><li>'+item.description+'</li></ul></div>';
        item_html+='<button class="adopt-btn" onclick="adoptThisCat(this)" data-id="'+ (id++) +'"> Adopt </button>';
        item_html+='</div>';
        item_html+='</div>';

        items_layout_query.innerHTML+=item_html;
    })
    
    renderPagitation();
    renderDataFilter();
}


//讀取json file，將回傳的內容透過.json()轉成Object。再把裡面所需的資料放進前面寫好的layoutItems()功能裡面
function readJSONFile(file) {
    fetch(file).then(response => {
        return response.json();
    }).then(data => {
        totalItems = data.items;
        layoutItems(totalItems);
        renderCartInfo();
    });
}

readJSONFile("./seeders/item.json")






//Cart
let adoptedNumber=0;
const numberHtml=document.getElementsByClassName("cart-number");
let id=[];

function renderCartInfo(){
    numberHtml[0].innerHTML=`<a href="cart.html?id=${id}" target="_blank"><div class="cart"><i class="bi bi-cart-fill"></i> Cart ${adoptedNumber}</div></a>`;
}

function adoptThisCat(adoptedItemBtn){ //condition need to be replace with id.length within 24hours
    if(id.length<3){
        id_no=Number(adoptedItemBtn.dataset.id);
        id.push(id_no+(currentPage-1)*8);
    }else{
        alert('A person can adopt no more than THREE cats. You can come back tomorow');
    }

    numberHtml.innerHTML="";
    adoptedNumber++;
    numberHtml[0].innerHTML=`<a href="cart.html?id=${id}" target="_blank"><div class="cart"><i class="bi bi-cart-fill"></i> Cart ${adoptedNumber}</div></a>`;
    alert('The Cat Is Added To Your Adoption-Cart!  Click Your Cart To Check Cats You Adopt.');
    
}

