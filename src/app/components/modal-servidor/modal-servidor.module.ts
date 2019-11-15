import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ModalServidorComponent } from './modal-servidor.component';
import { MaterialModule } from 'src/app/shared/material.module';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [ModalServidorComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule, 
        MaterialModule,
    ],
    exports: [ModalServidorComponent],
    entryComponents: [ModalServidorComponent],
    providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
    ]
})
export class ModalServidorModule {}