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

export default function Perfil({ navigation }) {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [fotoUsuario, setFotoUsuario] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");

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
          <Text color={"#E29C31"} fontFamily={"NeohellenicBold"} fontSize={24}>
            Horários ativos:
          </Text>

          <VStack mt={5} bg={"black"} justifyContent={"center"} p={2}>
            <CardHistorico ativo />
            <VStack mt={4}>
              <CardHistorico />
            </VStack>
          </VStack>

          <Text
            color={"white"}
            fontFamily={"NeohellenicRegular"}
            fontSize={16}
            textAlign={"right"}
            mt={4}
            mr={6}
            underline
          >
            Ver mais..
          </Text>
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
