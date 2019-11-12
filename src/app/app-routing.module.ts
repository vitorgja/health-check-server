import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServidoresComponent } from './pages/servidores/servidores.component';

const routes: Routes = [
  {
    path: "",
    component: ServidoresComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
