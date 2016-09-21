import { Component, OnInit } from '@angular/core';
import { EntryService, CountryService } from './../../services/';
import { ActivatedRoute } from '@angular/router';

export class ToolbarModel {
  constructor(
    public CATEGORY: string[]
  ) { }
}

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent implements OnInit {

  country: any = {};
  entries: any[] = [];
  allEntries: any[] = [];
  isFilterEnabled: boolean = false;
  categoryFilter: any = null;
  yearFilter: any = null;
  geoFilter: any = null;
  categoryFilterItems: any[] = [{ label: 'None', value: 'None' }];
  categoryFilterYears: any[] = [{ label: 'None', value: 'None' }];
  categoryGeographicArea: any[] = [{ label: 'None', value: 'None' }];
  selectedCategory: string = 'None';
  selectedYear: string = 'None';
  selectedGeographic: string = 'None';


  selectedGrouping: string = 'None';
  isGrouped: boolean = false;
  isGroupVisible: boolean = false;
  group: string;

  groupingTypes = [
    { label: 'None', value: 'None' },
    { label: 'Year', value: 'YEAR' },
    { label: 'Category', value: 'CATEGORY' }
  ];


  constructor(
    private activeRoute: ActivatedRoute,
    private entryService: EntryService,
    private countryService: CountryService
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe((params: any) => {
      let ctry = params.country;
      this.countryService.get(ctry).subscribe(
        (data) => {
          this.country = data.json();
          console.log(this.country);
          this.entryService.getByCountry(this.country._id).subscribe(
            (next) => {
              this.allEntries = this.entries = next.json();
              console.log(this.allEntries);
              this.getFilterValues(this.allEntries);
            }
          )
        },
        (err) => { console.log(err); }
      )
    })
  }

  getFilterValues(entries) {
    this.categoryFilterItems = [{ label: 'None', value: 'None' }];
    this.categoryFilterYears = [{ label: 'None', value: 'None' }];
    this.categoryGeographicArea = [{ label: 'None', value: 'None' }];
    let mappedCategories = _.map(_.union(_.map(entries, (e: any) => { return e.CATEGORY })), (item) => {
      return { label: item, value: item }
    });
    let mappedYears = _.map(_.union(_.map(entries, (e: any) => { return e.YEAR })), (item) => {
      return { label: item, value: item }
    });
    let mappedGeographicArea =
      _.map(
        _.union(
          _.map(entries, (e: any) => { return e.EMERGENCY }))
        , (item) => {
          return { label: item, value: item }
        });

    this.categoryFilterItems = this.categoryFilterItems.concat(_.filter(mappedCategories, (e) => { return e.value !== '' }));
    this.categoryFilterYears = this.categoryFilterYears.concat(_.filter(mappedYears, (e) => { return e.value !== '' }));
    this.categoryGeographicArea = this.categoryGeographicArea.concat(_.filter(mappedGeographicArea, (e) => { return e.value !== '' }));

  }

  filter(allEntries) {
    let entries = allEntries;
    this.isFilterEnabled = false;

    if (this.categoryFilter) {
      entries = _.filter(entries, this.categoryFilter);
      this.isFilterEnabled = true;
    }
    if (this.yearFilter) {
      entries = _.filter(entries, this.yearFilter);
      this.isFilterEnabled = true;
    }
    if (this.geoFilter) {
      entries = _.filter(entries, this.geoFilter);
      this.isFilterEnabled = true;
    }
    return entries;
  }

  updateGrouping() {
    if (this.selectedGrouping === 'None') {
      this.isGrouped = false;
      this.isGroupVisible = false;
      this.updateVisible();

    }
    if (this.selectedGrouping === 'YEAR') {
      this.group = 'YEAR';
      this.isGroupVisible = true;
      this.updateVisible();

    }
    if (this.selectedGrouping === 'CATEGORY') {
      this.group = 'CATEGORY';
      this.isGroupVisible = true;
      this.updateVisible();
    }
  }

  groupItems(e) {
    let entries = e;
    entries = _.groupBy(entries, (e: any) => { return e[this.group]; })
    this.isGrouped = true;
    return entries;
  }

  updateVisible() {
    let filteredEntries = this.filter(this.allEntries);
    if (this.isGroupVisible) {
      this.entries = this.groupItems(filteredEntries);
    } else {
      this.entries = filteredEntries;
    }
  }

  reset() {
    this.selectedCategory = 'None';
    this.categoryFilter = null;
    this.selectedYear = 'None';
    this.yearFilter = null;
    this.selectedGeographic = 'None';
    this.geoFilter = null;
    this.selectedGrouping = 'None';
    this.isGrouped = false;
    this.isGroupVisible = false;
    this.updateVisible();
  }

  onRefresh() {
    this.refresh();
  }

  onDelete(evt) {
    this.allEntries = _.filter(this.entries, (e) => {
      return e._id !== evt;
    });
    this.updateVisible();
    this.getFilterValues(this.allEntries);
  }

  updateCategoryFilter() {
    this.categoryFilter = this.selectedCategory === 'None' ? null : { 'CATEGORY': this.selectedCategory };
    this.updateVisible();
  }
  updateYearFilter() {
    this.yearFilter = this.selectedYear === 'None' ? null : { 'YEAR': this.selectedYear };
    this.updateVisible();
  }
  updateGeoFilter() {
    this.geoFilter = this.selectedGeographic === 'None' ? null : { 'EMERGENCY': this.selectedGeographic };
    this.updateVisible();
  }

  refresh(evt?) {
    this.entryService.getByCountry(this.country._id).subscribe(
      (next) => {
        this.allEntries = next.json();
        this.updateVisible();
        this.getFilterValues(this.allEntries);
      }
    )
  }

}
