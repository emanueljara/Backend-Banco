//este dto es para el registro del usuario
import { IsEmail, IsNotEmpty, IsNumber, IsString, length } from 'class-validator';
import { rolusuario } from 'src/usuario/entities/RolUsuario.enum';
export class RegistroDto {
  
    @IsNotEmpty()
    @IsString()
    cedula: string;

    @IsNotEmpty()//valida que no este vacio
    @IsString()//valida que sean string
    nombre: string;

    @IsNotEmpty()
    @IsString()
    apellido:string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsString()
    //@Validate(PasswordValidator)
    //@length(8,12,{"la contraseña debe tener minimo 8 caracteres y maximo 12"})
    password:string;
    
    rol: rolusuario;

}