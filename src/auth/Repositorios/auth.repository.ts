import { compare, genSalt, hash } from "bcryptjs";
//import { userInfo } from "node:os";
import { EntityRepository, Repository } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";//la tabla de la base de datos
import { RegistroDto } from "../DTO"; //al haber exortado en "index" solo se necesita decir la carpeta y no el archivo en especifico
import { ConflictException, NotFoundException, UnauthorizedException,HttpException, HttpStatus} from '@nestjs/common';
import { UsuarioService } from '../../usuario/services/usuario.service';
//un repositorio no es mas que la clase que me ayuda a acceder a la base de datos
//atraves de modelos

@EntityRepository(Usuario)
export class RepositorioAutentificacion extends Repository<Usuario> {
    //constructor(private readonly CrudUsuario: UsuarioService){
    //    super();
    //}
    async Registrarse(Registrar: RegistroDto){
        const {nombre, apellido, cedula, rol, email, password}=Registrar;
        const usuario= new Usuario();
        usuario.nombre=nombre;
        usuario.email=email;
        usuario.apellido=apellido;
        usuario.cedula=cedula;
        usuario.rol=rol;
        //aqui puedo asignar el rol po defecto pero ya se esta haciendo automaticamente en 
        // los servicios del usuario

        //salt, lo que hace es generar 10 digitos aleatorios que se agregan a la contraseña
        //para dificultar la decodificacion del hash
        const salt=await genSalt(10);
        usuario.password=await hash(password,salt); //se le genera un hash a la contraseña

        await usuario.save();//--->porque no deja el metodo save??
        //R/ se puso la entidad de usuario a heredar de BaseEntity que se encuentra en typeorm para que funcionara

        //const {password} = Registrar;
        //const salt = await genSalt(10);
        //const contrasena = await hash(password,salt);
        //this.CrudUsuario.CrearUsuario({...Registrar,password: contrasena});
    }
    async ValidarporEmailPassword (email:string, password?:string):Promise<{IfUserFind:boolean,UserFind:Usuario}>{
        const UserFind:Usuario = await this.findOne({
            where: {email},
        }
        )
        
        if(!UserFind){
            throw new HttpException(
                'El email no existe',
                HttpStatus.BAD_REQUEST,
            );
        }
        if (!UserFind.isActive) {
            throw new HttpException(
                'La cuenta se encuentra desactivada',
                HttpStatus.UNAUTHORIZED,
            );
        }
        //!usuario ? throw new UnauthorizedException('El usuario no existe') : true--> ¿porque no da??
        
        if(password){
            const isMatch = await compare(password,UserFind.password); 
            if (!isMatch) {
                throw new HttpException(
                    'La contraseña es incorrecta',
                    HttpStatus.BAD_REQUEST,
                );
            }
        }
        const IfUserFind=true;
        return {IfUserFind,UserFind}

    }
}