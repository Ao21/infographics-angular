import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FundingCategoriesComponent } from './funding-categories.component';
import { SharedComponentModules } from './../../components/shared_components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedComponentModules
    ],
    declarations: [
        FundingCategoriesComponent,

    ],
    exports: [
        FundingCategoriesComponent
    ],
    providers: []
})
export class FundingCategoriesModule { }