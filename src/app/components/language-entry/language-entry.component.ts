import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ReferenceService, CountryService } from './../../services/';

export class LanguageModel {
  constructor(
    country: string,
    translation: string
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
  lModel: LanguageModel = new LanguageModel('', '');;
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
    if (this.data) {
      this.countryName = this.data.country;
      this.translation = this.data.translation;
      this.lModel = new LanguageModel(this.data.country, this.data.translation);
    } else if (this.model) {
      this.lModel = new LanguageModel('', '');
    }
  }

  search(event) {

  }

  delete(evt: Event) {
    evt.stopPropagation();
    evt.stopImmediatePropagation();
    evt.preventDefault();
    this.onLanguageDelete.next(this.index);
  }

  save(evt: Event) {
    evt.stopPropagation();
    evt.stopImmediatePropagation();
    evt.preventDefault();
    if (this.model && !this.model.translations || this.model && this.model.translations.length === 0) {
      this.model.translations = [this.lModel];
    } else if (this.model && this.model.translations.length != 0) {
      this.model.translations.push(this.lModel);
    } else if (this.data) {
      this.data = this.lModel;
    }
    if (this.model) {
      this.lModel = new LanguageModel('', '');
    }
    this.isOpen = false;
    this.onLanguageRefresh.next(this.lModel);
  }

  cancel(evt: Event) {
    evt.stopPropagation();
    evt.stopImmediatePropagation();
    evt.preventDefault();
    if (this.model) {
      this.lModel = new LanguageModel('', '');
    }
    this.isOpen = false;
  }

}
