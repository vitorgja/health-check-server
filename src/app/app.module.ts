import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServidoresComponent } from './pages/servidores/servidores.component';
import { AppService } from './services/app.service';
import { ElectronService, NgxElectronModule } from 'ngx-electron';
import { MaterialModule } from './shared/material.module';
import { ModalServidorModule } from './components/modal-servidor/modal-servidor.module';

@NgModule({
  declarations: [
    AppComponent,
    ServidoresComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ModalServidorModule,
    NgxElectronModule,
  ],
  // providers: [ AppService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
