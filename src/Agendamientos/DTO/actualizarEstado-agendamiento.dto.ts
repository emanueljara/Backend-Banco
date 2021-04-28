import { IsNotEmpty, IsNumber } from "class-validator";
import { estadoCita } from "../entities/EstadoCita.enum";

export class ActulizarEstadoCita{

    @IsNotEmpty()
    @IsNumber()
    id: number;

    estadoCita: estadoCita;
}