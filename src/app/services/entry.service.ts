import { Injectable } from '@angular/core';
import { API_CONSTANTS } from './../consts';
import { Http, Jsonp, RequestOptions, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class EntryService {

  constructor(
    private http: AuthHttp
  ) { }

  update(id, obj) {
        let q = {
            query: { _id: id },
            obj: obj
        }
        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json;charset=UTF-8'
            })
        });
        return this.http.post(API_CONSTANTS.api.entries.update, JSON.stringify(q), options);
    }    
    delete(id) {
       let q = {
            query: { _id: id },
        }
        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json;charset=UTF-8'
            })
        });
        return this.http.post(API_CONSTANTS.api.entries.delete, JSON.stringify(q), options);
    }

    getByCountry(countryId) {
        return this.http.get(API_CONSTANTS.api.entries.getByCountry + countryId);
    }
    create(obj) {
        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json;charset=UTF-8'
            })
        });
        return this.http.post(API_CONSTANTS.api.entries.create, JSON.stringify(obj), options)
    }  
}
