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

function isSale(dataObject)
{
    let SalesObject=[]
    dataObject[Object.keys(dataObject)].map((product)=>{

    if (product.sales==1)
    {
         SalesObject.push(product)


    }})
   return SalesObject;
}

const view = (data) => `
        <thead>
        <tr>
            <th class="TextHeader ">BookShop "PROЧИТАЙ"</th>
        </tr>
        </thead>
        <tbody>
${data.map((catalogname) =>`
                <tr>
                <th scope="row" class="PicSales ">
                <div class=" card mb-3 card-header TextTitle"> ${Object.keys(catalogname)} </div>
${isSale(catalogname).map((blockelement) =>`
                    <div class="card border-info mb-3  first-block block-size" style="max-width: 40%;">
                        <div class="card-header "> ${blockelement.author}</div>
                        <div class="card-body">
                            <h4 class="card-title">${blockelement.name}</h4>
                            <img src="${blockelement.images}" alt="${blockelement.url}" />
                        </div>
                        <button type="button" class="btn btn-secondary" id="${blockelement.uniqueID}">Description</button>
                        <button type="button" class="btn btn-secondary" id="${blockelement.uniqueID.split("").reverse().join("")}"" >${actualPrice(blockelement.price).strike()} ${noDiscount(blockelement.price)}</button>
                    </div>
                   
`).join("")}
                    </div> 
                </tr>
                
`).join("")}
</tbody>
`
export default view