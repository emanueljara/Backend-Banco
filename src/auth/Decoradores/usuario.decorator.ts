//este decorador ayuda a extraer la informacion de un usuario
//una vez que se haga un request (solicitud)

//simplemente va a ser una funcion que la va a utilizar el controlador
import { createParamDecorator } from "@nestjs/common";
import { CrearUsuarioDto } from "src/usuario/DTO/CrearUsuario.dto";

//"ObtenerUsuario" extrae el usuario del request
export const ObtenerUsuario=createParamDecorator(
    (data, req): CrearUsuarioDto => {
        return req.usuario;
    },
);