import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing,
         appRoutingProviders }  from './app.routing';

import { AppComponent } from './app.component';

import { CategoriesModule } from './pages/categories/categories.module';
import { FundingCategoriesModule } from './pages/funding-categories/funding-categories.module';
import { CountriesModule } from './pages/countries/countries.module';
import { EntriesModule } from './pages/entries/entries.module';

import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthHttp, AUTH_PROVIDERS } from 'angular2-jwt';

import { SharedComponentModules } from './components/shared_components.module';
import { AuthService, NotificationService, ReferenceService, UploadService, EntryService, CountryService, CategoryService} from './services/index';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    CategoriesModule,
    FundingCategoriesModule,
    SharedComponentModules,
    EntriesModule,
    CountriesModule
  ],
  providers: [
    AUTH_PROVIDERS,
    appRoutingProviders,
    AuthService,
    NotificationService,
    ReferenceService,
    UploadService,
    EntryService,
    CountryService,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
