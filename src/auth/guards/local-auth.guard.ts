import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
//los guards sirven para ejecutar las estrategias, que son tipos de validaciones
//para autentificarsen en el servidor

//el guard local ejecuta la estrategia que se importa de las libreria "local", la cual se encuentra en la 
//carpeta "strategies". La estrategia local sirve para cuando el usuario va a iniciar seccion
// verificar si las credenciales existent (email y password) y de lo contrario indicar al 
//usuario que se equivoco digitando alguno de los dos.

//En este archivo se cambia el nombre a este guard


@Injectable()
export class AuthForSeeIfEmailPasswordExist extends AuthGuard('local'){}