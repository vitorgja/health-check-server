import { Injectable } from '@angular/core';
import { of } from 'rxjs';

declare var path: any;
declare var sqlite: any;


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db: any;
  constructor() {
    this.db = sqlite.connect(path.resolve('src/app/dump/database.db'));

    this.createTable();
    this.query('SELECT * FROM install').then((installs: Install[]) => {

      if (installs.length === 0) {
        this.insertDefault();
        this.insert('install', {
          name: 'Initial Install',
          version: 'v0.1.0',
          active: 1
        });
      }
    });

  }

  async query(query) {
    return await new Promise((resolve, reject) => {
      this.db.runAsync(query, (data) => {
        if (data.error) { reject(data.error); }
        resolve(data);
      });
    });
  }

  insert(table: string, fields: any | object) {
    return of(this.db.insert(table, fields)); // entidade, dados;
  }

  update(table: string, id: number, fields: any | object) {
    delete fields.id;
    delete fields.$$hashKey; // Apaga elemento $$hashKey do objeto
    return of(this.db.update(table, fields, { id: id })); // entidade, dados, where
  }

  async remove(table: string, id: number) {
    return await of(this.db.update(table, { active: 0 }, { id: id })); // entidade, dados, where
  }

  createTable() {
    const SQL_CREATE_TABLE = `
    CREATE TABLE IF NOT EXISTS install (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name CHAR (100),
      version CHAR(8) DEFAULT ('v0.0.1'),
      active INT DEFAULT (0)
    );

    CREATE TABLE IF NOT EXISTS servidores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name CHAR (100),
        protocolo CHAR(8) DEFAULT ('https://'),
        host VARCHAR (100),
        port VARCHAR DEFAULT (443),
        path VARCHAR (200) DEFAULT ('/'),
        active INT DEFAULT (1) ,
        status VARCHAR (5) DEFAULT('wait')
    );`;

    this.db.run(SQL_CREATE_TABLE, (res) => {
      if (res.error) { throw res.error; }

      console.log(res);
    });
  }

  insertDefault() {
    const SQL_INSERT = `
    INSERT INTO servidores (name, protocolo, host, port, path) VALUES
                        ( 'Wildfly', 'http://', 'localhost', '8585', '/wsselfbooking'),
                        ( 'Tomcat',  'http://', 'localhost', '8080', '/'),
                        ( 'Aplicacao', 'https://', 'local.lemontech.com.br', '80', '/')

       -- WHERE NOT EXISTS in ( SELECT * FROM servidores )
    `;
    this.db.run(SQL_INSERT, (res) => {
      if (res.error) { throw res.error; }

      console.log(res);
    });
  }
}




class Install {
  id: number;
  name: string;
  version: string;
  active: boolean;
}
