import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { estadoCita } from "./EstadoCita.enum";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity('Statust_cita')
export class DatosCita {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @ManyToOne(type => Usuario, (user:Usuario) => user.fecha) //se crea una relacion de muchas fechas puedentener un solo usuario
    user: Usuario;                                            //el primer parametro indica la tabla con la que se va a relacionar 
                                                              //y el segundo indica la relacion 

    @Column()
    Fecha: Date;

    @Column({
        type: 'enum',
        enum: estadoCita,
        name: 'EstadoCita',
        default: estadoCita.pendiente
    })
    estadoCita: estadoCita;
    

}