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
} from "native-base";
import imgCarrosel from "../../assets/images/imgCarroselHome.png";
import { useFonts } from "expo-font";
import CardServico from "../../components/CardServico";
import CardProfissional from "../../components/CardProfissional";
import Carrossel from "../../components/Carrosel";
import { useEffect, useState } from "react";
import IServico from "../../@types/IServico";
import IProfissional from "../../@types/IProfissional";
import api from "../../components/API";

export default function Home() {
  const [fontsCarregadas, fontsError] = useFonts({
    NeohellenicRegular: require("../../assets/fonts/Neohellenic/GFSNeohellenic-Regular.ttf"),
    NeohellenicBold: require("../../assets/fonts/Neohellenic/GFSNeohellenic-Bold.ttf"),
  });
  const [servicos, setServicos] = useState<IServico[]>([]);
  const [profissionais, setProfissionais] = useState<IProfissional[]>([]);

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
      <VStack flexDirection={"row"}>
        <Box>
          <Text color="white" fontSize={20} fontFamily={"NeohellenicRegular"}>
            Bem vindo de volta,
          </Text>
          <Text color={"#E29C31"} fontSize={20} fontFamily={"NeohellenicBold"}>
            Yohan
            <Text color="white" fontSize={20} fontFamily={"NeohellenicRegular"}>
              !
            </Text>
          </Text>
        </Box>
        <Spacer />
        <Box>
          <Avatar
            source={{ uri: "https://github.com/yohan-araujo.png" }}
            size={"lg"}
          />
        </Box>
      </VStack>

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

      <VStack bg={"#E29C31"} mt={4} w={"24"} rounded={"full"}>
        <Text fontSize={16} textAlign={"center"} fontFamily={"NeohellenicBold"}>
          Categorias
        </Text>
      </VStack>

      <Text
        color={"#E29C31"}
        mt={4}
        fontSize={24}
        fontFamily={"NeohellenicBold"}
      >
        Serviços
      </Text>

      <Carrossel>
        {servicos.map((servico) => (
          <CardServico key={servico.id} servico={servico} />
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

      <Box h={96}>
        <Carrossel>
          {profissionais.map((profissional) => (
            <CardProfissional
              key={profissional.id}
              profissional={profissional}
            />
          ))}
        </Carrossel>
      </Box>
    </ScrollView>
  );
}
