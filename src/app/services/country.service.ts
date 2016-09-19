import { Injectable } from '@angular/core';
import { API_CONSTANTS } from './../consts';
import { Http, Jsonp, RequestOptions, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class CountryService {

  countryList: any[] = [];
  constructor(
    private http: AuthHttp
  ) { }

  delete(id) {
    let q = {
      query: { _id: id },
    }
    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json;charset=UTF-8'
      })
    });
    return this.http.post(API_CONSTANTS.api.countries.delete, JSON.stringify(q), options);
  }

  get(countryName) {
    return this.http.get(API_CONSTANTS.api.countries.get + countryName);
  }

  getCached() {
    return new Promise((res, rej) => {
      if (this.countryList.length > 0) {
        res(this.countryList);
      } else {
        this.getAll().subscribe((next) => {
          res(this.countryList);
        })
      }
    })

  }

  getAll() {
    let res = this.http.get(API_CONSTANTS.api.countries.list).share();
    res.subscribe((next) => {
      let countries: any[] = next.json();
      this.countryList = [];
      this.countryList.push({
        label: 'Select City',
        value: null
      })
      countries.forEach((country) => {
        this.countryList.push({
          label: country.name,
          value: country.name
        });
      })

    })
    return res;
  }
  getFields() {
    return this.http.get(API_CONSTANTS.api.countries.fields);
  }

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
    return this.http.post(API_CONSTANTS.api.countries.update, JSON.stringify(q), options);
  }
  create(obj) {
    let options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json;charset=UTF-8'
      })
    });
    return this.http.post(API_CONSTANTS.api.countries.create, JSON.stringify(obj), options)
  }
}
