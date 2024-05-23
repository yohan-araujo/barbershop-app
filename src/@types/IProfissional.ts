import IUsuario from "./IUsuario";

export default interface IProfissional extends IUsuario {
  id: string;
  pro_descricao: string;
  usu_id: string;
}
