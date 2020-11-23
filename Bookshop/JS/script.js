async function getResponse()
{
var response = await fetch('https://my-json-server.typicode.com/alexeiburiatov/alexeiburiatov.github.io/db')
var content =  await response.json();
if(content["books"][0]["section"]==2)
{
    console.log(content["books"][0]["sales"]);
}


}




getResponse()
