import TemplateProcessor from './templateProcessor.js'
import Client from './client.js'
import Router from './router.js'
import SectionHash from './sectionHash.js'

const router = new Router();
const templateProcessor= new TemplateProcessor();
const client= new Client();
const sectionhash= new SectionHash();



function createPage(){
  const  {viewName, endpointName, section, unique_url, catalog } = router.getCurrentState();
  let sbmbtn= document.getElementById('submit-btn')
    sbmbtn.style.display="none"

  if(unique_url=='order')
  {
      let view;

      import ((`./order.js`))
          .then ((viewModule)=> {
              view= viewModule.default;
              return client.getData('books');
          })
          .then((data)=>{
              templateProcessor.render(view(data, books_in_cart ))
          })
  }
    else if(unique_url=='confirmed') {
    }
  else if(unique_url=='cart')
   {
       let view;

       import ((`./cart.js`))
           .then ((viewModule)=> {
               view= viewModule.default;
               return client.getData('books');
           })
           .then((data)=>{
               templateProcessor.render(view(data, books_in_cart ))
           })
       let buybtn= document.getElementById('buy-btn')


if(books_in_cart.length>0)
{

    buybtn.style.display="block"
}
   else{
    buybtn.style.display="none"
}


   }
   else if (unique_url==undefined&&(section=='catalog'||section==undefined))
    {
        let buybtn= document.getElementById('buy-btn')
        buybtn.style.display="none"
            let view;

            import ((`./${viewName}.js`))
                .then ((viewModule)=> {
                    view= viewModule.default;
                    return client.getData(endpointName);
                })
                .then((data)=>{
                    templateProcessor.render(view(data))
                })
    }
    else if (unique_url!=undefined&&section=='catalog') {
       let buybtn= document.getElementById('buy-btn')
       buybtn.style.display="none"

            let viewDesc;
            import ((`./${viewName}.js`))
                .then ((viewModule)=> {
                    viewDesc= viewModule.default;
                    return client.getData(endpointName);
                })
                .then((data)=>{
                    templateProcessor.render(viewDesc(data))
                })


    }
    else if (unique_url!=undefined&&section!='') {

           const {viewName, endpointName, unique_url } = router.getCurrentStatePageDescription();


           let viewDesc;


           import ((`./${viewName}.js`))
               .then ((viewModule)=> {
                   viewDesc= viewModule.default;
                   return client.getData(endpointName);
               })
               .then((data)=>{
                   if(client.isAlaliableURL(data, unique_url)&&client.isAlaliableCatalog(data, section))
                   {
                       templateProcessor.render(viewDesc(data, unique_url, 'url'))
                   }
                   else
                   {
                       url.hash='/'
                       unhiglight()
                       highlight('HomeBtn')
                   }

               })
    }
    else{
            url.hash='/'
            unhiglight()
            highlight('HomeBtn')
    }


}

function createPageConfirmed(ID)
{
    const  {viewName, endpointName, section, unique_url, catalog } = router.getCurrentState();
    let sbmbtn= document.getElementById('submit-btn')
    sbmbtn.style.display="none"

    let view;

    import ((`./confirmed.js`))
        .then ((viewModule)=> {
            view= viewModule.default;
            templateProcessor.render(view(ID))
        })
}




var uniqueID=[],
    price=[],
    books_in_cart=[],
    url=window.location



async function getPrice(){
   let response= await  fetch(`https://my-json-server.typicode.com/alexeiburiatov/alexeiburiatov.github.io/db`)
        .then(response=> response.json())

    response['books'].map((catalogname) =>{
            catalogname[Object.keys(catalogname)].map((blockelement) =>{
                uniqueID.push(blockelement.uniqueID);
                price.push(blockelement.price);
            })
        }
    )
}


window.addEventListener('load', () => {

    getPrice();
    createPage();
    setTimeout(function(){
        var  loader, showtable, showfooter;
        loader= document.getElementById("loader");
        loader.style.display="none";

        showtable= document.getElementById("showtable");
        showtable.style.display="table";

        showfooter= document.getElementById("showfooter");
        showfooter.style.display="flex";


    }, 2500);
})





function DetailsAboutBook(BookID)
{
    const {viewName, endpointName } = router.getCurrentStatePageDescription();
    let viewDesc;

    import ((`./${viewName}.js`))
        .then ((viewModule)=> {
            viewDesc= viewModule.default;
            return client.getData(endpointName);
        })
        .then((data)=>{
            templateProcessor.render(viewDesc(data, BookID, 'uniqueID'))
        })

    var bookElement=document.getElementById(BookID);


};


function unhiglight(){
    let btn;

    btn=document.getElementById('HomeBtn')
    btn.className= 'nav-link'
    btn=document.getElementById('SalesBtn')
    btn.className= 'nav-link'
    btn=document.getElementById('Self-devBtn')
    btn.className= 'nav-link'
    btn=document.getElementById('MotivationalBtn')
    btn.className= 'nav-link'
    btn=document.getElementById('PsychologicalBtn')
    btn.className= 'nav-link'

}

function highlight(idElem)
{
    let btn;

    btn=document.getElementById(idElem)
    btn.className+= ' active'


}

function highlight_right_btn()
{
    let section=window.location.hash.split('#')[1].split('/')[1]
    switch (section){
        case '':
            highlight('HomeBtn')
            break;
        case 'self-development':
            highlight('Self-devBtn')
            break;
        case 'sales':
            highlight('SalesBtn')
            break;
        case 'motivational':
            highlight('MotivationalBtn')
            break;
        case 'psychological':
            highlight('PsychologicalBtn')
            break;

    }

}

function renewQuantity(how_much)
{
    let block=document.getElementById('quantity-block');

    function plural(how_much){
    if(how_much==0||how_much==1)
    {
        return ' book'
    }
    else
        {
        return ' books'
    }
    }
    block.innerHTML=`Cart: ${how_much}${plural(how_much)} `
}

function show_cart()
{
    url.hash='/cart'
    createPage()

}
function show_preorder()
{
    url.hash='/order'
    createPage()
}
function show_order()
{
    var myPhone = document.getElementById('inputPhone').value;
    var myFName = document.getElementById('inputEmail').value;
    var myLName = document.getElementById('inputLName').value;
    var myEmail = document.getElementById('inputEmail').value;

    url.hash='/confirmed'
    client.sendData(1, myFName, myLName, myEmail, myPhone)
    let idd= client.sendData(1, myFName, myLName, myEmail, myPhone)
    console.log(idd)
    createPageConfirmed(idd)
}


window.onclick = function (event) {

    if(event.target.id=='billboardclick')
    {
        unhiglight()
        highlight('SalesBtn')
    }
    if(event.target.id=='cart-btn')
    {
        show_cart();
    }
    if(event.target.id=='buy-btn')
    {
        show_preorder();
    }
    if(event.target.id=='submit-btn')
    {
        show_order();
    }
    if(event.target.id.substr(0,3)=='del')
    {

        for(let i= 0; i<books_in_cart.length;i++)
        {
            if(event.target.id==`del${books_in_cart[i]}`)
            {
                books_in_cart.splice(i, 1)
                renewQuantity(books_in_cart.length)
                show_cart();
                break;
            }
        }
    }


    for(let i= 0; i<uniqueID.length; i++) {

        if (uniqueID[i] === event.target.id) {
            const {endpointName } = router.getCurrentStatePage();
            let viewHash;
            return client.getData(endpointName)
                .then((data)=>{
                    const {hash, section } = sectionhash.getCurrentSectionHash(event.target.id,data )
                    console.log(hash)
                    console.log(section)
                    let newhash= section+'/'+hash
                    url.hash=newhash;
                    DetailsAboutBook(event.target.id);
                })
            break;
        }
    }
    for(let i= 0; i<uniqueID.length; i++) {

        if (uniqueID[i].split("").reverse().join("") === event.target.id) {
            books_in_cart.push(uniqueID[i]);
            renewQuantity(books_in_cart.length)


            break;
        }
    }



}

function ValidPhone() {
    var re = /^\d[\d\(\)\ -]{4,14}\d$/;
    var myPhone = document.getElementById('inputPhone').value;
    var valid = re.test(myPhone);
    if (valid&&myPhone[0]==0&&myPhone.length==10) return true;
    else return false;
}

function ValidMail() {
    var re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    var myMail = document.getElementById('inputEmail').value;
    var valid = re.test(myMail);
    if (valid) return true;
    else return false;
}

function ValidName() {
    var re = /[A-Za-z]{4,15}$/;
    var myName = document.getElementById('inputFName').value;
    var valid = re.test(myName);
    if (valid) return true;
    else return false;
}
window.onhashchange= function (){

    unhiglight()
    highlight_right_btn()
    createPage()
}

function check_all_fields(){
    let btn= document.getElementById("submit-btn")
    let buy_btn=document.getElementById("buy-btn")
    buy_btn.style.display="none"

    if(ValidName()&&ValidMail()&&ValidPhone()&&books_in_cart.length>0)
    {

        btn.style.display="block"
    }
    else
    {
        btn.style.display="none"
    }

}

addEventListener('input', function (event)
{
    if(event.target.id=='inputPhone')
    {
        if(!ValidPhone())
        {
            let inp=document.getElementById('inputPhone')
            inp.className='form-control is-invalid'
            check_all_fields()
        }
        else
        {
            let inp=document.getElementById('inputPhone')
            inp.className='form-control is-valid'
            check_all_fields()
        }
    }

    if(event.target.id=='inputEmail')
    {
        if(!ValidMail())
        {
            let inp=document.getElementById('inputEmail')
            inp.className='form-control is-invalid'
            check_all_fields()
        }
        else
        {
            let inp=document.getElementById('inputEmail')
            inp.className='form-control is-valid'
            check_all_fields()
        }
    }
    if(event.target.id=='inputFName')
    {
        if(!ValidName())
        {
            let inp=document.getElementById('inputFName')
            inp.className='form-control is-invalid'
            check_all_fields()
        }
        else
        {
            let inp=document.getElementById('inputFName')
            inp.className='form-control is-valid'
            check_all_fields()
            console.log('true')
        }
    }

})


//для кнопки Add to cart
addEventListener("mouseover", function( event ) {

    for(let i= 0; i<uniqueID.length; i++)
    {
        if (uniqueID[i].split("").reverse().join("")===event.target.id)
        {
            var new_node;
            var elem;
            elem = document.getElementById(event.target.id)
            elem.innerHTML = '';
            new_node = document.createElement("DIV");
            new_node = document.createTextNode("Add to cart");
            elem.appendChild(new_node);
            break;
        }
    }

})

//для кнопки Add to cart
addEventListener("mouseout", function( event ) {

    for(let i= 0; i<uniqueID.length; i++)
    {
        if (uniqueID[i].split("").reverse().join("")===event.target.id)
        {
            var new_node;
            var elem;
            elem = document.getElementById(event.target.id)
            elem.innerHTML = '';
            new_node = document.createElement("DIV");
            if(price[i].includes('/')){
                // let two_prices= price[i].split['/'];
                // console.log(two_prices[0])
                new_node.innerHTML = price[i].split('/')[0].strike()+'UAH'.strike()+' '+price[i].split('/')[1]+'UAH';

            }
            else{
                new_node = document.createTextNode(price[i]+'UAH');

            }
            elem.appendChild(new_node);
            break;
        }
    }

})