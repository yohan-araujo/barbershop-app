import {
  Avatar,
  Box,
  Text,
  VStack,
  Spacer,
  Divider,
  ScrollView,
  Center,
  HStack,
  Actionsheet,
  useDisclose,
} from "native-base";
import api from "../../components/API";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import CardServico from "../../components/CardServico";
import CardProfissional from "../../components/CardProfissional";
import { ButtonEstilizado } from "../../components/ButtonEstilizado";
import Carrossel from "../../components/Carrosel";
import IServico from "../../@types/IServico";
import IProfissional from "../../@types/IProfissional";
import CardProfissionalHorizontal from "../../components/CardProfissionalHorizontal";
import HorarioSelecionavel from "../../components/HorarioSelecionavel";
import horarios from "../../assets/jsons/horarios.json";
import Calendario from "../../components/Calendario";
import { format } from "date-fns";

export default function Agendamento({ navigation }) {
  const [numSecao, setNumSecao] = useState(0);
  const [servicos, setServicos] = useState<IServico[]>([]);
  const [profissionais, setProfissionais] = useState<IProfissional[]>([]);
  const [servicoSelecionado, setServicoSelecionado] = useState<string | null>(
    null
  );
  const [profissionalSelecionado, setProfissionalSelecionado] = useState<
    string | null
  >(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(
    null
  );
  const [dataSelecionada, setDataSelecionada] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclose();

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await api.get("/ser_servicos");
        setServicos(response.data);
      } catch (error) {
        console.log("Erro ao buscar servicos: ", error);
      }
    };

    fetchServicos();
  }, []);

  useEffect(() => {
    const fetchProfissionais = async () => {
      try {
        const response = await api.get("/pro_profissionais");
        const proData = response.data;

        const profissionalData = await Promise.all(
          proData.map(async (pro: IProfissional) => {
            const userResponse = await api.get(`/usu_usuarios/${pro.usu_id}`);

            return { ...pro, ...userResponse.data };
          })
        );
        setProfissionais(profissionalData);
      } catch (error) {
        console.log("Erro ao buscar profissionais: ", error);
      }
    };

    fetchProfissionais();
  }, []);

  const avancarSecao = () => {
    setNumSecao(numSecao + 1);
  };
  const voltarSecao = () => {
    if (numSecao > 0) {
      setNumSecao(numSecao - 1);
    } else {
      navigation.navigate("Login");
    }
  };

  const handleSelecionarServico = (id: string) => {
    setServicoSelecionado((servicoSelecionado) =>
      servicoSelecionado === id ? null : id
    );
  };

  const handleSelecionarProfissional = (id: string) => {
    setProfissionalSelecionado((servicoSelecionado) =>
      servicoSelecionado === id ? null : id
    );
  };

  const servicoEscolhido = servicos.find(
    (servico) => servico.id === servicoSelecionado
  );
  const profissionalEscolhido = profissionais.find(
    (profissional) => profissional.id === profissionalSelecionado
  );

  const selecionarHorario = (horario: string) => {
    setHorarioSelecionado(horario);
  };

  const handleDataChange = (data: Date) => {
    const dataFormatada = format(new Date(data), "dd-MM-yyyy");
    setDataSelecionada(dataFormatada);
  };

  const agendar = async () => {
    const agendamento = {
      cli_id: 1,
      pro_id: profissionalSelecionado,
      ser_id: servicoSelecionado,
      age_data: dataSelecionada,
      age_hora: horarioSelecionado,
      age_status: false,
    };

    try {
      const response = await api.post("/age_agendamentos", agendamento);

      if (response.status === 201) {
        console.log("Agendamento realizado com sucesso!");
      } else {
        console.error("Erro ao agendar: ", response.data);
      }
    } catch (error) {
      console.error("Erro ao agendar:", error);
    }
  };

  return (
    <ScrollView flex={1} p={5} backgroundColor={"#1D1D1D"}>
      {numSecao >= 1 && (
        <VStack
          w={8}
          h={8}
          bg={"#E29C31"}
          rounded={"full"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <TouchableOpacity
            onPress={() => {
              voltarSecao();
            }}
          >
            <Ionicons name="arrow-back-outline" color="black" size={24} />
          </TouchableOpacity>
        </VStack>
      )}

      {numSecao === 0 && (
        <>
          <HStack flexDirection={"row"} mt={4}>
            <Box mt={2}>
              <Text
                color={"#E29C31"}
                fontSize={28}
                textTransform={"uppercase"}
                fontFamily={"NeohellenicBold"}
              >
                Agendamento
              </Text>
            </Box>
            <Spacer />
            <Box>
              <Avatar
                source={{ uri: "https://github.com/yohan-araujo.png" }}
                size={"lg"}
              />
            </Box>
          </HStack>
          <Divider mt={15} />
          <Text
            color={"white"}
            mt={2}
            fontSize={18}
            fontFamily={"NeohellenicRegular"}
          >
            Escolha seu serviço e profissional!
          </Text>
          <Text
            color={"#E29C31"}
            mt={4}
            fontSize={24}
            fontFamily={"NeohellenicBold"}
          >
            Serviços
          </Text>
          <Text color={"white"} fontSize={18} fontFamily={"NeohellenicRegular"}>
            Deslize e toque para escolher o serviço.
          </Text>

          <Carrossel>
            {servicos.map((servico) => (
              <CardServico
                key={servico.id}
                servico={servico}
                onSelecionado={handleSelecionarServico}
                estaSelecionado={servicoSelecionado === servico.id}
              />
            ))}
          </Carrossel>

          <Text
            color={"#E29C31"}
            mt={4}
            fontSize={24}
            fontFamily={"NeohellenicBold"}
          >
            Profissionais
          </Text>
          <Text color={"white"} fontSize={18} fontFamily={"NeohellenicRegular"}>
            Deslize e toque para escolher o profissional.
          </Text>

          <Box h={96}>
            <Carrossel>
              {profissionais.map((profissional) => (
                <CardProfissional
                  key={profissional.id}
                  profissional={profissional}
                  onSelecionado={handleSelecionarProfissional}
                  estaSelecionado={profissionalSelecionado === profissional.id}
                />
              ))}
            </Carrossel>
          </Box>

          <Center>
            <ButtonEstilizado
              texto="Próximo"
              mb={32}
              onPress={() => {
                avancarSecao();
              }}
            />
          </Center>
        </>
      )}
      {numSecao === 1 && (
        <VStack>
          <Text
            color={"#E29C31"}
            mt={4}
            fontSize={24}
            fontFamily={"NeohellenicBold"}
          >
            Suas escolhas:
          </Text>
          <Text color={"white"} fontSize={18} fontFamily={"NeohellenicRegular"}>
            Escolhas feitas anteriormente
          </Text>
          <HStack justifyContent={"center"} alignItems={"center"} space={3}>
            {servicoEscolhido && (
              <CardServico
                servico={servicoEscolhido}
                onSelecionado={handleSelecionarServico}
                estaSelecionado={true}
              />
            )}
            {profissionalEscolhido && (
              <CardProfissionalHorizontal
                profissional={profissionalEscolhido}
                onSelecionado={handleSelecionarProfissional}
                estaSelecionado={true}
              />
            )}
          </HStack>
          <Text
            color={"#E29C31"}
            mt={8}
            fontSize={24}
            fontFamily={"NeohellenicBold"}
          >
            Escolha o dia:
          </Text>
          <Text color={"white"} fontSize={18} fontFamily={"NeohellenicRegular"}>
            Escolha o dia para o agendamento.
          </Text>
          <VStack mt={4}>
            <Calendario onDataChange={handleDataChange} />
          </VStack>

          <Text
            color={"#E29C31"}
            mt={8}
            fontSize={24}
            fontFamily={"NeohellenicBold"}
          >
            Escolha o horário:
          </Text>
          <Text color={"white"} fontSize={18} fontFamily={"NeohellenicRegular"}>
            Deslize e toque para escolher o horário.
          </Text>

          <Box mt={4}>
            <Carrossel>
              {horarios.map((horario) => (
                <HorarioSelecionavel
                  key={horario}
                  horario={horario}
                  selecionado={horario === horarioSelecionado}
                  aoSelecionado={() => selecionarHorario(horario)}
                />
              ))}
            </Carrossel>
          </Box>
          <Center mt={16} mb={32}>
            <ButtonEstilizado texto="Agendar" onPress={onOpen} />
          </Center>
        </VStack>
      )}

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content
          bgColor={"#1d1d1d"}
          borderWidth={2}
          borderColor={"#E29C31"}
          borderBottomWidth={0}
          p={8}
        >
          <Text color={"#E29C31"} fontFamily={"NeohellenicBold"} fontSize={24}>
            Confirme seu agendamento:{" "}
          </Text>
          <Actionsheet.Item bgColor={"#1d1d1d"}>
            <Box>
              <Text
                color={"#E29C31"}
                fontFamily={"NeohellenicBold"}
                fontSize={21}
              >
                Dia e hora selecionados:{" "}
              </Text>
              <Text
                color={"white"}
                fontSize={18}
                fontFamily={"NeohellenicRegular"}
              >
                {horarioSelecionado} - {dataSelecionada}
              </Text>
            </Box>
          </Actionsheet.Item>

          <Divider bgColor={"#E29C31"} w={"90%"} />
          <Actionsheet.Item bgColor={"#1d1d1d"}>
            <Box>
              <Text
                color={"#E29C31"}
                fontFamily={"NeohellenicBold"}
                fontSize={21}
              >
                Serviço selecionado:
              </Text>
              {servicoEscolhido && (
                <Text
                  color={"white"}
                  fontSize={18}
                  fontFamily={"NeohellenicRegular"}
                >
                  {servicoEscolhido.ser_tipo} - Preço: R$
                  {servicoEscolhido.ser_preco.toFixed(2)}
                </Text>
              )}
            </Box>
          </Actionsheet.Item>

          <Divider bgColor={"#E29C31"} w={"90%"} />
          <Actionsheet.Item bgColor={"#1d1d1d"}>
            <Box>
              <Text
                color={"#E29C31"}
                fontFamily={"NeohellenicBold"}
                fontSize={21}
              >
                Profissional selecionado:
              </Text>
              {profissionalEscolhido && (
                <Text
                  color={"white"}
                  fontSize={18}
                  fontFamily={"NeohellenicRegular"}
                >
                  {profissionalEscolhido.usu_nomeCompleto}
                </Text>
              )}
            </Box>
          </Actionsheet.Item>

          <Divider bgColor={"#E29C31"} w={"90%"} />
          <Actionsheet.Item bgColor={"#1d1d1d"}>
            <Box>
              <Text
                color={"#E29C31"}
                fontFamily={"NeohellenicBold"}
                fontSize={21}
              >
                Local do estabelecimento:
              </Text>
              {servicoEscolhido && (
                <Text
                  color={"white"}
                  fontSize={18}
                  fontFamily={"NeohellenicRegular"}
                >
                  Rua: Benedito Morais N:110 Nova Guara
                </Text>
              )}
            </Box>
          </Actionsheet.Item>
          <Divider bgColor={"#E29C31"} w={"90%"} />
          <ButtonEstilizado texto="Confirmar" mt={6} onPress={agendar} />
          <ButtonEstilizado texto="Voltar" mt={3} onPress={onClose} />
        </Actionsheet.Content>
      </Actionsheet>
    </ScrollView>
  );
}
