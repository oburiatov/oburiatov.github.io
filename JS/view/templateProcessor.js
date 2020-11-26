class TemplateProcessor{
render (viewName, data){
    const rootNode= document.getElementById('main') ;
    rootNode.innerHTML= data;

}
}
export default TemplateProcessor;