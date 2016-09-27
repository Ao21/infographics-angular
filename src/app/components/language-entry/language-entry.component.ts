import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ReferenceService, CountryService } from './../../services/';

export class LanguageModel {
  constructor(
    public country: string,
    public translation: string,
    public country_name_lower: string,

  ) { }
}

@Component({
  selector: 'app-language-entry',
  templateUrl: './language-entry.component.html',
  styleUrls: ['./language-entry.component.scss']
})
export class LanguageEntryComponent implements OnInit {

  @Input('data') data: any;
  @Input('index') index: any;
  @Input('model') model: any;
  @Input('def') def: boolean;
  @Output('onLanguageRefresh') onLanguageRefresh: EventEmitter<any> = new EventEmitter();
  @Output('onLanguageDelete') onLanguageDelete: EventEmitter<any> = new EventEmitter();
  isOpen: boolean = false;
  lModel: LanguageModel = new LanguageModel('', '', '');;
  countries: any[];


  translation: string;
  countryName: string;

  constructor(
    private referenceService: ReferenceService,
    private countryService: CountryService,
    private changeRef: ChangeDetectorRef
  ) {
    this.countryService.getCached().then((data: any) => {
      this.countries = data;
    })
  }

  ngOnInit() {
    console.log(this);
    if (this.data) {
      this.countryName = this.data.country;
      this.translation = this.data.translation;
      this.lModel = new LanguageModel(this.data.country, this.data.translation, this.data.country.toLowerCase().replace(new RegExp(' ', 'g'), '_'));
    }
  }

  search(event) {

  }

  delete(evt: Event) {
    evt.stopPropagation();
    evt.stopImmediatePropagation();
    evt.preventDefault();
    this.onLanguageDelete.next(this.lModel);
  }

  save(evt: Event) {
    evt.stopPropagation();
    evt.stopImmediatePropagation();
    evt.preventDefault();
    this.lModel.country_name_lower = this.lModel.country.toLowerCase().replace(new RegExp(' ', 'g'), '_');
   
    if (!this.def) {
      this.data = this.lModel;
      this.onLanguageRefresh.next({ model: this.data, index: this.index, isNew: false });
    } else {
      this.onLanguageRefresh.next({ model: this.lModel, isNew: true });
    }
    if (this.def) {
      this.lModel = new LanguageModel('', '', '');
    }
    this.isOpen = false;
    
  }

  cancel(evt: Event) {
    evt.stopPropagation();
    evt.stopImmediatePropagation();
    evt.preventDefault();
    if (this.model) {
      this.lModel = new LanguageModel('', '', '');
    }
    this.isOpen = false;
  }

}
