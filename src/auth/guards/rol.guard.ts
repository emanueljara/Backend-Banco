import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core'

//este guard es para el decorador creado de roles, que apenas se ejecute el decorador internamente va a llamar a este 
//guard para que se ejecute y verifique si el o los roles que se le pasaron al decorador se encuentran en el usuario actual
//es decir en el request
//si los roles que se le pasaron al decordor no son compatibles con el rol del usuario actual,
//se le restringira el paso al usuario en ese endpoind
@Injectable()
export class RolGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector){}
  canActivate(
    context: ExecutionContext, //intercepta la peticion del momento(request) 
  ): boolean | Promise<boolean> | Observable<boolean> { //retorna cualquiera de estos tipos de datos
    const rolespermitidos:string[]=this._reflector.get<string[]>(//reflector permite obtener los string que se le pasaron al decorador de Rol
      'RolesPermitidos',                               //es decir, permite obtener los string de roles que se pasaron (serian los roles permitidos para ese endpoint) 
      context.getHandler(),                            //y almacenaron bajo la llave "RolesPermitidos"--> con esta llave identifica a cual decorador hace referencia
      );
      
      if (!rolespermitidos) {   //si no hay roles que se pasaron, dice que es verdadero para que el codigo se siga ejecutando
        return true;
      }

      const request = context.switchToHttp().getRequest(); // se obtiene la peticion del momento
      const {user} = request  // de la peticion se extrae el objeto usuario, el cual son todos los datos de la entity
      
      if (!this.hasRole(rolespermitidos,user.roles)) {
        throw new HttpException(
          'No se encuentra autorizado para esta seccion',
          HttpStatus.UNAUTHORIZED,
        )
      }
      return true;
  }
  hasRole(rolespermitidos:string[], RolInToken: number){  //se encarga de recorrer los roles permitidos y mirar si son iguales al rol de usuario actual
    for (let RolNum = 0; RolNum < rolespermitidos.length; RolNum++) {
      if (rolespermitidos[RolNum] === RolInToken.toString()) {
        return true;
      }
      
    }
    return false;
  }
}

