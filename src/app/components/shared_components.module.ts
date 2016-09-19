import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CountryEntryModule } from './country-entry/country-entry.module';
import { FundingEntryModule } from './funding-entry/funding-entry.module';
import { LanguageEntryModule } from './language-entry/language-entry.module';
import { CategoryEntryModule } from './category-entry/category-entry.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CategoryEntryModule,
        LanguageEntryModule,
        CountryEntryModule,
        FundingEntryModule
    ],
    declarations: [
        
    ],
    exports: [
        CategoryEntryModule,
        CountryEntryModule,
        FundingEntryModule,
        LanguageEntryModule
    ],
    providers: []
})
export class SharedComponentModules { }