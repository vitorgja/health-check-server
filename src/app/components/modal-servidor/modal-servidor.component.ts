import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Servidor } from 'src/app/shared/class/servidor';
import { DatabaseService } from 'src/app/services/database.service';
import { ServerStatus } from 'src/app/shared/enum/status-servidor';


interface DataParams {
  servidor: Servidor,
  isEditMode: boolean
}


@Component({
  selector: 'app-modal-servidor',
  templateUrl: './modal-servidor.component.html',
  styleUrls: ['./modal-servidor.component.scss']
})
export class ModalServidorComponent implements OnInit {

  // servidor: Servidor = new Servidor();

  defaultServidor;
  @Input() servidor: FormGroup;
  @Input() isEditMode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ModalServidorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataParams,

    private database: DatabaseService
  ) {

    console.log("DATA", this.data)
    if (this.data && this.data.isEditMode) this.isEditMode = this.data.isEditMode;
    if (this.data && this.data.servidor) {
      this.loadDefaultForm(this.data.servidor);
    } else {
      this.loadDefaultForm();
      
    }
    this.servidor = this.defaultServidor;
  }

  ngOnInit() {
    console.log("getState", this.dialogRef.getState())

  }

  loadDefaultForm(servidor?: Servidor) {
    this.defaultServidor = new FormGroup({
      id: new FormControl(servidor ? servidor.id : null),
      name: new FormControl(servidor ? servidor.name : "", Validators.required),
      protocolo: new FormControl(servidor ? servidor.protocolo : "", Validators.required),
      host: new FormControl(servidor ? servidor.host : "", Validators.required),
      port: new FormControl(servidor ? servidor.port : null),
      path: new FormControl(servidor ? servidor.path : null),
      active: new FormControl(servidor ? servidor.active : 1),
      status: new FormControl(servidor ? servidor.status : ServerStatus.WAIT)
    });
  }


  salvar() {
    
    let servidor = new Servidor( this.servidor.value );
    console.log('salvar', servidor);

    if( servidor.id ){
      const destruct = { ...servidor };
      this.database.update ('servidores', servidor.id, destruct).subscribe(() => {
        const notification = new Notification('Servidor Adicionado ', {
          body: `Servidor ${this.servidor.value.name} Editado com sucesso!`,
        });
        this.dialogRef.close(servidor);
      });
    } else {
      this.database.insert('servidores', servidor).then(() => {
        const notification = new Notification('Servidor Adicionado ', {
          body: `Servidor ${this.servidor.value.name} Addicionado com sucesso!`,
        });
        this.dialogRef.close(servidor);
      }).catch( (err)=> console.log("Carralho borracha de erro para inserir", err) );
    }

    
  }


}
