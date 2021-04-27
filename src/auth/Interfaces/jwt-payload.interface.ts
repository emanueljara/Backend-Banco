import { rolusuario } from "../../usuario/entities/RolUsuario.enum";
//esta interfaz va a representar lo que queremos que tenga el token

//una interfaz, es un contrato entre clases que va a definir 
//el comportamiento obligatorio de quien implemente la interfaz,
///es decir que la clase que implemente esta interfaz, va atener este comportamiento o parametros etc

//esta interfaz es para determinar lo que va a tener el token
//le podemos meter una fecha de expiracion tambien de tipo "Data"
export interface IjwtPayload{
    id:number;
    name:string;
    lastname:string;
    email:string;
    roles:rolusuario;
    iat?:Date; //la fecha de expiracion del token
}