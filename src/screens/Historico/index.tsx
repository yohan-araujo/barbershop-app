import { Box, Pressable, Text, VStack } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import CardHistorico from "../../components/CardHistorico";
import { useEffect, useState } from "react";
import IAgendamento from "../../@types/IAgendamento";
import IServico from "../../@types/IServico";
import IProfissional from "../../@types/IProfissional";
import IUsuario from "../../@types/IUsuario"; // Importe o tipo IUsuario
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../components/API";

export default function Historico({ navigation }) {
  const [agendamentos, setAgendamentos] = useState<IAgendamento[]>([]);
  const [servicos, setServicos] = useState<IServico[]>([]);
  const [profissionais, setProfissionais] = useState<IProfissional[]>([]);
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]); // Estado para armazenar usuários
  const [clienteId, setClienteId] = useState<string | null>(null);

  useEffect(() => {
    const fetchClienteId = async () => {
      try {
        const id = await AsyncStorage.getItem("clienteId");
        setClienteId(id);
        if (id) {
          fetchAgendamentos(id);
        }
      } catch (error) {
        console.error("Erro ao obter o ID do cliente:", error);
      }
    };

    const fetchAgendamentos = async (id: string) => {
      try {
        const responseAgendamentos = await api.get(`age_agendamentos`, {
          params: {
            cli_id: id,
            age_status: true,
          },
        });

        // Filtrar agendamentos com age_status true
        const agendamentosAtivos = responseAgendamentos.data.filter(
          (agendamento: IAgendamento) => agendamento.age_status === true
        );

        setAgendamentos(agendamentosAtivos);

        // Buscar informações de serviços
        const servicosIds = agendamentosAtivos.map(
          (agendamento: IAgendamento) => agendamento.ser_id
        );
        const responseServicos = await api.get(`ser_servicos`, {
          params: {
            id: servicosIds,
          },
        });
        setServicos(responseServicos.data);

        // Buscar informações de profissionais
        const profissionaisIds = agendamentosAtivos.map(
          (agendamento: IAgendamento) => agendamento.pro_id
        );
        const responseProfissionais = await api.get(`pro_profissionais`, {
          params: {
            id: profissionaisIds,
          },
        });
        setProfissionais(responseProfissionais.data);

        // Buscar informações de todos os usuários
        const responseUsuarios = await api.get(`usu_usuarios`);
        setUsuarios(responseUsuarios.data);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      }
    };

    fetchClienteId();
  }, []);

  return (
    <VStack flex={1} p={5} bgColor={"#1D1D1D"}>
      <VStack
        w={8}
        h={8}
        bg={"#E29C31"}
        rounded={"full"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Pressable onPress={() => navigation.navigate("Perfil")}>
          <Ionicons name="arrow-back-outline" color="black" size={24} />
        </Pressable>
      </VStack>
      <Text
        color={"#E29C31"}
        textTransform={"uppercase"}
        fontSize={22}
        fontFamily={"NeohellenicBold"}
        textAlign={"center"}
        mb={4}
      >
        Histórico
      </Text>

      <VStack>
        {agendamentos.map((agendamento) => (
          <Box my={4} key={agendamento.id}>
            <CardHistorico
              agendamento={agendamento}
              servicos={servicos}
              profissionais={profissionais}
              usuarios={usuarios} // Passar usuários para o componente CardHistorico
            />
          </Box>
        ))}
      </VStack>
    </VStack>
  );
}
