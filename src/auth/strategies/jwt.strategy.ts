//la estrategia es una forma de identificar la contraseña para 
//validar la autentificacion
//--> las estrategias son diferentes metodos utilizados por la libreria "passport"
//con el fin de obtener diferentes formas de autentificar al usuario. Estas etrategias
//son ejecutadas por los "Guards" que son decoradores de la libreria "passport" que se 
//anteponen a la ruta o endpoint que se quiere proteger con algun metodo de autentificacion

//--> El tipo de autentificacion, es dado por "Strategy", en donde segun la libreria de donde 
//se importe va a ser un tipo de autentificacion u otro Ej:
//-> import {Strategy } from "passport-jwt";->para llamarla por medio del Guard que se antepone
//a algun endpoint seria :AuthGuard('jwt')
//esta estrategia sirve para cuando el usuario ya inicio seccion y se quieren restringir algunos 
//accesos a rutas o endpoints o cuando se quiere verificar si el usuario ya esta autentificado
//(inicio seccion) para poder acceder a determinados endpoints

//->import {Strategy } from "passport-local";->para llamarla por medio del Guard que se antepone
//a algun endpoint seria :AuthGuard('local')
//esta estrategia sirve para cuando el usuario esta intentando iniciar seccion, verificar si la 
//contraseña o email son correctos, de lo contrario indicar que no son validos

import { PassportStrategy } from "@nestjs/passport";
//import { Strategy } from "passport";
import { ExtractJwt,Strategy } from "passport-jwt";
import { jwtConstants } from "../constants";
import { RepositorioAutentificacion } from "../Repositorios/auth.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { IjwtPayload } from "../Interfaces/jwt-payload.interface";
import { Injectable, UnauthorizedException } from "@nestjs/common";

//********************************************************** */
//NOTA: -->"passport" se encarga de ejecutar automaticamente el metodo "validacion"

//*********************************************************** */

//si algun dia se quiere crear una autentificacion atravez de instagram, facebook, google etc
//simplemente es crear una nueva estrategia y asignarsela a la contraseña
//esta "estrategia" es una clase que va a funcionar como servicio en autentificacion
@Injectable() //el injectable le indica l modulo que es un servicio
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(RepositorioAutentificacion)
        private readonly _authRepository: RepositorioAutentificacion)
        {//se le pasa al constructor el repositorio de autentificacion para validar que ese token corresponde a un usuario y existe en la base de datos
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),//se le dice de donde va a obtener el token, es decir que se estrae el token de la peticion
            secretOrKey: jwtConstants.secret,//con esto se le esta pasando el secret al constructor padre(PassportStrategy)--> esto configura la clave secreta para descifrar el token con el fin de validarlo y acceder al payload
            ignoreExpiration: false,
        });
    }
    //inicialmente se valida el token y sino es valido devueleve un 401 y si es valido es token
    //entonces llama a la funcion "validate" para permitir verificar si el usuario existe
    async validate(payload: IjwtPayload){//se autentifica si el usuario existe
        const {email}=payload;
       // const user = await this._authRepository.findOne({
       //     where:{email, isActive:true},
       // });

       // if(!user){
       //     throw new UnauthorizedException(); //si el usuario no existe, lanza una excepcion ya definida en nest js
       // }
       const {IfUserFind} = await this._authRepository.ValidarporEmailPassword(email);
       if (!IfUserFind) {
           return false
       }
        return payload; //si el usuario existe, entonces devuelve el payload
    }
}