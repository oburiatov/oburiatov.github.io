var img =[10], 
    getelemByid_img=[10], 
    title=[10], 
    getelemByID_title=[10], 
    author=[10], 
    getelemByID_author=[10],
    price=[10],
    how_much=[10], isCheaper=[10],
    getelemByID_btn_price=[10],
    response, content
    var use_id=[10];
    var use_descrp_class=[10];


async function getResponse()
{
 response = await fetch('https://my-json-server.typicode.com/alexeiburiatov/alexeiburiatov.github.io/db');
content =  await response.json();

var num;
var elem_name;


var billboard= document.getElementById("billboard1");
var billboard_place=document.createElement("IMG");
billboard_place.src=content["billboard"][0]["image"];
billboard.appendChild(billboard_place);

for(var i = 0; i<10; i++)
{

num=i+1;
elem_name= "btn-dscrp"+num.toString();

use_id[i]=document.createElement("div");
use_id[i].id=content["books"][i]["uniqueID"];
use_descrp_class[i]= document.getElementByClassName(elem_name).appendChild(use_id[i]);


elem_name= "author-name"+num.toString();

getelemByID_author[i]= document.getElementById(elem_name);
author[i]=document.createElement("DIV");
author[i]=document.createTextNode(content["books"][i]["author"]);
getelemByID_author[i].appendChild(author[i]);

elem_name= "title-name"+num.toString();

getelemByID_title[i]= document.getElementById(elem_name);
title[i]=document.createElement("DIV");
title[i]=document.createTextNode(content["books"][i]["name"]);
getelemByID_title[i].appendChild(title[i]);


elem_name= "picture-box"+num.toString();

getelemByid_img[i]= document.getElementById(elem_name);
img[i]=document.createElement("IMG");
img[i].src=content["books"][i]["images"];
getelemByid_img[i].appendChild(img[i]);

elem_name= "btn-price"+num.toString();

getelemByID_btn_price[i]= document.getElementById(elem_name);
price[i]=document.createElement("DIV");
how_much[i]= content["books"][i]["price"];
isCheaper[i]=content["books"][i]["sales"];



if(content["books"][i]["sales"]==1){
const two_prices= how_much[i].split('/');
getelemByID_btn_price[i].innerHTML+=(two_prices[0]+ "UAH").strike();
price[i]=document.createTextNode(" "+two_prices[1] + "UAH");
getelemByID_btn_price[i].appendChild(price[i]);

}
else{
    price[i]=document.createTextNode(how_much[i] + "UAH");
    getelemByID_btn_price[i].appendChild(price[i]);
}
////////////////////////////////////////////////////////////////////////////////

}







}




window.addEventListener('load', () => {
    setTimeout(function(){
    var  loader, showtable, showfooter;
     loader= document.getElementById("loader");
    loader.style.display="none";
    
    showtable= document.getElementById("showtable");
    showtable.style.display="block";
    
    showfooter= document.getElementById("showfooter");
    showfooter.style.display="block";

    getResponse()

    }, 1500);

})



function changeToBuy(pos)
{

    var new_node;
    getelemByID_btn_price[pos-1].innerHTML = '';
    new_node=document.createElement("DIV");
    new_node=document.createTextNode("Add to cart");
    getelemByID_btn_price[pos-1].appendChild(new_node);
}

function changeToPrice(pos)
{

    var new_node;
    getelemByID_btn_price[pos-1].innerHTML = '';
    if(isCheaper[pos-1]==1){
console.log("true");
        const two_prices= how_much[pos-1].split('/');
        getelemByID_btn_price[pos-1].innerHTML+=(two_prices[0]+ "UAH").strike();
        price[pos-1]=document.createTextNode(" "+two_prices[1] + "UAH");
        getelemByID_btn_price[pos-1].appendChild(price[pos-1]);
        
        }
    else{
            price[pos-1]=document.createTextNode(how_much[pos-1] + "UAH");
            getelemByID_btn_price[pos-1].appendChild(price[pos-1]);
        }




}

function DetailsAboutBook(BookID)
{

var bookElement=document.getElementById(BookID);
bookElement.innerHTML=''

};




window.onclick = function (event) {
    console.log(event.target.id)
        DetailsAboutBook(event.target.id);
}


