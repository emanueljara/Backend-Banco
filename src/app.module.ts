import { Module } from '@nestjs/common';
import { UsuarioModule } from "./usuario/usuario.module";
import { TypeOrmModule } from "@nestjs/typeorm";//esto es para abstraer el lenguaje sql de posgrest y simplemente manejarlo como un objeto, sintener que decir "select * from".etc si no usuario.find()-->lo convertimos en un objeto
//import { AuthModule } from './modules/auth/auth.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({//pasa la configuracion de la base de datos para conectarse
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1038419153',
    database: 'CRUD_USER1',//nombre de la base de datos
    entities: ['dist/**/*.entity{.ts,.js}'],//importa las tablas que se crearon para la base de datos
    synchronize: true,//que no este auto sincronizado
    retryDelay: 3000,//por cada intento de conexion espera 3 seg
    retryAttempts: 10//hace esta cantidad de intentos de conexion a la base de datos
  }),
    UsuarioModule,
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
//en "entities" se le dice que va a ir en la carpeta 'dist' y va a importar cualquier archivo 'entity' que termine en '.ts' o '.js'