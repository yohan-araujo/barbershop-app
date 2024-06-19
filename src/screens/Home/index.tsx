import {
  Avatar,
  Box,
  Text,
  VStack,
  Spacer,
  Divider,
  ScrollView,
  Image,
  Row,
  FlatList,
  Wrap,
  HStack,
} from "native-base";
import imgCarrosel from "../../assets/images/imgCarroselHome.png";
import { useFonts } from "expo-font";
import Carrossel from "../../components/Carrosel";
import { useEffect, useState } from "react";
import IServico from "../../@types/IServico";
import IProfissional from "../../@types/IProfissional";
import { api } from "../../components/API";
import CardProfissionalHome from "../../components/CardProfissionalHome";
import CardServicoHome from "../../components/CardServicoHome";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const [fontsCarregadas, fontsError] = useFonts({
    NeohellenicRegular: require("../../assets/fonts/Neohellenic/GFSNeohellenic-Regular.ttf"),
    NeohellenicBold: require("../../assets/fonts/Neohellenic/GFSNeohellenic-Bold.ttf"),
  });
  const [servicos, setServicos] = useState<IServico[]>([]);
  const [profissionais, setProfissionais] = useState<IProfissional[]>([]);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [fotoUsuario, setFotoUsuario] = useState("");

  useEffect(() => {
    const fetchNomeUsuario = async () => {
      try {
        const nome = await AsyncStorage.getItem("usuarioNome");
        setNomeUsuario(nome);
      } catch (error) {
        console.error("Erro ao obter o nome do cliente:", error);
      }
    };

    fetchNomeUsuario();
  }, []);

  useEffect(() => {
    const fetchFotoUsuario = async () => {
      try {
        const foto = await AsyncStorage.getItem("usuarioFoto");
        setFotoUsuario(foto);
      } catch (error) {
        console.error("Erro ao obter a foto do cliente:", error);
      }
    };

    fetchFotoUsuario();
  }, []);

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

  return (
    <ScrollView flex={1} p={5} backgroundColor={"#1D1D1D"}>
      <HStack>
        <Box>
          <Text color="white" fontSize={20} fontFamily={"NeohellenicRegular"}>
            Bem vindo de volta,
          </Text>
          <Text color={"#E29C31"} fontSize={20} fontFamily={"NeohellenicBold"}>
            {nomeUsuario}
            <Text color="white" fontSize={20} fontFamily={"NeohellenicRegular"}>
              !
            </Text>
          </Text>
        </Box>
        <Spacer />
        <Box>
          <Avatar source={{ uri: fotoUsuario }} size={"lg"} />
        </Box>
      </HStack>

      <Divider mt={15} />
      <Box
        backgroundColor={"black"}
        h={125}
        mt={12}
        borderRadius={"xl"}
        justifyContent={"center"}
      >
        <Image
          source={imgCarrosel}
          alt="foto do carrosel"
          h={125}
          borderRadius={"2xl"}
        />
      </Box>

      <Divider bgColor={"white"} opacity={40} mt={8} />

      <Text
        color={"#E29C31"}
        fontSize={22}
        fontFamily={"NeohellenicBold"}
        mt={4}
      >
        Qual serviço você deseja hoje?
      </Text>

      <Text
        color={"white"}
        fontFamily={"NeohellenicRegular"}
        fontSize={18}
        opacity={70}
      >
        Clique em um serviço para visualizar quais profissionais realizam!
      </Text>

      <Divider bgColor={"white"} opacity={40} mt={4} />

      <Box justifyContent={"center"} alignItems={"center"}>
        <Box
          flexDirection={"row"}
          flexWrap={"wrap"}
          justifyItems={"space-between"}
          mx={-2}
          mt={12}
        >
          {servicos.map((servico) => (
            <Box key={servico.id} mx={4} my={6}>
              <CardServicoHome servico={servico} />
            </Box>
          ))}
        </Box>
      </Box>

      <Text
        color={"#E29C31"}
        mt={4}
        fontSize={24}
        fontFamily={"NeohellenicBold"}
      >
        Profissionais
      </Text>

      <Box h={96}>
        <Carrossel>
          {profissionais.map((profissional) => (
            <CardProfissionalHome
              key={profissional.id}
              profissional={profissional}
            />
          ))}
        </Carrossel>
      </Box>
    </ScrollView>
  );
}
