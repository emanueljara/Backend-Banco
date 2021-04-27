import { Controller ,Get,Param,Post,Delete,Put,Body, UseGuards} from '@nestjs/common';
import { UsuarioService } from "./../services/usuario.service";//se importa el servicio
import { CrearUsuarioDto } from "./../DTO/CrearUsuario.dto";
import { AuthGuard } from '@nestjs/passport';
//el controlador es el que se encarga de enrutar y llamar al servicio correspondiente

@Controller('user')
export class UsuarioController {

    constructor(//con esto el controlador puede accerder a cualquier metodo del servicio que este como publico
        private ServicioUsuario: UsuarioService//inyeccion de dependencias
    ){}
    //UseGuards--> es para aplicar los decoradores 
    //AuthGuard--> ejecuta de la carpeta "strategies" que se encuentra en "Auth", el fichero "jwt.strategy.ts"
    //@UseGuards(AuthGuard()) //este decorador protege el metodo de traer todos los usuarios... permite ejecutar el metodo, solo a los usuarios que se hayan autentificado,
    @Get('get-all-users')   //es decir, que hagan la peticion con su token (autentificados)
    getAllUsers(){
        return this.ServicioUsuario.BuscarTodos();
    }
    @Get('get-users/:id')
    getUser(@Param('id') id:number){
        return this.ServicioUsuario.BuscarUno(id);
    }
    //@Post()
    //CreateUser(@Body() body:CrearUsuarioDto){
    //    return this.ServicioUsuario.CrearUsuario(body);
    //}
    @Put('update-user')
    updateUser(@Body() Body:CrearUsuarioDto){
        return this.ServicioUsuario.ActualizarUsuario(Body);
    }
    @Delete('delete-user/:email')
    deleteUser(@Param('email') email: string){
        return this.ServicioUsuario.BorrarUsuario(email);
    }

}
