import { Component, OnInit, Input, EventEmitter, Output, HostBinding } from '@angular/core';
import { CategoryService, NotificationService, CountryService } from './../../services/';

export class CategoryModel {
  constructor(
    public _id: string,
    public name: string,
    public name_lower: string,
    public type: string,
    public translations: any[],
  ) { }
}

@Component({
  selector: 'app-category-entry',
  templateUrl: './category-entry.component.html',
  styleUrls: ['./category-entry.component.scss']
})
export class CategoryEntryComponent implements OnInit {

  @Input('default') default: boolean;
  @Input('data') data: CategoryModel;
  @Input('type') type: string;
  @Output('onRefresh') onRefresh: EventEmitter<any> = new EventEmitter();
  @Output('onDelete') onDelete: EventEmitter<any> = new EventEmitter();
  @HostBinding('class.isEditing') get _isEditingActive() {
    return this.isEditing;
  }
  model = new CategoryModel(null, '', '', this.type, []);

  isEditing: boolean = false;

  categoryName: string;

  constructor(
    private countryService: CountryService,
    private categoryService: CategoryService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    if (this.data) {
      this.model = new CategoryModel(this.data._id, this.data.name, this.data.name_lower, this.data.type, this.data.translations);
      this.categoryName = this.data.name;
    }
  }

  cancel(evt: Event) {
    evt.stopPropagation();
    evt.stopImmediatePropagation();
    evt.preventDefault();
    if (this.default || !this.data) {
      this.data = null;
      this.model = new CategoryModel(null, '', '', '', []);
    }
    this.isEditing = false;
  }

  onLanguageRefresh() {
    this.save();
  }

  onLanguageDelete(index) {
    this.data.translations.splice(index, 1);
    this.save();
  }

  onSubmit() {
    this.model.type = this.type;
    this.categoryService.save(this.model).subscribe(
      (next) => {
        this.onRefresh.next(next.json());
        let obj: CategoryModel = next.json();
        if (this.default) {
          this.data = null;
          this.model = new CategoryModel(null, '', '', '', []);
        }
        this.categoryName = obj.name;
        this.isEditing = false;
      },
      (err) => {
        console.log(err);
        this.notificationService.createError(err.text());
      })
  }

  save() {
    this.categoryService.save(this.model).subscribe();
  }

  delete(evt: Event) {
    evt.stopPropagation();
    evt.stopImmediatePropagation();
    evt.preventDefault();
    if (this.data._id) {
      this.categoryService.delete(this.data._id).subscribe(
        (next) => {
          this.onDelete.next(this.data._id);
        },
        (err) => {
          this.notificationService.createError(err.text());
          console.log(err);
        }
      );
    }

  }

}
