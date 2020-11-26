import TemplateProcessor from 'view/templateProcessor.js'
import Client from 'view/client.js'
import Router from 'view/router.js'

const router = new Router();
const templateProcessor= new TemplateProcessor();
const client= new Client();

const {viewName, endpointName } = router.getCurrentState();

let view;
import (view/$(viewName).js)
    .then ((viewModule)=> {
    view= viewModule.default;
    return client.getData(endpointName);
    })
    .then ((data) =>{
        templateProcessor.render((view(data)));
    });

    