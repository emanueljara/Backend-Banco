import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AutentificacionInicioSeccionDto, RegistroDto } from '../DTO';
import { AuthForSeeIfEmailPasswordExist,AuthPorToken_jwt,RolGuard } from '../guards';
import { AuthService } from "../Services/auth.service";
import { Roles } from "../Decoradores/Rol.decorator";
import { rolusuario } from "../../usuario/entities/RolUsuario.enum";
//va a tener dos metodos:
//1) responsable de iniiciar seccion
//2) responsable de crear usuario

@Controller('auth')
export class AuthController {
    //para poder utilizar un servicio debemos inyectarlo, por lo tanto se debe poner un constructor que resiva el servicio:
    
    constructor(private readonly ServicioAutentificacion: AuthService){}
    //INICIAR SECCION:
    @UseGuards(AuthForSeeIfEmailPasswordExist) //se verifica si el usuario o contraseña digitados, son correctos
    @Post('login')
    @UsePipes(ValidationPipe)
    async IniciarSeccion(@Body() Entrar:AutentificacionInicioSeccionDto){
        return this.ServicioAutentificacion.IniciarSeccion(Entrar);
    }

    //REGISTRARSE:
    @Post('register-user')
    @Roles(rolusuario.gerente.toString())//se dicen los roles que pueden acceder al endpoint
    @UseGuards(AuthPorToken_jwt,RolGuard)//se mira si el usuario esta autentificado y el rol lo permite acceder a este endpoint
    @UsePipes(ValidationPipe) //este decorador se pone para decirle que tenga en cuenta los decoradores de validacion que estan dentro de "RegistroDto"
    async RegistrarseUsuario(@Body() registro: RegistroDto): Promise<void> {//va a resibir un cuerpo de tipo registroDto que contiene los parametros que le deben pasar para registrarse
        return this.ServicioAutentificacion.registrarUser({...registro,rol: rolusuario.usuario});
    }

    
    @Post('register-watchman')
    @Roles(rolusuario.gerente.toString())//se dicen los roles que pueden acceder al endpoint
    @UseGuards(AuthPorToken_jwt,RolGuard)//se mira si el usuario esta autentificado y el rol lo permite acceder a este endpoint
    @UsePipes(ValidationPipe) //este decorador se pone para decirle que tenga en cuenta los decoradores de validacion que estan dentro de "RegistroDto"
    async RegistrarseCelador(@Body() registro: RegistroDto): Promise<void> {//va a resibir un cuerpo de tipo registroDto que contiene los parametros que le deben pasar para registrarse
        return this.ServicioAutentificacion.registrarUser({...registro,rol: rolusuario.celador});
    }

    @Post('register-power-user')
    @Roles(rolusuario.gerente.toString())//se dicen los roles que pueden acceder al endpoint
    @UseGuards(AuthPorToken_jwt,RolGuard)//se mira si el usuario esta autentificado y el rol lo permite acceder a este endpoint
    @UsePipes(ValidationPipe) //este decorador se pone para decirle que tenga en cuenta los decoradores de validacion que estan dentro de "RegistroDto"
    async RegistrarseAdministrador(@Body() registro: RegistroDto): Promise<void> {//va a resibir un cuerpo de tipo registroDto que contiene los parametros que le deben pasar para registrarse
        return this.ServicioAutentificacion.registrarUser({...registro,rol: rolusuario.Administrador});
    }

    @Post('/register-manager')
    //@Roles(rolusuario.Administrador.toString())//se dicen los roles que pueden acceder al endpoint
    //@UseGuards(AuthPorToken_jwt,RolGuard)//se mira si el usuario esta autentificado y el rol lo permite acceder a este endpoint
    //@UseGuards(AuthPorToken_jwt)
    @UsePipes(ValidationPipe) //este decorador se pone para decirle que tenga en cuenta los decoradores de validacion que estan dentro de "RegistroDto"
    async RegistrarseGerente(@Body() registro: RegistroDto): Promise<void> {//va a resibir un cuerpo de tipo registroDto que contiene los parametros que le deben pasar para registrarse
        return this.ServicioAutentificacion.registrarUser({...registro,rol: rolusuario.gerente});
    }

}
