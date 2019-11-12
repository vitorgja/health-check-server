import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// import "reflect-metadata";
// import {createConnection} from "typeorm";
// import { Servidor } from "./app/entity/servidor.entity";


// createConnection({
//     type: "sqlite",
//     key: "porra",
//     database:  "./app/dump/database.sqlite",
//     entities: [
//       Servidor
//     ],
//     synchronize: true,
//     logging: false
// }).then(async connection => {
//     // here you can start to work with your entities

//      /*...*/
//      let savedPhotos = await connection.manager.find(Servidor);
//      console.log("All photos from the db: ", savedPhotos);

// }).catch(error => console.log(error));

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
