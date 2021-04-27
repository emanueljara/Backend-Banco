import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";//le dice que dentro de este modulo va a utilizar (type orm) que es una abstraccion para manejar las consultas y demas de la base de datos como un objeto sin entrar en el manejo de lenguaje de esta como "select *" etc
import { UsuarioService } from './services/usuario.service';
import { UsuarioController } from './controllers/usuario.controller';
import { Usuario } from "./entities/usuario.entity";//trae la tabla de la base de datos creada
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),//le dice que este modulo va a utilizar la conexion "type orm" y se le aplica a la entidad "Usuario", si hay mas entidades se pondria: TypeOrmModule.forFeature([Usuario,enty2,enty3])-->indicar las entidades que utilizan dentro del modulo
    AuthModule
  ],
  providers: [UsuarioService],
  controllers: [UsuarioController]
})
export class UsuarioModule {}
