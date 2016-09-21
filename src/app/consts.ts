import { environment } from './../environments/environment';
let consts;
if (environment.production) {
    consts = {
        baseUrl: '/',
        upload: '/uploadcsv',
        api: {
            countries: {
                create: '/api/country',
                delete: '/api/remove/country',
                list: '/api/countries',
                get: '/api/country/',
                fields: '/api/fields/country',
                update: '/api/update/country'
            },
            entries: {
                update: '/api/update/entry',
                create: '/api/entry',
                getByCountry: '/api/entry/country/',
                delete: '/api/remove/entry',
            },
            categories: {
                listType: '/api/category/type/',
                list: '/api/categories',
                save: '/api/category',
                get: '/api/category/id',
                delete:'/api/category/remove'
            }
        }
    }
} else {
    consts = {
        baseUrl: '/',
        upload: 'http://localhost:5000/uploadcsv',
        api: {
            countries: {
                create: 'http://localhost:5000/api/country',
                delete: 'http://localhost:5000/api/remove/country',
                list: 'http://localhost:5000/api/countries',
                get: 'http://localhost:5000/api/country/',
                fields: 'http://localhost:5000/api/fields/country',
                update: 'http://localhost:5000/api/update/country'
            },
            entries: {
                update: 'http://localhost:5000/api/update/entry',
                create: 'http://localhost:5000/api/entry',
                getByCountry: 'http://localhost:5000/api/entry/country/',
                delete: 'http://localhost:5000/api/remove/entry',
            },
            categories: {
                listType: 'http://localhost:5000/api/category/type/',
                list: 'http://localhost:5000/api/categories',
                save: 'http://localhost:5000/api/category',
                get: 'http://localhost:5000/api/category/id',
                delete:'http://localhost:5000/api/category/remove'
            }
        }
    }
}

export var API_CONSTANTS = consts;