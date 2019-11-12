import { Injectable } from '@angular/core';
import { of } from 'rxjs';

// if (typeof module === 'object') {
//   window.module = module; 
//   module = undefined;
// }

declare var path: any;
declare var sqlite: any;
// const path = require('path');
// const sqlite = require('sqlite-sync');

// if (window.module) module = window.module;


console.log("path 1", path.resolve("src/app/dump/database.db"))
console.log("sqlite 1", sqlite)

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db: any;
  constructor() {
    this.db = sqlite.connect(path.resolve("src/app/dump/database.db"));

    this.createTable();
    this.query("SELECT * FROM install").then((installs: Install[]) => {

      if (installs.length == 0) {
        this.insertDefault();
        this.insert('install', {
          name: "Initial Install",
          version: "v0.1.0",
          active: 1
        })
      }
    })

  }

  async get() {

    // db.get
    // const db = await dbPromise; 

    // return await db.get('SELECT * FROM servidores WHERE ');


    // return new Promise<any>( (resolve, reject)=>{
    //   db.get("SELECT * FROM servidores WHERE ativo = 1", resolve, reject);
    // })

  }




  async query(query) {
    return await new Promise((resolve, reject) => {
      this.db.runAsync(query, function (data) {
        if (data.error) reject(data.error);
        resolve(data);
      });
    });
  }

  insert(table: string, fields: any|object) {
    return of(this.db.insert(table, fields)); // entidade, dados;
  }

  update (table: string, id: number, fields: any|object) {
    delete fields.id;
    delete fields.$$hashKey; //Apaga elemento $$hashKey do objeto
    return of(this.db.update(table, fields, { id: id })); //entidade, dados, where
  }

  async remove(table: string, id: number) {
    return await of(this.db.update(table, { active: 0 }, { id: id })); //entidade, dados, where
  }




  createTable() {
    var sql_create_table = `
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

    this.db.run(sql_create_table, function (res) {
      if (res.error)
        throw res.error;
      console.log(res);
    });
  }

  insertDefault() {
    var sql_insert = `
    INSERT INTO servidores (name, protocolo, host, port, path) VALUES
                        ( 'Wildfly', 'http://', 'localhost', '8585', '/wsselfbooking'),
                        ( 'Tomcat',  'http://', 'localhost', '8080', '/'),
                        ( 'Aplicacao', 'https://', 'local.lemontech.com.br', '80', '/')

       -- WHERE NOT EXISTS in ( SELECT * FROM servidores )
    `;
    this.db.run(sql_insert, function (res) {
      if (res.error)
        throw res.error;
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
