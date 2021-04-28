import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatosCita } from "./entities/agendar.entity";
import { UsuarioModule } from "../usuario/usuario.module";
import { AgendamientosService } from "./Services/agendamientos.service";
import { AgendamientosController } from "./Controllers/agendamientos.controller";

@Module({
    imports:[
        TypeOrmModule.forFeature([DatosCita]),
        UsuarioModule,
    ],
    providers:[
        AgendamientosService,
    ],
    exports:[
        AgendamientosService,
    ],
    controllers:[
        AgendamientosController,
    ]
 
})
export class AgendamientosModule {}

