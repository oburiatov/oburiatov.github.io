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
      <th scope="col" >Information</th>
      <th scope="col" >Input Field</th>
    </tr>
  </thead>
    <tr>
        <th scope="row"> First Name</th> 
        <th scope="row">
                <div class="form-group">
  <input type="text" class="form-control" placeholder="Required" id="inputFName">
      <div class="invalid-feedback">Sorry, name is too short. Check?</div>
  <div class="valid-feedback">Success! You've done it.</div>
</div>
</th>

    </tr>
    <tr>
        <th scope="row">Last Name</th> 
        <th scope="row">
                <div class="form-group">
  <input type="text" class="form-control" placeholder="Optional" id="inputLName">
</div>
</th>

    </tr>
    <tr>
        <th scope="row">Email</th> 
        <th scope="row">
                <div class="form-group">
  <input type="text" class="form-control" placeholder="Required" id="inputEmail">
    <div class="invalid-feedback">Sorry, email is invalid. Try another?</div>
  <div class="valid-feedback">Success! You've done it.</div>
</div>
</th>

    </tr>          
    <tr>
        <th scope="row"> Phone</th> 
        <th scope="row">
        <div class="form-group">
  <input type="text" class="form-control" placeholder="Required" id="inputPhone">
  <div class="invalid-feedback">Sorry, phone is invalid. Try another?</div>
  <div class="valid-feedback">Success! You've done it.</div>
</div>
        </th>

    </tr>      

      <tr>
        <th scope="row">Price</th> 
        <th scope="row">${how_much}UAH</th>
    </tr>
  
  
  

`
export default view