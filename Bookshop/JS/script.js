async function getResponse()
{
var response = await fetch('https://my-json-server.typicode.com/alexeiburiatov/alexeiburiatov.github.io/db')
var content =  await response.json();
if(content["books"][0]["sales"]==1)
{
    var img = document.createElement("IMG");
img.src=content["books"][0]["img-path"];
var pc= document.getElementById("insertimg4");
pc.appendChild(img);
img.src=content["books"][1]["img-path"];
var pc= document.getElementById("insertimg5");
pc.appendChild(img);


    console.log(content["books"][0]["sales"]);
}


}




getResponse()
