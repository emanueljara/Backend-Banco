import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './Controllers/auth.controller';
import { RepositorioAutentificacion } from './Repositorios/auth.repository';
import { AuthService } from './Services/auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy'
import { RolGuard } from './guards/rol.guard';
import { AuthPorToken_jwt } from "./guards/jwt-auth.guard";


@Module({
  imports: [
    TypeOrmModule.forFeature([RepositorioAutentificacion]),//se le dice que se va a utilizar un modulo de Type orm y se dice cual es
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: 3600},
    }),
 
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,LocalStrategy,RolGuard,AuthPorToken_jwt],//"JwtStrategy"->la estrategia que creamos se ejecuta automaticamente cuando la exportamos y utilizamos como providers
  exports:[JwtStrategy, PassportModule,AuthService]
})
export class AuthModule {}
