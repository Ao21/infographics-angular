import { Component, OnInit, Input, Output, Renderer, ElementRef, HostBinding, EventEmitter } from '@angular/core';
import { CountryService } from './../../services/';

export class TranslationModel {
  constructor(
    name: string,
    string: string
  ) { }
}

export class CountryModel {
  constructor(
    public name: string,
    public description: string,
    public translations: {
      total: string,
      countryName: string
    }
  ) { }
}


@Component({
  selector: 'app-country-entry',
  templateUrl: './country-entry.component.html',
  styleUrls: ['./country-entry.component.scss']
})
export class CountryEntryComponent implements OnInit {

  @Input('data') data: any;
  @Output('onRefresh') onRefresh: EventEmitter<any> = new EventEmitter();
  @Output('onDelete') onDelete: EventEmitter<any> = new EventEmitter();

  isEditing: boolean = false;
  link: any;

  model = new CountryModel('', '', { total: '', countryName: ''});
  text: string;
  results: string[] = ['Savings'];

  constructor(
    private renderer: Renderer,
    private el: ElementRef,
    private countryService: CountryService
  ) { }

  ngOnInit() {
    if (this.data) {
      if (!this.data.translations) {
        this.data.translations = {};
      }
      this.renderer.setElementClass(this.el, this.data.name, true);
      this.model = new CountryModel(this.data.name, this.data.description, this.data.translations);
      this.link = { country: this.data.name_lower };
    }
  }

  onSubmit() {
    if (this.data) {
      this.countryService.update(this.data._id, this.model).subscribe(
        (next) => {
          this.data = next.json();
          this.isEditing = false;
        },
        (err) => { console.log(err); }
      )
    } else {
      this.countryService.create(this.model).subscribe(
        (next) => {
          this.onRefresh.next(next.json());
          this.model = new CountryModel('', '', { total: '', countryName: '' });
          this.isEditing = false;
        },
        (err) => { console.log(err); }
      );
    }


  }

  delete(evt: Event) {
    evt.stopPropagation();
    evt.stopImmediatePropagation();
    evt.preventDefault();
    if (this.data._id) {
      this.countryService.delete(this.data._id).subscribe(
        (next) => {
          this.onDelete.next(this.data._id);
        },
        (err) => {
          console.log(err);
        }
      );
    }

  }

  search(event) {
    this.results = ['Savings', 'Other Mentions']
  }

}
