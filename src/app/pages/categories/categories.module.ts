import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CategoriesComponent } from './categories.component';
import { SharedComponentModules } from './../../components/shared_components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedComponentModules
    ],
    declarations: [
        CategoriesComponent,

    ],
    exports: [
        CategoriesComponent
    ],
    providers: []
})
export class CategoriesModule { }