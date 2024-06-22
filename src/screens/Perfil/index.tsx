import {
  Avatar,
  Box,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import bgPerfil from "../../assets/images/bgPerfil.png";
import CardHistorico from "../../components/CardHistorico";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Calendario from "../../components/Calendario";
import { ButtonEstilizado } from "../../components/ButtonEstilizado";
import CartaoFidelidade from "../../components/CartaoFidelidade";
import IAgendamento from "../../@types/IAgendamento";
import IServico from "../../@types/IServico";
import IProfissional from "../../@types/IProfissional";
import IUsuario from "../../@types/IUsuario";
import { api } from "../../components/API";
import ICartaoFidelidade from "../../@types/ICartaoFidelidade";

export default function Perfil({ navigation }) {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [fotoUsuario, setFotoUsuario] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [clienteId, setClienteId] = useState<string | null>(null);
  const [agendamentos, setAgendamentos] = useState<IAgendamento[]>([]);
  const [servicos, setServicos] = useState<IServico[]>([]);
  const [profissionais, setProfissionais] = useState<IProfissional[]>([]);
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  const [cartaoFidelidade, setCartaoFidelidade] = useState<ICartaoFidelidade>();

  useEffect(() => {
    const fetchNomeUsuario = async () => {
      try {
        const nomeUsuario = await AsyncStorage.getItem("usuarioNome");
        setNomeUsuario(nomeUsuario);
      } catch (error) {
        console.error("Erro ao obter o nome do cliente:", error);
      }
    };

    fetchNomeUsuario();
  }, []);

  useEffect(() => {
    const fetchFotoUsuario = async () => {
      try {
        const fotoUsuario = await AsyncStorage.getItem("usuarioFoto");
        setFotoUsuario(fotoUsuario);
      } catch (error) {
        console.error("Erro ao obter a foto do cliente:", error);
      }
    };

    fetchFotoUsuario();
  }, []);

  useEffect(() => {
    const fetchTipoUsuario = async () => {
      try {
        const tipoUsuario = await AsyncStorage.getItem("usuarioTipo");
        setTipoUsuario(tipoUsuario);
      } catch (error) {
        console.error("Erro ao obter a tipo do usuario:", error);
      }
    };

    fetchTipoUsuario();
  }, []);

  useEffect(() => {
    const fetchClienteId = async () => {
      try {
        const id = await AsyncStorage.getItem("clienteId");
        setClienteId(id);
        if (id) {
          fetchAgendamentos(id);
          fetchCartaoFidelidade(id);
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
            age_status: false,
          },
        });

        const agendamentosAtivos = responseAgendamentos.data.filter(
          (agendamento: IAgendamento) => agendamento.age_status === false
        );

        setAgendamentos(agendamentosAtivos);

        const servicosIds = agendamentosAtivos.map(
          (agendamento: IAgendamento) => agendamento.ser_id
        );
        const responseServicos = await api.get(`ser_servicos`, {
          params: {
            id: servicosIds,
          },
        });
        setServicos(responseServicos.data);

        const profissionaisIds = agendamentosAtivos.map(
          (agendamento: IAgendamento) => agendamento.pro_id
        );
        const responseProfissionais = await api.get(`pro_profissionais`, {
          params: {
            id: profissionaisIds,
          },
        });
        setProfissionais(responseProfissionais.data);

        const responseUsuarios = await api.get(`usu_usuarios`);
        setUsuarios(responseUsuarios.data);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      }
    };

    const fetchCartaoFidelidade = async (id: string) => {
      try {
        const responseCartaoFidelidade = await api.get(`cf_cartaoFidelidade`, {
          params: {
            cli_id: id,
          },
        });
        setCartaoFidelidade(responseCartaoFidelidade.data[0]);
      } catch (error) {
        console.error("Erro ao buscar o cartao do cliente", error);
      }
    };

    fetchClienteId();
  }, []);

  return (
    <ScrollView flex={1} bg={"#1D1D1D"}>
      <Image
        w={"100%"}
        h={200}
        source={bgPerfil}
        alt="Foto de fundo do perfil"
      />
      <VStack
        position="absolute"
        top={32}
        w={"100%"}
        h={150}
        roundedTop={52}
        bgColor={"#1D1D1D"}
        alignItems={"center"}
      >
        <VStack position={"absolute"}>
          <Avatar source={{ uri: fotoUsuario }} size={"2xl"} bottom={12} />
        </VStack>
      </VStack>
      <VStack justifyContent={"center"} alignItems={"center"} mt={8}>
        <Text
          color={"#E29C31"}
          fontSize={32}
          textTransform={"uppercase"}
          fontFamily={"NeohellenicBold"}
          textAlign={"center"}
        >
          {nomeUsuario}
        </Text>
      </VStack>

      {tipoUsuario === "C" ? (
        <VStack p={5}>
          <Text color={"#E29C31"} fontFamily={"NeohellenicBold"} fontSize={22}>
            Horários ativos:
          </Text>

          <VStack mt={5} justifyContent={"center"} p={2}>
            <VStack>
              {agendamentos.map((agendamento) => (
                <Box my={4} key={agendamento.id}>
                  <CardHistorico
                    agendamento={agendamento}
                    servicos={servicos}
                    profissionais={profissionais}
                    usuarios={usuarios}
                    ativo={true}
                  />
                </Box>
              ))}
            </VStack>
          </VStack>
          <Pressable onPress={() => navigation.navigate("Historico")}>
            <Text
              color={"white"}
              fontFamily={"NeohellenicRegular"}
              fontSize={16}
              underline
            >
              Ver histórico...
            </Text>
          </Pressable>
          <Text
            color={"#E29C31"}
            fontFamily={"NeohellenicBold"}
            fontSize={22}
            mt={4}
          >
            Cartão fidelidade:
          </Text>
          <Text
            color={"white"}
            opacity={70}
            fontSize={18}
            fontFamily={"NeohellenicRegular"}
          >
            Com dez serviços concluídos você pode resgatar um corte de cabelo
            grátis!
          </Text>
          <Box mt={4} mb={24}>
            {cartaoFidelidade && (
              <CartaoFidelidade cartaoFidelidade={cartaoFidelidade} />
            )}
          </Box>
        </VStack>
      ) : (
        <VStack p={5}>
          <Text color={"#E29C31"} fontFamily={"NeohellenicBold"} fontSize={24}>
            Agenda
          </Text>
          <Box mt={4}>
            <Calendario />
          </Box>
        </VStack>
      )}
    </ScrollView>
  );
}
