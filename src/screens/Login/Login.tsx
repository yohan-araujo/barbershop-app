import React, { useState } from "react";
import {
  Box,
  Divider,
  FormControl,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import bgLogin from "../../assets/images/bgLogin.png";
import { InputEstilizado } from "../../components/InputEstilizado";
import { ButtonEstilizado } from "../../components/ButtonEstilizado";
import { useFonts } from "expo-font";
import { api } from "../../components/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MensagemFeedback from "../../components/MensagemFeedback"; // Importe o componente MensagemFeedback
import { Dimensions, ImageBackground, TouchableOpacity } from "react-native";

export default function Login({ navigation }) {
  const [fontsCarregadas, fontsError] = useFonts({
    Amithen: require("../../assets/fonts/Amithen/Amithen.otf"),
    NeohellenicRegular: require("../../assets/fonts/Neohellenic/GFSNeohellenic-Regular.ttf"),
    NeohellenicBold: require("../../assets/fonts/Neohellenic/GFSNeohellenic-Bold.ttf"),
  });
  const [usu_email, setUsu_email] = useState("");
  const [usu_senha, setUsu_senha] = useState("");
  const [mostrarFeedback, setMostrarFeedback] = useState(false); // Estado para controlar a exibição da mensagem
  const [tipoFeedback, setTipoFeedback] = useState<"sucesso" | "erro">(
    "sucesso"
  );
  const [mensagemFeedback, setMensagemFeedback] = useState("");

  const handleLogin = async () => {
    try {
      const usuariosResponse = await api.get("/usu_usuarios");
      const usuarios = usuariosResponse.data;

      const usuarioEncontrado = usuarios.find(
        (usuario) =>
          usuario.usu_email === usu_email && usuario.usu_senha === usu_senha
      );

      if (usuarioEncontrado) {
        const { id, usu_nomeCompleto, usu_foto, usu_tipo } = usuarioEncontrado;

        await AsyncStorage.setItem("usuarioNome", usu_nomeCompleto);
        await AsyncStorage.setItem("usuarioFoto", usu_foto);
        await AsyncStorage.setItem("usuarioTipo", usu_tipo);

        if (usu_tipo === "C") {
          const clientesResponse = await api.get(`/cli_clientes?usu_id=${id}`);
          const clientes = clientesResponse.data;

          if (clientes.length > 0) {
            const cliente = clientes[0];

            await AsyncStorage.setItem("clienteId", cliente.id);
            navigation.navigate("Tabs");
          } else {
            console.log("Cliente não encontrado.");
          }
        } else if (usu_tipo === "P") {
          const profissionaisResponse = await api.get(
            `/pro_profissionais?usu_id=${id}`
          );
          const profissionais = profissionaisResponse.data;

          if (profissionais.length > 0) {
            const profissional = profissionais[0];

            await AsyncStorage.setItem("profissionalId", profissional.id);
            navigation.navigate("Tabs");
          } else {
            console.log("Profissional não encontrado.");
          }
        } else {
          console.log("Tipo de usuário inválido.");
        }

        // Define a mensagem de sucesso
        setTipoFeedback("sucesso");
        setMensagemFeedback("Login realizado com sucesso.");
        setMostrarFeedback(true);
      } else {
        // Define a mensagem de erro
        setTipoFeedback("erro");
        setMensagemFeedback("E-mail ou senha inválidas.");
        setMostrarFeedback(true);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      console.log("Erro ao fazer login.");

      // Define a mensagem de erro
      setTipoFeedback("erro");
      setMensagemFeedback("Erro ao fazer login.");
      setMostrarFeedback(true);
    }
  };

  if (!fontsCarregadas && !fontsError) {
    return null;
  }

  return (
    <ImageBackground
      source={bgLogin}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      }}
    >
      <ScrollView flex={1} p={5}>
        <Box justifyContent={"center"} alignItems={"center"}>
          <Text
            color={"white"}
            fontSize={18}
            textAlign={"center"}
            mt={24}
            fontFamily={"Amithen"}
          >
            Desde{"      "}2021
          </Text>

          <Divider w={"45%"} />

          <Text
            color={"white"}
            fontSize={54}
            textAlign={"center"}
            fontFamily={"Amithen"}
          >
            BarberShop
          </Text>
        </Box>
        <Box mt={64}>
          <FormControl justifyContent={"center"} alignItems={"center"}>
            <InputEstilizado
              placeholder="E-mail"
              mt={4}
              fontSize={18}
              value={usu_email}
              onChangeText={setUsu_email}
            />
            <InputEstilizado
              placeholder="Senha"
              tipo="password"
              mt={4}
              fontSize={18}
              value={usu_senha}
              onChangeText={setUsu_senha}
            />
          </FormControl>
        </Box>
        <Box justifyContent={"center"} alignItems={"center"}>
          <ButtonEstilizado
            texto="Entrar"
            mt={5}
            onPress={handleLogin}
            _text={{ color: "white" }}
            login
          />
        </Box>
        <Box w={"100%"} flexDirection={"row"} justifyContent={"center"} mt={4}>
          <Text
            color={"white"}
            underline
            fontFamily={"NeohellenicRegular"}
            fontSize={18}
          >
            Esqueceu a{" "}
          </Text>
          <TouchableOpacity>
            <Text
              color={"#E29C31"}
              underline
              fontFamily={"NeohellenicRegular"}
              fontSize={18}
            >
              senha?
            </Text>
          </TouchableOpacity>
        </Box>
        <Box w={"100%"} flexDirection={"row"} justifyContent={"center"} mt={2}>
          <Text
            color={"white"}
            underline
            fontFamily={"NeohellenicRegular"}
            fontSize={18}
          >
            Não possui conta?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Cadastro");
            }}
          >
            <Text
              color={"#E29C31"}
              underline
              fontFamily={"NeohellenicRegular"}
              fontSize={18}
            >
              Cadastrar
            </Text>
          </TouchableOpacity>
        </Box>

        {/* Renderiza a MensagemFeedback se mostrarFeedback for true */}
        {mostrarFeedback && (
          <MensagemFeedback
            tipo={tipoFeedback}
            mensagem={mensagemFeedback}
            isOpen={mostrarFeedback}
            onClose={() => setMostrarFeedback(false)}
          />
        )}
      </ScrollView>
    </ImageBackground>
  );
}
