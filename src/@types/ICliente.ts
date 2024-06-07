import IUsuario from "./IUsuario";

export default interface ICliente extends IUsuario {
  id: string;
  cli_telefone: string;
  usu_id: string;
}
