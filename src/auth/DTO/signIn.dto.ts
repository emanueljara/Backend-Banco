import { IsNotEmpty, IsString } from 'class-validator';
export class AutentificacionInicioSeccionDto {
    @IsNotEmpty() //valida que no este vacio
    @IsString() //valida que sean string
    email: string;
    @IsNotEmpty() //valida que no este vacio
    @IsString() //valida que sean string
    password:string;
}