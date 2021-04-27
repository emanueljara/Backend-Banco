import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { RepositorioAutentificacion } from '../Repositorios/auth.repository';
import { AutentificacionInicioSeccionDto, RegistroDto } from '../DTO';
import { IjwtPayload } from '../Interfaces/jwt-payload.interface';



//la autentificacion tiene dos responsabilidades:
//1) hacer inicio de seccion al usuario
//2) registrar usuario
//3)asignar un rol por defecto

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(RepositorioAutentificacion) //se debe tener este decorador en los repositorios
        private readonly RespositorioAuth: RepositorioAutentificacion, //la clase va a resivir el repositorio de autentificacion
        private readonly Serviciojwt: JwtService, // la clase resive el servicio "JWT"(autentificacion de nest js)
        
    ){}

    //Declaracion de los servicios de autentificacion
    //REGISTRARSE:
    async registrarUser(Registrar: RegistroDto):Promise<void>{
        const {cedula, email}=Registrar; //para velidar si el usuario existe o no
        const ValidarUsuarioExist= await this.RespositorioAuth.findOne({
            where:[{cedula},{email}], //se busca un usuario que tiene la misma cedula o mismo email
        });
        //si la cedula o email ya existe, entonces no se puede crear el nuevo usuario
        if(ValidarUsuarioExist){
            throw new ConflictException("El usuario ya existe!!!"); //si existe un usuario, se lanza una excepcion
        }

        //******************************************************************************** */
        //Otra forma de validar es:
        //if(ValidarUsuarioExist){
        //   throw new HttpException(
        //  'User with that email address already exists.',
        //  HttpStatus.CONFLICT,
        //  );    
        //******************************************************************************** */
        //otro tipo de excepcion que se puede utilizar por problemas del servidor:
        // throw new HttpException(
        //'Something went wrong.',
        //HttpStatus.INTERNAL_SERVER_ERROR,
        //);
        //********************************************************************************* */
        //si no existe el usuario, entonces retorna
        return this.RespositorioAuth.Registrarse(Registrar); //aunque el metodo no retorne nada, aqui se llama a la funcion del repositorio(Registrarse) y le pasa los parametros que se digitaron
    }

    //INICIAR SECCION:
    async IniciarSeccion(Ingresar:AutentificacionInicioSeccionDto):Promise<{Token: string}>{//devuelve un token al identificarse
        const {email, password}=Ingresar;
        //const BuscarUsuario: Usuario = await this.RespositorioAuth.findOne({//se crea una variable (BuscarUsuario) de tipo "Usuario"(entiti) y almacena todos los datos de este en esta variable, a la vez tambien guarda un bool de respuesta a la busqueda
        //    where: {email},
        //});
        //si no se encuentra el usuario
        //if(!BuscarUsuario){
        //    throw new NotFoundException("El usuario no existe")
        //}
        //si el usuario existe, se tiene que validar si la contraseña encriptada guardada en la base de datos es correcta:
        //const isMatch= await compare(password, BuscarUsuario.password);//compara la contraseña que se le pasó con la que esta en la base de datos
        //si la contraseña no es correcta:
        //if(!isMatch){
        //    throw new UnauthorizedException('Contraseña incorrecta');
        //}
        //si la contraseña es correcta, se asignan los parametros necesarios para crear el token
        const {UserFind} = await this.RespositorioAuth.ValidarporEmailPassword(email,password);
        const payload : IjwtPayload = {//se dice que "payload" va a ser del tipo interface(IjwtPayload) y se almacenan los parametros del usuario que se busco para generar el token con estos
            id: UserFind.id,
            email: UserFind.email,
            name: UserFind.nombre,
            lastname:UserFind.apellido,
            //roles: BuscarUsuario.rol.map(r => r.name as RoleType)-->es para traer el string del rol ¿porque no funciona?
            roles: UserFind.rol,
        }
        //Ahora se va a crear el Token:
        const Token= await this.Serviciojwt.sign(payload);//le pasamos al serviciojwt lo que queremos que encrypte
        return {Token}; //se retorna el token
    }
}
