import { Entity,Column,PrimaryGeneratedColumn,BaseEntity } from "typeorm";//se trae decoradores
import { rolusuario } from "./RolUsuario.enum";//archivo creado para definir una lista de posibilidades

//en este archivo se crea las tablas para la base de datos que se distingue con el decorador "entity"

@Entity()
export class Usuario extends BaseEntity  {//el nombre de la entidad 
    @PrimaryGeneratedColumn('increment')//le dice que esta es el "primary key" y que se va a ir incrementado automaticamente
    id: number;

    @Column({unique: true,nullable: false})
    cedula: string;

    @Column({type: 'varchar',nullable: false})//@Column({length: 100}) le dice que una nueva columna y que maximo permite 100 caracteres-->por defecto son 255 caracteres
    nombre: string;

    @Column({type: 'varchar',nullable: false})
    apellido: string;

    @Column({unique: true,type: 'varchar',nullable: false})//mira que el correo electronico sea unico en la base de datos
    email:string;

    @Column({type:'varchar',nullable: false})
    password: string;

    @Column({default: true})//le dice que por defecto la columna va a estar en false
    isActive: boolean;//esta es para decir si la cuenta esta activada o desactivada

    @Column({//le dice que el tipo de la columna va a ser "enum" que se encuentra en el archivo "RolUsuario.enum.ts" 
        type: 'enum',
        enum: rolusuario,
        name: "ROL",
        default:rolusuario.usuario
        //default:rolusuario.usuario.toString()//por defecto, se va a crear la cuenta como usuario
    })
    rol: rolusuario;//la variable va ser de tipo enum que esta definida en el archivo como una lista de posibilidades

}