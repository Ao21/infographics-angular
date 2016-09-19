import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CountriesComponent } from './pages/countries/countries.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { FundingCategoriesComponent } from './pages/funding-categories/funding-categories.component';
import { EntriesComponent } from './pages/entries/entries.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'funding-categories', component: FundingCategoriesComponent },
  { path: 'countries', component: CountriesComponent },
  { path: 'entries', component: EntriesComponent }
];

export const appRoutingProviders: any[] = [

];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
