//se importa la lista de posibilidades definidas en el rol de usuario
import { IsNotEmpty, IsString } from "class-validator";
import { rolusuario } from "../entities/RolUsuario.enum";

//el DTO indica que parametros se le deben pasar al servidor o variable
//al hacer algun tipo de peticion

export class CrearUsuarioDto {
    @IsNotEmpty()
    @IsString()
    cedula: string;

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    apellido:string;

    @IsNotEmpty()
    @IsString()
    email:string;

    @IsNotEmpty()
    @IsString()
    password:string;
    
    rol: rolusuario;
}