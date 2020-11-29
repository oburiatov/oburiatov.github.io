class TemplateProcessor{
render ( data){
    const rootNode= document.getElementById('showtable') ;
    rootNode.innerHTML= data;

}
}
export default TemplateProcessor;