class Client{

    async getData(endpoint){
        return await fetch(`https://my-json-server.typicode.com/alexeiburiatov/alexeiburiatov.github.io/${endpoint}`)
            .then(response=> response.json())
    };
    sendData(id, FName, LName, Email,Phone){

       return fetch(`https://my-json-server.typicode.com/alexeiburiatov/alexeiburiatov.github.io/conf`, {
            method:'POST',
            body: JSON.stringify({id:id, FN:FName, LN:LName, Em:Email, Ph:Phone})})
                .then(response=>response.json())


    }
    isAlaliableURL(data, url){
        let isHere= false
        data.map((catalogname)=>{
            catalogname[Object.keys(catalogname)].map((blockelement) =>{
                if(blockelement.url==url){isHere=true}
            })
        })
        return isHere
    }
    isAlaliableCatalog(data, catalog){
        let isHere= false
        data.map((catalogname)=>{

                if(Object.keys(catalogname)==catalog){isHere=true}

        })
        return isHere
    }



}

export default Client