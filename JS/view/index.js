import TemplateProcessor from './templateProcessor.js'
import Client from './client.js'
import Router from './router.js'

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

    