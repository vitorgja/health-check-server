import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class Servidor {

    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    host: string;

    @Column()
    port: string;

    @Column()
    path: string;

    @Column()
    active: boolean;
}