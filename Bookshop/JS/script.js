async function getResponse()
{
var response = await fetch('https://jsonplaceholder.typicode.com/users')
console.log(response);

}

getResponse()
