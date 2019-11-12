import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

// import {getManager} from "typeorm";
// import { Servidor } from "../entity/servidor.entity";

@Injectable({
    providedIn: 'root'
}) 
export class AppService{
    constructor(public _electronService: ElectronService ){
        
    }

    // public  insert() {
    //     const entityManager = getManager(); // you can also get it via getConnection().manager
    //     let user = (a) => {entityManager.findOne(Servidor, 1); };

    //     let s = new Servidor();
    //     s.name = "Umed";
    //     s.host = "localhost";
    //     s.port = "8080";
    //     s.path = "/home";
    //     s.active = true;

    //     entityManager.insert<Servidor>(Servidor, s);
    //     // await entityManager.save(user);
    // }

    // getAll(){
    //     console.log("isEletronicAPP", this._electronService.isElectronApp)
    //     if(this._electronService.isElectronApp) {
    //         let pong: string = this._electronService.ipcRenderer.sendSync('porra');
    //         console.log("ping: ", pong);
    //     }
    //     // return of(this._electronService.ipcRenderer.sendSync("item"))
        
    // }
}