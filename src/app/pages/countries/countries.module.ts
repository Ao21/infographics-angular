import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule  } from '@angular/router';

import { MdInputModule } from '@angular2-material/input';
import { MdButtonModule } from '@angular2-material/button';
import { DropdownModule } from 'primeng/primeng';

import { CountriesComponent } from './countries.component';
import { SharedComponentModules } from './../../components/shared_components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        SharedComponentModules,
    ],
    declarations: [
        CountriesComponent,

    ],
    exports: [
        CountriesComponent
    ],
    providers: []
})
export class CountriesModule { }