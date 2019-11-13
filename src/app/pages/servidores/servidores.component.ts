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

      this.infinytyLoop();
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

  edit(servidor: Servidor) {
    console.log("EDIT TESTE", servidor);
    this.novo = servidor;
  }

  async infinytyLoop() {
    console.log('this.servidores', this.servidores);
    this.servidores.map(async servidor => await this.requestServer(servidor));

    await this.delay(10000);
    // this.infinytyLoop();
  }
  async requestServer(servidor: Servidor) {
    if (servidor.active) {
      console.log('requestServer ', servidor.name);
      // servidor.status = ServerStatus.WAIT;
      // this.database.update('servidores', servidor.id, servidor.status);
      await this.http.get(servidor.getRequestServer()).toPromise()
        .then(res => {
          console.log('res ', res);
          this.buildStatus(res, servidor);
        })
        .catch(err => {
          console.log('err ', err);
          this.buildStatus(err, servidor);
        });
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
    let data: any = {};
    if (res.status === 200 || res.status === 201) {
      servidor.status = ServerStatus.UP;
      data = { status: ServerStatus.UP };
      if (servidor.statusNotified) {
        data = { ...data, statusNotified: 0 };
      }
      this.database.update('servidores', servidor.id, data);
    } else {
      servidor.status = ServerStatus.DOWN;
      data = { status: ServerStatus.DOWN };
      if (!servidor.statusNotified) {
        data = { ...data, statusNotified: 1 };
        // const notification = new Notification('Servidor Off', {
        //   body: `O servidor ${servidor.name} esta Off!`,
        // });
      }

      console.log(
        'status', res.status
        , 'name', servidor.name
        , 'statusNotified', !!servidor.statusNotified
        , 'data', data
      );
      // console.log('servidor.statusNotified', !!servidor.statusNotified)
      // console.log('data', data)
      this.database.update('servidores', servidor.id, data);
    }
  }

}




class Servidor {
  id: number;
  name: string;
  protocolo: string;
  host: string;
  port?: number;
  path?: string;
  active: boolean;
  status?: ServerStatus;
  statusNotified?: boolean;

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






