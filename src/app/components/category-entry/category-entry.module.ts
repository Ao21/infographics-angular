import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdInputModule } from '@angular2-material/input';
import { MdButtonModule } from '@angular2-material/button';


import { CategoryEntryComponent } from './category-entry.component';
import { LanguageEntryModule } from './../language-entry/language-entry.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MdInputModule,
        MdButtonModule,
        LanguageEntryModule
    ],
    declarations: [
        CategoryEntryComponent
    ],
    exports: [
        CategoryEntryComponent
    ],
    providers: []
})
export class CategoryEntryModule { }