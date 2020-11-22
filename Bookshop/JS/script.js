async function getResponse()
{
var response = await fetch('https://raw.githubusercontent.com/alexeiburiatov/alexeiburiatov.github.io/master/Bookshop/JSON/data.json')
var content =  await response.json();
// console.log(content);

}




getResponse()
