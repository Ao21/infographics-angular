import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdInputModule } from '@angular2-material/input';
import { MdButtonModule } from '@angular2-material/button';
import { MdRadioModule, MdUniqueSelectionDispatcher } from '@angular2-material/radio';
import { DropdownModule, AutoCompleteModule } from 'primeng/primeng';

import { FundingEntryComponent} from './funding-entry.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MdInputModule,
        MdRadioModule,
        MdButtonModule,
        DropdownModule,
        AutoCompleteModule
    ],
    declarations: [
        FundingEntryComponent
    ],
    exports: [
        FundingEntryComponent
    ],
    providers: [
        MdUniqueSelectionDispatcher
    ]
})
export class FundingEntryModule { }