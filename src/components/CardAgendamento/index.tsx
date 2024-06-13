import React from "react";
import { Box, Text, HStack, Divider } from "native-base";
import IAgendamento from "../../@types/IAgendamento";
import ICliente from "../../@types/ICliente";
import IUsuario from "../../@types/IUsuario";
import IServico from "../../@types/IServico";

interface CardAgendamentoProps {
  agendamento: IAgendamento;
  clientes: ICliente[];
  usuarios: IUsuario[];
  servicos: IServico[];
}

export default function CardAgendamento({
  agendamento,
  clientes,
  usuarios,
  servicos,
}: CardAgendamentoProps) {
  const getClienteNome = (cli_id: string) => {
    const cliente = clientes.find((cli) => cli.id === cli_id);
    if (cliente) {
      const usuario = usuarios.find((usu) => usu.id === cliente.usu_id);
      return usuario ? usuario.usu_nomeCompleto : "Desconhecido";
    }
    return "Desconhecido";
  };

  const getServicoTipo = (ser_id: string) => {
    const servico = servicos.find((ser) => ser.id === ser_id);
    return servico ? servico.ser_tipo : "Desconhecido";
  };

  return (
    <HStack
      key={agendamento.id}
      mt={4}
      alignItems="center"
      justifyContent={"space-around"}
      backgroundColor={"#E29C31"}
      borderRadius={18}
    >
      <Box px={5} py={3}>
        <Text
          fontFamily={"NeohellenicBold"}
          textTransform={"uppercase"}
          fontSize={16}
        >
          {getServicoTipo(agendamento.ser_id)}
        </Text>
        <Divider bgColor={"black"} />
        <Text
          fontFamily={"NeohellenicBold"}
          textTransform={"uppercase"}
          fontSize={16}
        >
          {getClienteNome(agendamento.cli_id)}
        </Text>
        <Divider bgColor={"black"} />
        <HStack space={3}>
          <Text fontFamily={"NeohellenicBold"} fontSize={14}>
            {" "}
            {agendamento.age_data}
          </Text>

          <Text fontFamily={"NeohellenicBold"} fontSize={14}>
            |{agendamento.age_hora} Horas
          </Text>
        </HStack>
      </Box>
    </HStack>
  );
}
