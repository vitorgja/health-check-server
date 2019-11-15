import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ModalServidorComponent } from 'src/app/components/modal-servidor/modal-servidor.component';
import { ServerStatus } from 'src/app/shared/enum/status-servidor';
import { Servidor } from 'src/app/shared/class/servidor';

@Component({
  selector: 'app-servidores',
  templateUrl: './servidores.component.html',
  styleUrls: ['./servidores.component.scss']
})
export class ServidoresComponent implements OnInit {

  displayedColumns: string[] = [
    'status',
    // 'id', 
    'name',
    'url',
    'active',
    'actions'
  ];
  servidores: Servidor[];
  constructor(
    public database: DatabaseService,
    public http: HttpClient,
    public dialog: MatDialog) {

  }


  ngOnInit() {

    this.loadServers();

  }

  loadServers() { // WHERE active=1
    this.database.query('SELECT * FROM servidores ').then((servers: Array<any>) => {
      // console.log('servers', servers);
      this.servidores = servers.map(s => new Servidor(s));

      this.infinytyLoop();
    });
  }

  delete(servidor: Servidor) {
    this.database.remove('servidores', servidor.id).then((servers) => {
      const notification = new Notification('Servidor Adicionado ', {
        body: `Servidor ${servidor.name} apagado com sucesso!`,
      });

      this.servidores = this.servidores.filter(s => s.id != servidor.id);
    }).catch(err => console.error("Erro ao Deletar", err));
  }

  add() {
    const dialogRef = this.dialog.open(ModalServidorComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: Servidor) => {
      this.servidores.push(new Servidor(result));
    });
  }

  edit(servidor: Servidor) {

    const dialogRef = this.dialog.open(ModalServidorComponent, {
      width: '500px',
      data: {
        isEditMode: true,
        servidor: servidor
      },
    });
    dialogRef.afterClosed().subscribe((result: Servidor) => {
      this.servidores = this.servidores.map(server => {
        if (server.id === result.id) {
          return result;
        }
        return server;
      })
    });
  }

  async infinytyLoop() {

    this.servidores.map(async servidor => this.requestServer(servidor));

    await this.delay(10000);
    this.infinytyLoop();
  }
  requestServer(servidor: Servidor) {

    this.http.get(servidor.getRequestServer()).toPromise()
      .then(res => this.buildStatus(res, servidor))
      .catch(err => this.buildStatus(err, servidor));

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
    if (res.status === 200 || res.status === 201) {
      this.notification(ServerStatus.UP, servidor);
    } else {
      this.notification(ServerStatus.DOWN, servidor);
    }
  }

  notification(statusReq: ServerStatus, servidor: Servidor) {
    let notfify = { title: "", body: "" };

    if (statusReq === ServerStatus.UP) {
      notfify.title = 'Servidor On';
      notfify.body = `O servidor ${servidor.name} esta On!`;

      if (statusReq != servidor.status) {

        if (servidor.statusNotified) {
          this.database.update('servidores', servidor.id, { status: ServerStatus.UP });
        } else {
          if (servidor.active) {
            this.database.update('servidores', servidor.id, { status: ServerStatus.UP, statusNotified: 1 });
            const notification = new Notification(notfify.title, { body: notfify.body });
          } else {
            this.database.update('servidores', servidor.id, { status: ServerStatus.UP });
          }
        }
        servidor.status = ServerStatus.UP;
      }

    } else if (statusReq === ServerStatus.DOWN) {
      notfify.title = 'Servidor Off';
      notfify.body = `O servidor ${servidor.name} esta Off!`;

      if (statusReq != servidor.status) {
        if (servidor.statusNotified) {
          this.database.update('servidores', servidor.id, { status: ServerStatus.DOWN });
        } else {
          if (servidor.active) {
            this.database.update('servidores', servidor.id, { status: ServerStatus.DOWN, statusNotified: 1 });
            const notification = new Notification(notfify.title, { body: notfify.body });
          } else {
            this.database.update('servidores', servidor.id, { status: ServerStatus.DOWN });
          }
        }
      }
      servidor.status = ServerStatus.DOWN;
    }
  }

}










