function actualPrice (price){
    if(price.split('/')[1]==undefined) {
        return ''
    }
    return `${price.split('/')[0]}UAH`

}
function noDiscount(price)
{
    if(price.split('/')[1]==undefined)
    {
        return `${price.split('/')[0]}UAH`
    }
    else
        return ` ${price.split('/')[1]}UAH`
}

function CartArray(dataObject, books_in_cart)
{
    let cart_arr=[]
var how_much=0;
    for(let i =0; i<books_in_cart.length;i++)
    {
        dataObject.map((catalog)=>{
            catalog[Object.keys(catalog)].map((book)=>{

                if (book.uniqueID==books_in_cart[i])
                {
                    if(book.sales==0)
                    {
                        how_much= how_much+Number(book.price)
                    }
                    else
                    {
                        how_much=how_much+Number(book.price.split('/')[1])
                    }
                    cart_arr.push(book)
                }
            })

        })
    }

    return {cart_arr, how_much};
}

const view = (data, books_in_cart, {cart_arr, how_much}=CartArray(data, books_in_cart)) => `
  <thead >
    <tr>
      <th scope="col" >Number</th>
      <th scope="col" >Unique ID</th>
      <th scope="col">Name</th>
      <th scope="col">Author</th>
      <th scope="col">Price</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  ${cart_arr.map((book, index)=>`

    <tr>
        <th scope="row">${index+1}</th> 
        <th scope="row">${book.uniqueID}</th>
        <th scope="row">${book.name}</th>
        <th scope="row">${book.author}</th>
        <th scope="row">${actualPrice(book.price).strike()} ${noDiscount(book.price)}</th>
        <th scope="row"><button type="button" class="btn btn-primary" id="del${book.uniqueID}">Delete</button></th>
    </tr>
      
      
`).join("")
}
      <tr>
        <th scope="row"></th> 
        <th scope="row"></th> 
        <th scope="row"></th> 
        <th scope="row">Price</th> 
        <th scope="row">${how_much}UAH</th>
        <th scope="row"></th> 
    </tr>
  
  
  

`
export default view