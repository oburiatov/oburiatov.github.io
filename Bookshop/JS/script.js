async function getResponse()
{
var response = await fetch('https://my-json-server.typicode.com/alexeiburiatov/alexeiburiatov.github.io/db')
var content =  await response.json();
console.log(content["books"][0]);

}




getResponse()
