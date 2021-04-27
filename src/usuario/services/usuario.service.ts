import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";//para utilizar el Data maper de type orm
//el Data maper lo que perite es desacoplar aun mas el codigo para que sea expandible, facilmente
//el Data maper es un repositorio (un bloque) apartir del cual se manipula la tabla creada(entity)
import { Repository } from "typeorm";
import { actualizarUsuario } from '../DTO/ActualizarUsuario.dto';
import { CrearUsuarioDto } from '../DTO/CrearUsuario.dto';//me importa la estructura de los datos que me deben pasar para procesarlos

import { Usuario } from "./../entities/usuario.entity";//se importa la entidad o tabla de la base de datos

@Injectable()
export class UsuarioService {
    constructor(//le dice que va inyectar un repositorio de la entidad "Usuario" el nombre es "RepositorioUsuario" privada y es de tipo "Repository<Usuario>"
    @InjectRepository(Usuario) private RepositorioUsuario: Repository<Usuario>
    ){}

    BuscarTodos():Promise<Usuario[]>{
       return this.RepositorioUsuario.find();//trae todos los usuarios de la base de datos
    }

    BuscarUno(id: number):Promise<Usuario>{//se le pasa el id para buscar a una sola persona
        return this.RepositorioUsuario.findOne(id);
    }

    async BuscarPorEmail(email:string):Promise<Usuario>{
        const usuarioEncontrado=await this.RepositorioUsuario.findOne({email});
        if (!usuarioEncontrado){
            throw new  HttpException(
                'el usuario con este email mo existe',
                HttpStatus.NOT_FOUND,
            );
        }
        return usuarioEncontrado;

    }

    //CrearUsuario(body: any){//resive el cuerpo que puede ser de cualquier tipo de datos
    //    const nuevoUsuario= new Usuario();//crea una instancia de Usuario (todos los parametros que le atribuye la tabla de la base de datos)
    //    nuevoUsuario.name=body.name;//si hay muchos atributos en la tabla, se tendria que ir agregando uno a uno
    //    return this.RepositorioUsuario.save(nuevoUsuario);//se guarda el nuevo usuario 
    //}
    //para solucionar el problema de que si hay muchos atributos, agregarlos uno a uno, utilizamos:

    //******************************************************************************************************** */
    //*NOTA: este metodo de crear usuario que se encuentra en el servicio de usuario, No se utiliza porque:    *
    //*en el repositorio de autentificacion que se encuentra en la carpeta "auth/Repositorios" hay un metodo   * 
    //*que se encarga de guardar el usuario en la base de datos (registarlo) con su respectiva contraseña      *
    //*encryptada                                                                                              *
    //******************************************************************************************************** */

    //*************************************************************************************************************************** */
    async CrearUsuario( body: CrearUsuarioDto):Promise<void>{
        const nuevoUsuario= await this.RepositorioUsuario.create(body);//con esto, el cuerpo que resive en el Json, automaticamente asigna cada atributo y crea la instancia del objeto
        await this.RepositorioUsuario.save(nuevoUsuario);//guarda el objeto
    }
    //***************************************************************************************************************************** */

    //async ActualizarUsuario(id:number, body:any){
    //    const BuscarUsuario =await this.RepositorioUsuario.findOne(id);
    //    BuscarUsuario.Lastame=body.lastname;//se tendria que poner uno por uno los atributos para actualizarlos
    //    return this.RepositorioUsuario.save(BuscarUsuario);
    //}
    //para no tener que poner uno a uno los atributos que se van a actualizar:
    async ActualizarUsuario(body:actualizarUsuario):Promise<void>{
        const email=body.email;
        const BuscarUsuario =await this.RepositorioUsuario.findOne({email});
        this.RepositorioUsuario.merge(BuscarUsuario,body);//con "merge" actualiza todos los nuevos datos del usuario que buscó
        this.RepositorioUsuario.save(BuscarUsuario);//guarda los datos
    }
    
    async BorrarUsuario(email: string):Promise<Boolean>{
        const usuarioAeliminar= await this.RepositorioUsuario.findOne(email,{
            where:{isActive: true}
        });
        if(!usuarioAeliminar){
            throw new NotFoundException();
        }
       await this.RepositorioUsuario.delete({email});
       return true;//devuelve true si se eliminó el usuario
    }

}
