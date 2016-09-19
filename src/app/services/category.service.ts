import { Injectable } from '@angular/core';
import { API_CONSTANTS } from './../consts';
import { ReferenceService } from './reference.service';
import { Http, Jsonp, RequestOptions, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class CategoryService {

  constructor(
    private http: AuthHttp,
    private referenceService: ReferenceService
  ) { }

  list() {
    return this.http.get(API_CONSTANTS.api.categories.listType + 'default');
  }

  type(type: string) {
    return this.http.get(API_CONSTANTS.api.categories.listType + type);
  }

  get() { }

  save(obj) {
    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json;charset=UTF-8'
      })
    });
    this.referenceService.clearCategories();
    this.referenceService.clearSubCategories();
    return this.http.post(API_CONSTANTS.api.categories.save, JSON.stringify(obj), options);
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
    this.referenceService.clearCategories();
    this.referenceService.clearSubCategories();
    return this.http.post(API_CONSTANTS.api.categories.delete, JSON.stringify(q), options);
  }

}
