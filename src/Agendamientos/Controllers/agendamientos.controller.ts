import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AgendamientosService } from '../Services/agendamientos.service';
import { CrearFechaDto } from '../DTO/Crear-agendamiento.dto'
import { ActulizarFechaDto } from '../DTO/Actualizar-agendamiento.dto'
import { Roles } from "../../auth/Decoradores/Rol.decorator";
import { RolGuard } from "../../auth/guards/rol.guard";
import { AuthPorToken_jwt } from "../../auth/guards/jwt-auth.guard";
import { rolusuario } from '../../usuario/entities/RolUsuario.enum'
import { ActulizarEstadoCita } from "../DTO/actualizarEstado-agendamiento.dto";

@Controller('appointment')
export class AgendamientosController {
    constructor(private readonly ServicioAgendamiento: AgendamientosService){}

    @Roles(rolusuario.gerente.toString())
    @UseGuards(AuthPorToken_jwt,RolGuard)
    @Get('get-all-apointment')
    async VerAllAgendamientos(){
        return this.ServicioAgendamiento.VerAllCitas();
    }

    @Roles(rolusuario.gerente.toString())
    @UseGuards(AuthPorToken_jwt,RolGuard)
    @Get('get-status-apointment')
    async FindCitasForStatust(@Request() req){
        return await this.ServicioAgendamiento.BuscarCitaPorEstado(req.payload.estadoCita);
    }

    @Roles(rolusuario.usuario.toString())
    @UseGuards(AuthPorToken_jwt,RolGuard)
    @Post('create-appointment')
    async CrearCita(@Body() Cita: CrearFechaDto):Promise<void>{
        return await this.ServicioAgendamiento.CrearCita(Cita);
    }

    @Roles(rolusuario.usuario.toString())
    @UseGuards(AuthPorToken_jwt,RolGuard)
    @Put('update-appointment')
    async ActulizarCita(@Body() Cita: ActulizarFechaDto):Promise<void>{
        await this.ServicioAgendamiento.ActualizarCita(Cita);
    }

    @Roles(rolusuario.gerente.toString())
    @UseGuards(AuthPorToken_jwt,RolGuard)
    @Put('update-status-appointment')
    async ActulizarEstadoCita(@Body() Cita: ActulizarEstadoCita):Promise<void>{
        await this.ServicioAgendamiento.ActualizarStatusCita(Cita);
    }

    @Roles(rolusuario.gerente.toString())
    @UseGuards(AuthPorToken_jwt,RolGuard)
    @Delete('delete-appointment/:id')
    async BorrarCita(@Param('id') id:number):Promise<void>{
        await this.ServicioAgendamiento.BorrarCita(id);
    }
}
