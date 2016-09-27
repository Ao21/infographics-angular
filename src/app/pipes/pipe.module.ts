import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ObjectLoopPipe } from './object-loop.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        ObjectLoopPipe

    ],
    exports: [
        ObjectLoopPipe
    ],
    providers: []
})
export class PipesModule { }