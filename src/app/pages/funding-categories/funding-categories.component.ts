import { Component, OnInit } from '@angular/core';
import { CountryService, CategoryService } from './../../services/';

@Component({
  selector: 'app-funding-categories',
  templateUrl: './funding-categories.component.html',
  styleUrls: ['./funding-categories.component.scss']
})
export class FundingCategoriesComponent implements OnInit {

  categories: any[] = [];
  typeString: string = 'funding';
  constructor(
    private countryService: CountryService,
    private categoryService: CategoryService
  ) {
    this.categoryService.type(this.typeString).subscribe((next) => {
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
    this.categoryService.type(this.typeString).subscribe(
      (next) => {
        this.categories = next.json();
      },
      (err) => { }
    );
  }

  ngOnInit() {
  }

}
