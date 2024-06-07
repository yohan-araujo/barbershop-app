export default interface IUsuario {
  id: string;
  usu_nomeCompleto: string;
  usu_email: string;
  usu_senha: string;
  usu_foto: string;
  usu_tipo: "C" | "P";
}
