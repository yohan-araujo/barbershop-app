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
import { api } from "../../components/API";
import MensagemFeedback from "../../components/MensagemFeedback";

export default function Cadastro({ navigation }) {
  const [usu_nomeCompleto, setUsu_nomeCompleto] = useState("");
  const [usu_email, setUsu_email] = useState("");
  const [usu_foto, setUsu_foto] = useState("");
  const [cli_telefone, setCli_telefone] = useState("");
  const [usu_senha, setUsu_senha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [tipoFeedback, setTipoFeedback] = useState<"sucesso" | "erro">(
    "sucesso"
  );
  const [mensagemFeedback, setMensagemFeedback] = useState("");

  const handleCadastro = async () => {
    if (usu_senha !== confirmarSenha) {
      setTipoFeedback("erro");
      setMensagemFeedback("As senhas não coincidem.");
      setMostrarFeedback(true);
      return;
    }

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
        const usuarioData = await usuarioResponse.data;

        const novoCliente = {
          cli_telefone: cli_telefone,
          usu_id: usuarioData.id,
        };

        const clienteResponse = await api.post("/cli_clientes", novoCliente);

        if (clienteResponse.status === 201) {
          // Define a mensagem de sucesso
          setTipoFeedback("sucesso");
          setMensagemFeedback("Cadastro realizado com sucesso.");
          setMostrarFeedback(true);

          navigation.navigate("Login");
        } else {
          throw new Error("Erro ao cadastrar cliente");
        }
      } else {
        console.error("Erro ao cadastrar usuário: ", usuarioResponse.data);
        throw new Error("Erro ao cadastrar usuário");
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      // Define a mensagem de erro
      setTipoFeedback("erro");
      setMensagemFeedback("Erro ao cadastrar, tente novamente.");
      setMostrarFeedback(true);
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
        <Box mt={4}>
          <Text color={"white"} fontSize={16} fontFamily={"NeohellenicBold"}>
            URL da foto
          </Text>
          <InputOutline
            placeholder="URL da foto aqui"
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
            placeholder="(00) 00000-0000"
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
        <Box mt={4}>
          <Text color={"white"} fontSize={16} fontFamily={"NeohellenicBold"}>
            Confirmar Senha
          </Text>
          <InputOutline
            placeholder="Confirme sua senha..."
            mt={3}
            tipo="password"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
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

      {mostrarFeedback && (
        <MensagemFeedback
          tipo={tipoFeedback}
          mensagem={mensagemFeedback}
          isOpen={mostrarFeedback}
          onClose={() => setMostrarFeedback(false)}
        />
      )}
    </ScrollView>
  );
}
