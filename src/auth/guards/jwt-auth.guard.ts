import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

//los guards sirven para ejecutar las estrategias, que son tipos de validaciones
//para autentificarsen en el servidor

//el guard jwt (json web token) ejecuta la estrategia que se importa de las libreria "jwt", la cual se encuentra en la 
//carpeta "strategies". La estrategia jwt sirve para cuando el usuario se autentifica, darle un codigo
//(token) que le permita interactuar con el servicio sin tener que iniciar seccion cada vez que quiera 
//hacer una accion dentro de la pagina, ademas permite bloquear o permitir el paso a algunos endpoints 
//(funcionalidades de la pagina)

//En este archivo se cambia el nombre a este guard

@Injectable()
export class AuthPorToken_jwt extends AuthGuard('jwt'){}