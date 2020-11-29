
const view = (ID) => `
  <thead >
    <tr>
      <th scope="col" >Status</th>
      <th scope="col" >About</th>
    </tr>
  </thead>
    <tr>
        <th scope="row">Congrats! Your order confirmed!!</th> 
        <th scope="row">Your OrderID is: ${ID}</th>
    </tr>
`
export default view