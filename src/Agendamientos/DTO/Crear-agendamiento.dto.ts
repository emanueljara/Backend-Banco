import { IsDate, IsNotEmpty, IsNumber } from "class-validator";


export class CrearFechaDto{
    @IsNotEmpty()
    @IsNumber()
    id:number;

    @IsNotEmpty()
    @IsDate()
    Fecha: Date;
}