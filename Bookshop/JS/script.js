var img =[10], 
    getelemByid_img=[10], 
    title=[10], 
    getelemByID_title=[10], 
    author=[10], 
    getelemByID_author=[10],
    response, content



async function getResponse()
{
 response = await fetch('https://my-json-server.typicode.com/alexeiburiatov/alexeiburiatov.github.io/db');
content =  await response.json();

var num;
var elem_name;

for(var i = 0; i<10; i++)
{

num=i+1;
elem_name= "author-name"+num.toString();

getelemByID_author[i]= document.getElementById(elem_name);
author[i]=document.createElement("DIV");
author[i]=document.createTextNode(content["books"][i]["name"]);
getelemByID_author[i].appendChild(author[i]);

elem_name= "picture-box"+num.toString();

getelemByid_img[i]= document.getElementById(elem_name);
img[i]=document.createElement("IMG");
console.log(content["books"][i]["images"])
img[i].src=content["books"][i]["images"];
getelemByid_img[i].appendChild(img[i]);


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


