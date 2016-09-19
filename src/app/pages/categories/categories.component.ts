import { Component, OnInit } from '@angular/core';
import { CategoryService, CountryService } from './../../services/';
import * as _ from 'lodash';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];

  constructor(
    private countryService: CountryService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categoryService.list().subscribe((next) => {
      this.categories = next.json();
    })
    this.countryService.getAll().subscribe();
  }

  onDelete(evt) {
    this.categories = _.filter(this.categories, (e) => {
      return e._id !== evt;
    });
  }
  refresh(evt) {
    this.categoryService.list().subscribe(
      (next) => {
        this.categories = next.json();
      },
      (err) => { }
    );
  }
}
