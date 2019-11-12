// "USE STRICT";
if (typeof module === 'object') {
    window.module = module; 
    module = undefined;
}
const path = window.require('path');
const sqlite = window.require('sqlite-sync');

if (window.module) module = window.module;

console.log("path", path.resolve("src/app/dump/database.db"))
console.log("sqlite", sqlite)


function DatabaseService() {}

DatabaseService.prototype.db = sqlite.connect(path.resolve("src/app/dump/database.db"));

DatabaseService.prototype.createTable = function(){
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
        port VARCHAR, 
        path VARCHAR (200), 
        ativo INT DEFAULT (1) 
    );`;

    this.db.run(sql_create_table, function(res){
        if(res.error)
            throw res.error;
        console.log(res);
    });
}

DatabaseService.prototype.insertDefault = function(){
    var sql_insert = `
    INSERT INTO servidores (id, name, protocolo, host, port, path) VALUES
                        (0, 'Wildfly', 'http://', 'localhost', '8585', '/wsselfbooking'),
                        (1, 'Tomcat',  'http://', 'localhost', '8080', '/'),
                        (2, 'Aplicacao', 'https://', 'local.lemontech.com.br', '80', '/')

       -- WHERE NOT EXISTS in ( SELECT * FROM servidores )
    `;
    this.db.run(sql_insert, function(res){
        if(res.error)
            throw res.error;
        console.log(res);
    });
}

DatabaseService.prototype.query = function( query ) {
    return new Promise( (resolve, reject)=>{
        this.db.runAsync(query, function(data){
            if( data.error) reject(data.error);
            resolve(data);
        });
    });
}

DatabaseService.prototype.insert = function( table, fields ) {
    return of( dbService.insert(table, fields) ); // entidade, dados;
}

DatabaseService.prototype.update = function( table, id, fields ) {
    delete fields.id;
    delete fields.$$hashKey; //Apaga elemento $$hashKey do objeto
    return of( this.db.update(table, fields, {id: id}) ); //entidade, dados, where
}

DatabaseService.prototype.remove =function( table, id ) {
    return of( dbService.update(table, {ativo:0}, {id: id}) ); //entidade, dados, where
}
    

// var db = new DatabaseService();
// db.createTable();
// db.insertDefault();
// db.query('SELECT * FROM servidores').then(  q => console.log("query", q));