import React, { useState } from "react";
import {
  Avatar,
  Box,
  Center,
  FormControl,
  ScrollView,
  Spacer,
  Text,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { InputOutline } from "../../components/InputOutline";
import { ButtonEstilizado } from "../../components/ButtonEstilizado";
import api from "../../components/API";

export default function Cadastro({ navigation }) {
  const [usu_nomeCompleto, setUsu_nomeCompleto] = useState("");
  const [usu_email, setUsu_email] = useState("");
  const [usu_foto, setUsu_foto] = useState("");
  const [cli_telefone, setCli_telefone] = useState("");
  const [usu_senha, setUsu_senha] = useState("");

  const handleCadastro = async () => {
    const novoUsuario = {
      usu_nomeCompleto: usu_nomeCompleto,
      usu_email: usu_email,
      usu_senha: usu_senha,
      usu_foto: usu_foto,
      usu_tipo: "C",
    };

    try {
      const usuarioResponse = await api.post("/usu_usuarios", novoUsuario);

      if (usuarioResponse.status === 201) {
        console.log("Usuário cadastrado com sucesso!");

        const usuarioData = await usuarioResponse.data;

        const novoCliente = {
          cli_telefone: cli_telefone,
          usu_id: usuarioData.id,
        };

        const clienteResponse = await api.post("/cli_clientes", novoCliente);

        if (clienteResponse.status !== 201) {
          throw new Error("Erro ao cadastrar cliente");
        }
        console.log("Cadastro realizado com sucesso!");
        navigation.navigate("Login");
      } else {
        console.error("Erro ao cadastrar usuário: ", usuarioResponse.data);
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar, tente novamente.");
    }
  };

  return (
    <ScrollView flex={1} bg={"#1D1D1D"}>
      <Text
        fontSize={36}
        color={"#E29C31"}
        textAlign={"center"}
        mt={5}
        fontFamily={"NeohellenicBold"}
        textTransform={"uppercase"}
      >
        Cadastrar
      </Text>
      <FormControl mt={4} alignItems={"center"}>
        <Box>
          <Text color={"white"} fontSize={16} fontFamily={"NeohellenicBold"}>
            Nome
          </Text>
          <InputOutline
            placeholder="Insira seu nome completo..."
            mt={3}
            value={usu_nomeCompleto}
            onChangeText={setUsu_nomeCompleto}
          />
        </Box>
        <Box mt={4}>
          <Text color={"white"} fontSize={16} fontFamily={"NeohellenicBold"}>
            Email
          </Text>
          <InputOutline
            placeholder="Insira seu e-mail..."
            mt={3}
            value={usu_email}
            onChangeText={setUsu_email}
          />
        </Box>
        {/* <Box mt={4}>
          <Text color={"white"} fontSize={16} fontFamily={"NeohellenicBold"}>
            Foto de perfil
          </Text>
          <Text color={"gray.500"} fontFamily={"NeohellenicBold"}>
            Envie um arquivo do seu dispositivo
          </Text>
          <Box flexDirection={"row"} mt={2}>
            <Avatar
              size={"xl"}
              source={{
                uri: usu_foto || "https://github.com/yohan-araujo.png",
              }}
              borderWidth={1}
              borderColor={"#E29C31"}
              mt={3}
            />
            <Spacer />
            <ButtonEstilizado texto="Enviar" mt={10} h={12} />
          </Box>
        </Box> */}
        <Box mt={4}>
          <Text color={"white"} fontSize={16} fontFamily={"NeohellenicBold"}>
            URL da foto
          </Text>
          <InputOutline
            placeholder="url da foto aqui"
            mt={3}
            value={usu_foto}
            onChangeText={setUsu_foto}
          />
        </Box>
        <Box mt={4}>
          <Text color={"white"} fontSize={16} fontFamily={"NeohellenicBold"}>
            Telefone
          </Text>
          <InputOutline
            placeholder="(00)00000-0000"
            mt={3}
            value={cli_telefone}
            onChangeText={setCli_telefone}
          />
        </Box>
        <Box mt={4}>
          <Text color={"white"} fontSize={16} fontFamily={"NeohellenicBold"}>
            Senha
          </Text>
          <InputOutline
            placeholder="Insira sua senha..."
            mt={3}
            tipo="password"
            value={usu_senha}
            onChangeText={setUsu_senha}
          />
        </Box>
      </FormControl>
      <Center mt={10}>
        <ButtonEstilizado texto="Cadastrar" onPress={handleCadastro} />
      </Center>
      <Box
        w={"100%"}
        flexDirection={"row"}
        justifyContent={"center"}
        mt={6}
        mb={12}
      >
        <Text color={"white"} underline fontFamily={"NeohellenicRegular"}>
          Já possui conta?{" "}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text
            color={"yellow.500"}
            underline
            fontFamily={"NeohellenicRegular"}
          >
            {" "}
            Entrar
          </Text>
        </TouchableOpacity>
      </Box>
    </ScrollView>
  );
}
