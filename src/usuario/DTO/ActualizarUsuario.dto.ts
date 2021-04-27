//se importa la lista de posibilidades definidas en el rol de usuario
import { IsNotEmpty } from "class-validator";
import { rolusuario } from "../entities/RolUsuario.enum";

//el DTO indica que parametros se le deben pasar al servidor o variable
//al hacer algun tipo de peticion

export class actualizarUsuario {
    @IsNotEmpty()
    cedula: string;
    @IsNotEmpty()
    nombre: string;
    @IsNotEmpty()
    apellido:string;
    @IsNotEmpty()
    email:string;
    @IsNotEmpty()
    password:string;
    
    rol: rolusuario;
}