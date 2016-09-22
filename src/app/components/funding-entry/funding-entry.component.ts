import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { NotificationService, EntryService, ReferenceService, } from './../../services/';
import { Dropdown, SelectItem } from 'primeng/primeng';
import * as moment from 'moment';
import * as _ from 'lodash';
export class EntryModel {
  constructor(
    public _id: string,
    public DATE: any,
    public CATEGORY: string,
    public COUNTRY_ID: string,
    public COUNTRY_NAME: string,
    public FUNDING_CATEGORY: string,
    public TYPE: string,
    public AMOUNT: number,
    public CURRENCY: string,
    public USD_AMOUNT: number,
    public DESCRIPTION: string,
    public MAP_COUNTRY: string[],
    public LEGEND_NAME: string,
    public EMERGENCY: string,
    public THEMATIC: string,
    public CATEGORY_REF: string,
    public EMERGENCY_LOCAL: string,
    public THEMATIC_LOCAL: string,
    public LEGEND_NAME_LOCAL: string,
  ) { }
}

@Component({
  selector: 'app-funding-entry',
  templateUrl: './funding-entry.component.html',
  styleUrls: ['./funding-entry.component.scss']
})
export class FundingEntryComponent implements OnInit {

  @Input('default') default: boolean;
  @Input('country') country: any;
  @Input('data') data: any;
  @Output('onRefresh') onRefresh: EventEmitter<any> = new EventEmitter();
  @Output('onDelete') onDelete: EventEmitter<any> = new EventEmitter();
  @HostBinding('class.isEditing') get isEditingActive() {
    return this.isEditing;
  }
  currencies: SelectItem[];
  selectedCurrency: string = 'EUR';
  isEditing: boolean = false;
  categories: any = [];
  subCategoryResults: any = [];
  countryResults: any = [];

  category: string;
  entryName: string;

  model = new EntryModel(null, moment().format('YYYY-MM-DD'), '', '', '', '', '', null, 'EUR', null, '', [], '', '', '','','','','');


  constructor(
    private notificationService: NotificationService,
    private referenceService: ReferenceService,
    private entryService: EntryService,
  ) {
    this.currencies = this.referenceService.getCurrency();
  }

  ngOnInit() {
    if (this.data) {
      this.mapDataToModel(this.data);
    }
    this.getCategories();
  }

  getCategories() {
        this.referenceService.getCategories().then((next) => {
            this.categories = next;
        })
    }

  mapDataToModel(data) {
    let maps;
    if (this.data.MAP_COUNTRY) {
      maps = this.data.MAP_COUNTRY.split(';')
    } else {
      maps = [];
    }
    this.model = new EntryModel(
      this.data._id,
      moment(this.data.DATE).format('YYYY-MM-DD'),
      this.data.CATEGORY,
      this.data.COUNTRY_ID,
      this.data.COUNTRY_NAME,
      this.data.FUNDING_CATEGORY,
      this.data.TYPE,
      this.data.AMOUNT,
      this.data.CURRENCY,
      this.data.USD_AMOUNT,
      this.data.DESCRIPTION,
      maps,
      this.data.LEGEND_NAME,
      this.data.EMERGENCY,
      this.data.THEMATIC,
      this.data.CATEGORY_REF,
      this.data.EMERGENCY_LOCAL,
      this.data.THEMATIC_LOCAL,
      this.data.LEGEND_NAME_LOCAL

    )
    this.category = this.data.CATEGORY;
    this.entryName = this.data.LEGEND_NAME;
  }
  cancel(evt: Event) {
    evt.stopPropagation();
    evt.stopImmediatePropagation();
    evt.preventDefault();
    if (this.default || !this.data) {
      this.data = null;
      this.model = new EntryModel(null, moment().format('YYYY-MM-DD'), '', '', '', '', '', null, 'EUR', null, '', [], '', '', '','','','','');
    } else {
      this.mapDataToModel(this.data);
    }
    this.isEditing = false;
  }
  onSubmit() {
    this.model.MAP_COUNTRY = this.model.MAP_COUNTRY
    this.model.COUNTRY_NAME = this.country.name;
    this.model.COUNTRY_ID = this.country._id;
    this.model.CATEGORY_REF = this.referenceService.getCategory(this.model.CATEGORY)._id;
    let obj = _.assign({}, this.model, { MAP_COUNTRY: this.model.MAP_COUNTRY.join(';') });
    this.entryService.create(obj).subscribe(
      (next) => {
        this.onRefresh.next(next.json());
        let obj = next.json();
        if (this.default) {
          this.data = null;
          this.model = new EntryModel(null, moment().format('YYYY-MM-DD'), '', '', '', '', '', null, 'EUR', null, '', [], '', '', '','','','','');
        }
        this.category = obj.CATEGORY;
        this.entryName = obj.LEGEND_NAME;
        this.isEditing = false;
      },
      (err) => {
        this.notificationService.createError(err.text());
        console.log(err);
      });
  }
  delete(evt: Event) {
    evt.stopPropagation();
    evt.stopImmediatePropagation();
    evt.preventDefault();
    if (this.data._id) {
      this.entryService.delete(this.data._id).subscribe(
        (next) => {
          this.onDelete.next(this.data._id);
          console.log(next);
        },
        (err) => {
          this.notificationService.createError(err.text());
          console.log(err);
        }
      );
    }

  }
  search(event) {
    this.referenceService.getSubcategories(event.query).then((data) => {
      this.subCategoryResults = _.map(data, (e: any) => {
        return e.name;
      });
    });
  }

  searchCountries(event) {
    this.referenceService.getCountries(event.query).then(data => {
      console.log(data);
      this.countryResults = data;
    });
  }

}
