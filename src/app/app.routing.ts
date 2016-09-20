import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CountriesComponent } from './pages/countries/countries.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { FundingCategoriesComponent } from './pages/funding-categories/funding-categories.component';
import { EntriesComponent } from './pages/entries/entries.component';
import { CanActivateViaAuthGuard } from './guards/authGuard';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categories', component: CategoriesComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'funding-categories', component: FundingCategoriesComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'countries', component: CountriesComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'entries', component: EntriesComponent, canActivate: [CanActivateViaAuthGuard] }
];

export const appRoutingProviders: any[] = [
  CanActivateViaAuthGuard
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
