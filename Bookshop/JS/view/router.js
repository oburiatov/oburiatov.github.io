class Router {
    getCurrentState() {
        let viewName = '';
        let endpointName = '';
        let unique_url;
        let section;
        let catalog;
        let curr_hash = window.location.hash;
        let hashValue = curr_hash.split('#')[1];
        if (hashValue.includes('/') && hashValue.split('/')[0] !== '') {
            unique_url = curr_hash.split('#')[1].split('/')[1]
            section = curr_hash.split('#')[1].split('/')[0]
            switch (curr_hash.split('#')[1].split('/')[1]) {
                case 'self-development':
                    viewName = 'Self-developmentPage'
                    endpointName = 'books'
                    catalog = 'self-development'
                    section = 'catalog'
                    break;
                case 'motivational':
                    viewName = 'MotivationalPage'
                    endpointName = 'books'
                    catalog = 'motivational'
                    section = 'catalog'
                    break;
                case 'psychological':
                    viewName = 'PsychologicalPage'
                    endpointName = 'books'
                    catalog = 'psychological'
                    section = 'catalog'
                    break;
                case 'sales':
                    viewName = 'salesPage'
                    endpointName = 'books'
                    catalog = 'sales'
                    section = 'catalog'
                    break;

                default:
                    break;
            }

        }
        else if (curr_hash.split('#')[1].includes('/') && curr_hash.split('#')[1].length == 1) {
            switch (curr_hash.split('#')[1]) {
                case '/':
                    viewName = 'mainPage'
                    endpointName = 'db'
                    break;
                case 'Self-development':
                    viewName = 'Self-developmentPage'
                    endpointName = 'books'
                    break;
                case 'Motivational':
                    viewName = 'MotivationalPage'
                    endpointName = 'books'
                    break;
                case 'Psychological':
                    viewName = 'PsychologicalPage'
                    endpointName = 'books'
                    break;

                default:
                    break;
            }

        }
        else if (curr_hash.split('#')[1].includes('/') && curr_hash.split('#')[1].length != 1 && curr_hash.split('#')[1].split('/')[1] != '') {
            unique_url = curr_hash.split('#')[1].split('/')[1]
            section = curr_hash.split('#')[1].split('/')[0]
            viewName = 'productDescription'
            endpointName = 'books'
        }
        return {
            viewName,
            endpointName,
            section,
            unique_url
        };
    }
    getCurrentStatePage() {
        let endpointName = 'books'
        return { endpointName };
    }
    getCurrentStatePageDescription() {

        let viewName = 'productDescription'
        let endpointName = 'books';
        let curr_hash = window.location.hash
        let unique_url = curr_hash.split('#')[1].split('/')[1]
        return { viewName, endpointName, unique_url };

    }

}

export default Router;
