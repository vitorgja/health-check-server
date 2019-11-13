import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-servidores',
  templateUrl: './servidores.component.html',
  styleUrls: ['./servidores.component.scss']
})
export class ServidoresComponent implements OnInit {
  novo: Servidor = new Servidor();

  displayedColumns: string[] = ['status', 'id', 'name', 'url', 'active', 'actions'];
  servidores: Servidor[];
  constructor(public database: DatabaseService, public http: HttpClient) { }


  ngOnInit() {

    this.loadServers();

  }

  loadServers() {
    this.database.query('SELECT * FROM servidores WHERE active=1').then((servers: Array<any>) => {
      console.log('servers', servers);
      this.servidores = servers.map(s => new Servidor(s));
      this.servidores.map(servidor => this.infinytyLoop(servidor));
    });
  }

  salvar() {
    console.log('this.novo', this.novo);

    this.database.insert('servidores', this.novo).subscribe(() => {
      const notification = new Notification('Servidor Adicionado ', {
        body: `Servidor ${this.novo.name} Addicionado com sucesso!`,
        // title: 'Teeeeste'
      });


      this.novo = new Servidor();
      this.loadServers();
    });
  }

  delete(servidor: Servidor) {
    this.database.remove('servidores', servidor.id).then((servers) => {
      const notification = new Notification('Servidor Adicionado ', {
        body: `Servidor ${servidor.name} apagado com sucesso!`,
        // title: 'Teeeeste'
      });

      this.loadServers();
    });
  }

  async infinytyLoop(servidor: Servidor) {
    if (servidor.active) {
      // servidor.status = ServerStatus.WAIT;
      this.database.update('servidores', servidor.id, servidor);
      await this.http.get(servidor.getRequestServer()).toPromise()
        .then(res => {
          console.log('res ', res);
          this.buildStatus(res, servidor);
        })
        .catch(err => {
          console.log('err ', err);
          this.buildStatus(err, servidor);
        });

      this.database.update('servidores', servidor.id, servidor);
      await this.delay(10000);
      this.infinytyLoop(servidor);
    }
  }

  // nossa função delay com suporte a promisse.
  private delay(ms: number): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }

  buildStatus(res, servidor: Servidor) {
    console.log('status', res.status);
    if (res.status === 200 || res.status === 201) {
      servidor.status = ServerStatus.UP;
    } else {
      servidor.status = ServerStatus.DOWN;
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

  constructor(params?: object) {
    if (params) {
      Object.keys(params).map(key => {
        this[key] = params[key];
      });
      console.log("Servidor ", this);
    }
  }

  getRequestServer() {
    return `${this.protocolo}${this.host}${this.port ? ':' + this.port : ''}${this.path}`;
  }
}

enum ServerStatus {
  UP = 'up',
  DOWN = 'down',
  WAIT = 'wait'
}






