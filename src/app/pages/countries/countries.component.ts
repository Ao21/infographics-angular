import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CountryService } from './../../services/';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent {
  countries: any[] = [];
  constructor(
    private countryService: CountryService
  ) {
    this.countryService.getAll().subscribe(
      (next) => {
        this.countries = next.json();
      },
      (err) => { }
    )
  }
  onDelete(evt) {
    this.countries = _.filter(this.countries, (e) => {
      return e._id !== evt;
    });
  }
  refresh(evt) {
    this.countryService.getAll().subscribe(
      (next) => {
        this.countries = next.json();
      },
      (err) => { }
    );
  }
}
