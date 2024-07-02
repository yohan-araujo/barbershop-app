import { Divider, Text, VStack } from "native-base";
import IAgendamento from "../../@types/IAgendamento";
import IServico from "../../@types/IServico";
import IProfissional from "../../@types/IProfissional";
import IUsuario from "../../@types/IUsuario";

interface CardHistoricoProps {
  ativo?: Boolean;
  agendamento: IAgendamento;
  servicos: IServico[];
  profissionais: IProfissional[];
  usuarios: IUsuario[]; // Receber a lista de usuários
}

export default function CardHistorico({
  ativo = false,
  agendamento,
  servicos,
  profissionais,
  usuarios,
}: CardHistoricoProps) {
  // Encontrar o tipo de serviço correspondente ao ID
  const servico = servicos.find((servico) => servico.id === agendamento.ser_id);

  // Encontrar o profissional correspondente ao ID
  const profissional = profissionais.find(
    (profissional) => profissional.id === agendamento.pro_id
  );

  // Encontrar o usuário (profissional) correspondente ao ID
  const usuarioProfissional = usuarios.find(
    (usuario) => usuario.id === profissional?.usu_id.toString()
  );

  return (
    <VStack
      w={"95%"}
      h={120}
      bgColor={ativo ? "#E29C31" : "black"}
      rounded={"3xl"}
      p={4}
      borderWidth={4}
      borderColor={"black"}
    >
      <Text
        color={ativo ? "black" : "#E29C31"}
        fontFamily={"NeohellenicBold"}
        textTransform={"uppercase"}
        fontSize={16}
      >
        {servico ? servico.ser_tipo : "Tipo de Serviço não encontrado"}
      </Text>
      <Divider bgColor={ativo ? "black" : "white"} />
      <Text
        color={ativo ? "black" : "white"}
        fontFamily={"NeohellenicBold"}
        textTransform={"uppercase"}
        fontSize={16}
        my={1}
      >
        {usuarioProfissional
          ? usuarioProfissional.usu_nomeCompleto
          : "Profissional não encontrado"}
      </Text>
      <Divider bgColor={ativo ? "black" : "white"} />
      <Text
        color={ativo ? "black" : "gray.300"}
        fontFamily={"NeohellenicBold"}
        fontSize={16}
      >
        {agendamento.age_data} | {agendamento.age_hora} Horas
      </Text>
    </VStack>
  );
}
