import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdInputModule } from '@angular2-material/input';
import { MdButtonModule } from '@angular2-material/button';
import { DropdownModule } from 'primeng/primeng';

import { LanguageEntryComponent} from './language-entry.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MdInputModule,
        MdButtonModule,
        DropdownModule
    ],
    declarations: [
        LanguageEntryComponent
    ],
    exports: [
        LanguageEntryComponent
    ],
    providers: []
})
export class LanguageEntryModule { }