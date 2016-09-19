import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule  } from '@angular/router';

import { MdInputModule } from '@angular2-material/input';
import { MdButtonModule } from '@angular2-material/button';
import { DropdownModule } from 'primeng/primeng';

import { CountryEntryComponent } from './country-entry.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MdInputModule,
        MdButtonModule,
        DropdownModule
    ],
    declarations: [
        CountryEntryComponent,

    ],
    exports: [
        CountryEntryComponent
    ],
    providers: []
})
export class CountryEntryModule { }