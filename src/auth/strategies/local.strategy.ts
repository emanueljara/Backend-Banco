import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { RepositorioAutentificacion } from "../Repositorios/auth.repository";
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(RepositorioAutentificacion)
        private readonly _authRepositorio : RepositorioAutentificacion
    ){
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    async validate(email:string,password:string){
        const usuario = await this._authRepositorio.ValidarporEmailPassword(email,password);
        if (usuario.UserFind) {
            return usuario.UserFind;
        }
    }
}