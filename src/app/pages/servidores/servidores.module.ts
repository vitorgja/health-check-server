import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ModalServidorModule } from 'src/app/components/modal-servidor/modal-servidor.module';
import { ModalServidorComponent } from 'src/app/components/modal-servidor/modal-servidor.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModalServidorModule,
    MatTableModule,
    MatButtonModule,
    MatTableModule,
  ],
  exports: [
    MatButtonModule
  ],
  entryComponents: [],
})
export class ServidoresModule { }
