import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EntriesComponent } from './entries.component';
import { SharedComponentModules } from './../../components/shared_components.module';
import { DropdownModule } from 'primeng/primeng';
import { PipesModule} from './../../pipes/pipe.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedComponentModules,
        DropdownModule,
        PipesModule
    ],
    declarations: [
        EntriesComponent,
        

    ],
    exports: [
        EntriesComponent,
        
    ],
    providers: []
})
export class EntriesModule { }