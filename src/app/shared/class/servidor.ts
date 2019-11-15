import { ServerStatus } from '../enum/status-servidor';

export class Servidor {
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

