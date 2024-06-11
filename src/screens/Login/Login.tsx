import { Box, Divider, FormControl, Text, VStack } from "native-base";
import bgLogin from "../../assets/images/bgLogin.png";
import { ImageBackground, TouchableOpacity, Dimensions } from "react-native";
import { InputEstilizado } from "../../components/InputEstilizado";
import { ButtonEstilizado } from "../../components/ButtonEstilizado";
import { useFonts } from "expo-font";
import { api } from "../../components/API";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [fontsCarregadas, fontsError] = useFonts({
    Amithen: require("../../assets/fonts/Amithen/Amithen.otf"),
    NeohellenicRegular: require("../../assets/fonts/Neohellenic/GFSNeohellenic-Regular.ttf"),
    NeohellenicBold: require("../../assets/fonts/Neohellenic/GFSNeohellenic-Bold.ttf"),
  });
  const [usu_email, setUsu_email] = useState("");
  const [usu_senha, setUsu_senha] = useState("");
  const [usu_tipo, setUsu_tipo] = useState("");

  const handleLogin = async () => {
    try {
      const usuariosResponse = await api.get("/usu_usuarios");
      const usuarios = usuariosResponse.data;

      const usuarioEncontrado = usuarios.find(
        (usuario) =>
          usuario.usu_email === usu_email && usuario.usu_senha === usu_senha
      );

      if (usuarioEncontrado) {
        const clientesResponse = await api.get(
          `/cli_clientes?usu_id=${usuarioEncontrado.id}`
        );
        const clientes = clientesResponse.data;

        if (clientes.length > 0) {
          const cliente = clientes[0];

          navigation.navigate("Tabs");

          await AsyncStorage.setItem("clienteId", cliente.id);
          await AsyncStorage.setItem(
            "usuarioNome",
            usuarioEncontrado.usu_nomeCompleto
          );
          await AsyncStorage.setItem("usuarioFoto", usuarioEncontrado.usu_foto);
        } else {
          console.log("Cliente não encontrado.");
        }
      } else {
        console.log("Credenciais inválidas. Por favor, tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      console.log("Erro ao fazer login. Por favor, tente novamente.");
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
      <VStack flex={1} alignItems={"center"} p={5}>
        <Text
          color={"white"}
          fontSize={"2xl"}
          textAlign={"center"}
          mt={24}
          fontFamily={"Amithen"}
        >
          Desde{"      "}2021
        </Text>

        <Divider w={"45%"} />

        <Text
          color={"white"}
          fontSize={"54"}
          textAlign={"center"}
          fontFamily={"Amithen"}
        >
          BarberShop
        </Text>

        <Box mt={64}>
          <FormControl>
            <InputEstilizado
              placeholder="E-mail"
              mt={4}
              fontSize={20}
              value={usu_email}
              onChangeText={setUsu_email}
            />
            <InputEstilizado
              placeholder="Senha"
              tipo="password"
              mt={4}
              fontSize={20}
              value={usu_senha}
              onChangeText={setUsu_senha}
            />
          </FormControl>
        </Box>

        <ButtonEstilizado
          texto="Entrar"
          mt={5}
          onPress={handleLogin}
          _text={{ color: "white" }}
          login
        />
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
              {" "}
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
              {" "}
              Cadastrar
            </Text>
          </TouchableOpacity>
        </Box>
      </VStack>
    </ImageBackground>
  );
}
