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

function RightCatalog(dataObject)
{
    let SalesObject=[]

    dataObject.map((catalogname) =>{

        if (Object.keys(catalogname)=='psychological')
        {

            catalogname[Object.keys(catalogname)].map((product)=>{
                    SalesObject.push(product)
                }
            )



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
                        <tr>
                <th scope="row" class="PicSales ">
                <div class=" card mb-3 card-header TextTitle"> Psychological </div>
${RightCatalog(data).map((blockelement) =>`
                    <div class="card border-info mb-3  first-block block-size" style="max-width: 40%;">
                        <div class="card-header "> ${blockelement.author}</div>
                        <div class="card-body">
                            <h4 class="card-title">${blockelement.name}</h4>
                            <img src="${blockelement.images}" alt="${blockelement.url}" />
                        </div>
                        <button type="button" class="btn btn-secondary" id="${blockelement.uniqueID}">Description</button>
                        <button type="button" class="btn btn-secondary" id="${blockelement.uniqueID.split("").reverse().join("")}">${actualPrice(blockelement.price).strike()} ${noDiscount(blockelement.price)}</button>
                    </div>
                    </div> 
                
                
`).join("")}
</tr>
</tbody>
`
export default view