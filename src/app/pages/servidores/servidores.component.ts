import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

import { HttpClient } from '@angular/common/http';


// import { AppService } from 'src/app/services/app.service';


// import { DatabaseService } from '../../../assets/database.servico';


// declare var databaseServico: any = DatabaseService;

@Component({
  selector: 'app-servidores',
  templateUrl: './servidores.component.html',
  styleUrls: ['./servidores.component.scss']
})
export class ServidoresComponent implements OnInit {
  novo: Servidor = new Servidor();
  servidores: Servidor[];
  constructor(public database: DatabaseService, public http: HttpClient) { }


  ngOnInit() {

    this.loadServers();

  }

  loadServers() {
    this.database.query('SELECT * FROM servidores WHERE active=1').then((servers: Array<any>) => {
      this.servidores = servers.map(s => new Servidor(s) );
      this.servidores.map(servidor => this.infinytyLoop(servidor));
    });
  }

  salvar(){
    console.log("this.novo", this.novo);

    this.novo = new Servidor({
      active: true,
      host: "google.com",
      protocolo: "https://",
      name: "Google Inc.",
      port: "443",
      status: ServerStatus.WAIT
    });
    this.database.insert('servidores', this.novo).subscribe(() => {
      alert("salvo com sucesso!");

      this.loadServers();
    });
  }

  delete( servidor: Servidor){
    this.database.remove('servidores', servidor.id).then((servers) => {
      alert("apagado com sucesso!");

      this.loadServers();
    });
  }

  async infinytyLoop(servidor: Servidor){
    if(servidor.active){
      servidor.status = ServerStatus.WAIT;
      this.database.update('servidores', servidor.id, servidor);
      await this.http.options( servidor.getRequestServer() ).toPromise()
        .then(res => servidor.status = ServerStatus.UP)
        .catch(err => servidor.status = ServerStatus.DOWN)
      this.database.update('servidores', servidor.id, servidor);

      this.infinytyLoop(servidor);
    }
  }

}




class Servidor {
  id?: number;
  name: string;
  protocolo: string;
  host: string;
  port?: number;
  path?: string;
  active: boolean;
  status?: ServerStatus;

  constructor(params?:object){
    if(params){
      Object.keys(params).map( key => {
        this[key] = params[key];
      });
    }
  }

  getRequestServer() {
    return `${this.protocolo}${this.host}${this.port ? ":"+this.port:""}${this.path}`;
  }
}

enum ServerStatus{
  UP="up",
  DOWN="down",
  WAIT="wait"
}






