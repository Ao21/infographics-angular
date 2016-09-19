import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EntriesComponent } from './entries.component';
import { SharedComponentModules } from './../../components/shared_components.module';
import { DropdownModule } from 'primeng/primeng';

import { ObjectLoopPipe } from './../../pipes/object-loop.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedComponentModules,
        DropdownModule
    ],
    declarations: [
        EntriesComponent,
        ObjectLoopPipe

    ],
    exports: [
        EntriesComponent,
        ObjectLoopPipe
    ],
    providers: []
})
export class EntriesModule { }