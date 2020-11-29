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

function returnRightData(data, Key, whatIsKey)
{
    let a;

    data.forEach(
        function (category){
            category[Object.keys(category)].forEach(
                function (product){
                    if (whatIsKey=='uniqueID') {
                        if (product.uniqueID == Key) {
                            a = product
                        }
                    }
                    else if (whatIsKey=='url')
                    {
                        if (product.url == Key) {
                            a = product
                        }
                    }
                }
            )
        }
    )
        return a

}


const viewproductDescription = (data, Key, whatIsKey, Rightdata=returnRightData(data,Key, whatIsKey)) =>`
        <thead>
        <tr>
            <th class="TextHeader " colspan="2">BookShop "PROЧИТАЙ"</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        
        <th scope="row" class="SingleElem"> 
        <div class="card border-info mb-3  first-block block-size" style="max-width: 40%;">
                        <div class="card-header "> ${Rightdata.author}</div>
                        <div class="card-body">
                            <h4 class="card-title">${Rightdata.name}</h4>
                            <img src="${Rightdata.images}" alt="${Rightdata.url}" />
                        </div>
                        <button type="button" class="btn btn-secondary" id="${Rightdata.uniqueID.split("").reverse().join("")}"" >${actualPrice(Rightdata.price).strike()} ${noDiscount(Rightdata.price)}</button>
        </th>
        <th scope="row" class="SingleElemDescr">
        <div>
                <div class="makeBold">Назва книги:</div>
                ${Rightdata.name}
        </div>
        <div>
                <div class="makeBold">Автор:</div>
                ${Rightdata.author}
        </div>
        <div>
                <div class="makeBold">Жанр:</div>
                ${Rightdata.genre}
        </div>
        <div>
                <div class="makeBold">Рік публікації:</div>
                ${Rightdata.year}
        </div>
        <div>
                <div class="makeBold">Видавництво:</div>
                ${Rightdata.publisher}
        </div>
        <div>
                <div class="makeBold">Про що:</div>
                ${Rightdata.description}
        </div>

        
        </th>
</tr>
        
        </tbody>





`

export default viewproductDescription