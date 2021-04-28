import { IsDate, IsNotEmpty, IsNumber } from "class-validator";


export class ActulizarFechaDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    //@IsNotEmpty()
    @IsDate()
    Fecha: Date;

    
}