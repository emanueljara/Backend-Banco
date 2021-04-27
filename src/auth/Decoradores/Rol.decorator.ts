import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles:string[])=>SetMetadata('RolesPermitidos', roles);

//se crea un decorador llamado "Roles", el cual resive como parametro una cadena de string de 
//tammaño indefinido, ademas con "SetMetadata" esa cadena de roles se encapsula en la llave "RolesPermitidos"
//la cual ademas, va a permitir identificar cuales guards se ejecutan con el llamado de este decorador

//los guards que se ejecutan al hacer el llamado de este decorador, son los queimplementan 
//atravez de "reflector" esta llave

//el guard que ejecuta este decorador se encuentra en la carpeta "guards"