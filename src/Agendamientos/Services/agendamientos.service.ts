import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatosCita } from "../entities/agendar.entity";
import { estadoCita } from "../entities/EstadoCita.enum";
import { CrearFechaDto } from "../DTO/Crear-agendamiento.dto";
import { ActulizarFechaDto } from "../DTO/Actualizar-agendamiento.dto";
import { UsuarioService } from '../../usuario/services/usuario.service'
import { ActulizarEstadoCita } from "../DTO/actualizarEstado-agendamiento.dto";

@Injectable()
export class AgendamientosService {
    constructor(
        @InjectRepository(DatosCita) private RepositorioAgendamiento: Repository <DatosCita>,
        private ServicioUsuario: UsuarioService 
    ){}

    async VerAllCitas():Promise<DatosCita[]>{
        return await this.RepositorioAgendamiento.find();
    }

    async BuscarCitaPorEstado(EstadoCita:estadoCita):Promise<DatosCita[]>{
        return await this.RepositorioAgendamiento.find({
            where: {EstadoCita},
        })
    }

    async CrearCita(crearCita: CrearFechaDto):Promise<void>{
        const UsuarioEncontrado = await this.ServicioUsuario.BuscarUno(crearCita.id); // porque lanza error??
        const CrearFecha = await this.RepositorioAgendamiento.create(crearCita);
        CrearFecha.user=UsuarioEncontrado;
        await this.RepositorioAgendamiento.save(CrearFecha);
    }

    async ActualizarCita(actualizarCita:ActulizarFechaDto): Promise<void>{
        const FechaEncontrada = await this.RepositorioAgendamiento.findOne(actualizarCita.id);
        const FechaActualizada = await this.RepositorioAgendamiento.merge(FechaEncontrada,actualizarCita);
        await this.RepositorioAgendamiento.save(FechaActualizada);
    }

    async ActualizarStatusCita(actualizarEstadoCita:ActulizarEstadoCita): Promise<void>{
        const FechaEncontrada = await this.RepositorioAgendamiento.findOne(actualizarEstadoCita.id);
        const FechaActualizada = await this.RepositorioAgendamiento.merge(FechaEncontrada,actualizarEstadoCita);
        await this.RepositorioAgendamiento.save(FechaActualizada);
    }

    async BorrarCita(id:number):Promise<void>{
        const FechaToDelete = await this.RepositorioAgendamiento.findOne(id);
        await this.RepositorioAgendamiento.delete(FechaToDelete);
    }
}
