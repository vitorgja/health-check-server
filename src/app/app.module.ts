import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServidoresComponent } from './pages/servidores/servidores.component';
import { AppService } from './services/app.service';
import { ElectronService, NgxElectronModule } from 'ngx-electron';


@NgModule({
  declarations: [
    AppComponent,
    ServidoresComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxElectronModule,
  ],
  // providers: [ AppService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
