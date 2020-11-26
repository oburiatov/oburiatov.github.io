class Router {
    getCurrentState() {
        let viewName = '';
        let endpointName = '';
        switch (window.location.hash.split('#')[1]) {
            case 'products':
                viewName = 'productPage'
                endpointName = 'books';
                break;
            default:
                break;
        }
        return{
            viewName,
            endpointName
        };
    }
}