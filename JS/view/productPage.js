const view = (products)=>{
    <tr>
    <th scope="row" class="PicSales ">
        <div class=" card mb-3 card-header TextTitle">Self-development</div>
        <div class="card border-info mb-3  first-block block-size" style="max-width: 40%;">
            <div class="card-header " id="author-name1"></div>
            <div class="card-body" id="picture-box1">
                <h4 class="card-title" id="title-name1"></h4>
            </div>
            <button type="button" class="btn btn-secondary btn-dscrp1">Description</button>
            <button type="button" class="btn btn-secondary" id="btn-price1" onmouseover="changeToBuy(1)" onmouseout="changeToPrice(1)" ></button>
        </div>
        <div class="card border-info mb-3  first-block block-size" style="max-width: 40%;">
            <div class="card-header " id="author-name2"></div>
            <div class="card-body" id="picture-box2">
                <h4 class="card-title" id="title-name2"></h4>
            </div>
            <button type="button" class="btn btn-secondary btn-dscrp2">Description</button>
            <button type="button" class="btn btn-secondary" id="btn-price2" onmouseover="changeToBuy(2)" onmouseout="changeToPrice(2)"></button>
        </div>
        <div class="card border-info mb-3  first-block block-size" style="max-width: 40%;">
            <div class="card-header " id="author-name3"></div>
            <div class="card-body" id="picture-box3">
                <h4 class="card-title" id="title-name3"></h4>
            </div>
            <button type="button" class="btn btn-secondary btn-dscrp3">Description</button>
            <button type="button" class="btn btn-secondary" id="btn-price3" onmouseover="changeToBuy(3)" onmouseout="changeToPrice(3)"></button>
        </div>
        <div class="card border-info mb-3  first-block block-size" style="max-width: 40%;">
            <div class="card-header " id="author-name4"></div>
            <div class="card-body" id="picture-box4">
                <h4 class="card-title" id="title-name4"></h4>
            </div>
            <button type="button" class="btn btn-secondary btn-dscrp4">Description</button>
            <button type="button" class="btn btn-secondary" id="btn-price4" onmouseover="changeToBuy(4)" onmouseout="changeToPrice(4)"></button>
        </div>
    </th>
</tr>
}