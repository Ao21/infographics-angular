import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { API_CONSTANTS } from './../consts';
import * as _ from 'lodash';

const countrysArr = ["Afghanistan", "Albania", "Algeria", "Angola", "Antarctica", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bangladesh", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia, Plurinational State of", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Congo, the Democratic Republic of the", "Costa Rica", "Côte d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Fiji", "Finland", "France", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Greenland", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic of", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kosovo", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Lithuania", "Luxembourg", "Macedonia, the former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Mali", "Mauritania", "Mexico", "Moldova, Republic of", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestinian Territory, Occupied", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Romania", "Russian Federation", "Rwanda", "Saudi Arabia", "Senegal", "Serbia", "Sierra Leone", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "Somaliland", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-Leste", "Togo", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela, Bolivarian Republic of", "Viet Nam", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"];

const currencyArr = [
  { "label": "ALL", "value": "ALL", "symbol": "L", "name": "Albanian lek" },
  { "label": "AMD", "value": "AMD", "symbol": "AMD", "name": "Armenian dram" },
  { "label": "ANG", "value": "ANG", "symbol": "NA\u0192", "name": "Netherlands Antillean gulden" },
  { "label": "BAM", "value": "BAM", "symbol": "KM", "name": "Bosnia and Herzegovina konvertibilna marka" },
  { "label": "BGN", "value": "BGN", "symbol": "BGN", "name": "Bulgarian lev" },
  { "label": "BYR", "value": "BYR", "symbol": "Br", "name": "Belarusian ruble" },
  { "label": "BZD", "value": "BZD", "symbol": "BZ$", "name": "Belize dollar" },
  { "label": "CHF", "value": "CHF", "symbol": "Fr.", "name": "Swiss franc" },
  { "label": "CZK", "value": "CZK", "symbol": "K\u010d", "name": "Czech koruna" },
  { "label": "DKK", "value": "DKK", "symbol": "Kr", "name": "Danish krone" },
  { "label": "DZD", "value": "DZD", "symbol": "\u062f.\u062c", "name": "Algerian dinar" },
  { "label": "EEK", "value": "EEK", "symbol": "KR", "name": "Estonian kroon" },
  { "label": "EUR", "value": "EUR", "symbol": "\u20ac", "name": "European Euro" },
  { "label": "GBP", "value": "GBP", "symbol": "\u00a3", "name": "British pound" },
  { "label": "GNF", "value": "GNF", "symbol": "FG", "name": "Guinean franc" },
  { "label": "HRK", "value": "HRK", "symbol": "kn", "name": "Croatian kuna" },
  { "label": "HUF", "value": "HUF", "symbol": "Ft", "name": "Hungarian forint" },
  { "label": "ILS", "value": "ILS", "symbol": "\u20aa", "name": "Israeli new sheqel" },
  { "label": "ISK", "value": "ISK", "symbol": "kr", "name": "Icelandic kr\u00f3na" },
  { "label": "KYD", "value": "KYD", "symbol": "KY$", "name": "Cayman Islands dollar" },
  { "label": "LBP", "value": "LBP", "symbol": "\u00a3", "name": "Lebanese lira" },
  { "label": "LTL", "value": "LTL", "symbol": "Lt", "name": "Lithuanian litas" },
  { "label": "LVL", "value": "LVL", "symbol": "Ls", "name": "Latvian lats" },
  { "label": "MDL", "value": "MDL", "symbol": "MDL", "name": "Moldovan leu" },
  { "label": "MMK", "value": "MMK", "symbol": "K", "name": "Myanma kyat" },
  { "label": "MOP", "value": "MOP", "symbol": "P", "name": "Macanese pataca" },
  { "label": "NOK", "value": "NOK", "symbol": "kr", "name": "Norwegian krone" },
  { "label": "PLN", "value": "PLN", "symbol": "z\u0142", "name": "Polish zloty" },
  { "label": "RON", "value": "RON", "symbol": "L", "name": "Romanian leu" },
  { "label": "RSD", "value": "RSD", "symbol": "din.", "name": "Serbian dinar" },
  { "label": "RUB", "value": "RUB", "symbol": "R", "name": "Russian ruble" },
  { "label": "SEK", "value": "SEK", "symbol": "kr", "name": "Swedish krona" },
  { "label": "UAH", "value": "UAH", "symbol": "UAH", "name": "Ukrainian hryvnia" },
  { "label": "USD", "value": "USD", "symbol": "US$", "name": "United States dollar" },
  { "label": "UYU", "value": "UYU", "symbol": "$U", "name": "Uruguayan peso" },
  { "label": "XDR", "value": "XDR", "symbol": "SDR", "name": "Special Drawing Rights" },
];

@Injectable()
export class ReferenceService {

  countryList = [];
  categoryList = [];
  subCategoryList = [];

  constructor(
    private http: AuthHttp
  ) { 
    this.getCategories();
    this.getSubcategories();
  }

  clearCategories() {
    this.categoryList = [];
  }

  clearSubCategories() {
    this.subCategoryList = [];
  }

  getCountries(query) {
    return new Promise((res, rej) => {
      var regex = new RegExp(query, 'i');
      var result = _.filter(countrysArr, (e: any) => {
        return regex.test(e);
      });
      res(result);
    })
  }

  getCurrency() {
    return currencyArr;
  }

  getCategory(name) {
    let cat = _.find((this.categoryList), (e) => {
      return e.name === name;
    });
    console.log(cat);
    return cat ? cat : ''; 
  }

  getSubcategory(name) {
    let cat = _.find((this.subCategoryList), (e) => {
      return e.name === name;
    })
    console.log(cat);
    return cat ? cat : '';
  }


  getCategories() {
    return new Promise((res, rej) => {
      if (this.categoryList.length > 0) {
        res(this.categoryList);
      } else {
        this.http.get(API_CONSTANTS.api.categories.listType + 'default').subscribe((next) => {
          this.categoryList = next.json();
          res(next.json());
        })
      }
    })
  }

  getSubcategories() {
    return new Promise((res, rej) => {
      if (this.subCategoryList.length > 0) {
        res(this.subCategoryList);
      } else {
        this.http.get(API_CONSTANTS.api.categories.listType + 'funding').subscribe((next) => {
          this.subCategoryList = next.json();
          res(next.json());
        })
      }
    })
  }

}
