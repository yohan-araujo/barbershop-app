import React, { useEffect, useState } from "react";
import { Box, Divider, HStack, ScrollView, Text, VStack } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Calendario from "../../components/Calendario";
import IAgendamento from "../../@types/IAgendamento";
import ICliente from "../../@types/ICliente";
import IUsuario from "../../@types/IUsuario";
import IServico from "../../@types/IServico";
import { api } from "../../components/API";
import Checkbox from "../../components/Checkbox";
import CardAgendamento from "../../components/CardAgendamento";
import { ButtonEstilizado } from "../../components/ButtonEstilizado";
import MensagemFeedback from "../../components/MensagemFeedback";

export default function ConfAgendamento() {
  const [profissionalId, setProId] = useState<string>("");
  const [agendamentos, setAgendamentos] = useState<IAgendamento[]>([]);
  const [clientes, setClientes] = useState<ICliente[]>([]);
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  const [servicos, setServicos] = useState<IServico[]>([]);
  const [selectedAgendamentos, setSelectedAgendamentos] = useState<string[]>(
    []
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [tipoFeedback, setTipoFeedback] = useState<"sucesso" | "erro">(
    "sucesso"
  );
  const [mensagemFeedback, setMensagemFeedback] = useState("");

  useEffect(() => {
    const fetchProId = async () => {
      try {
        const profissionalId = await AsyncStorage.getItem("profissionalId");
        setProId(profissionalId || "");
      } catch (error) {
        console.error("Erro ao obter o id do profissional:", error);
      }
    };

    fetchProId();
  }, []);

  useEffect(() => {
    if (profissionalId && selectedDate) {
      const fetchData = async () => {
        try {
          const [
            agendamentosResponse,
            clientesResponse,
            usuariosResponse,
            servicosResponse,
          ] = await Promise.all([
            api.get<IAgendamento[]>("/age_agendamentos"),
            api.get<ICliente[]>("/cli_clientes"),
            api.get<IUsuario[]>("/usu_usuarios"),
            api.get<IServico[]>("/ser_servicos"),
          ]);

          const agendamentosFiltrados = agendamentosResponse.data.filter(
            (agendamento) =>
              agendamento.pro_id === profissionalId &&
              agendamento.age_data === selectedDate &&
              !agendamento.age_status
          );

          setAgendamentos(agendamentosFiltrados);
          setClientes(clientesResponse.data);
          setUsuarios(usuariosResponse.data);
          setServicos(servicosResponse.data);
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      };

      fetchData();
    } else {
      setAgendamentos([]);
    }
  }, [profissionalId, selectedDate]);

  const handleCheckboxChange = (id: string) => {
    setSelectedAgendamentos((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((agendamentoId) => agendamentoId !== id)
        : [...prevSelected, id]
    );
  };

  const confirmarAgendamentos = async (navigation) => {
    try {
      for (const agendamentoId of selectedAgendamentos) {
        await api.patch(`/age_agendamentos/${agendamentoId}`, {
          age_status: true,
        });
      }

      setAgendamentos((prevAgendamentos) =>
        prevAgendamentos.map((agendamento) =>
          selectedAgendamentos.includes(agendamento.id)
            ? { ...agendamento, age_status: true }
            : agendamento
        )
      );
      setTipoFeedback("sucesso");
      setMensagemFeedback("Agendamento confirmado com sucesso!");
      setMostrarFeedback(true);
      setSelectedAgendamentos([]);
    } catch (error) {
      console.error("Erro ao confirmar agendamentos:", error);
      setTipoFeedback("erro");
      setMensagemFeedback("Erro ao confirmar agendamentos, tente novamente.");
      setMostrarFeedback(true);
    }
  };

  const handleDateChange = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    setSelectedDate(formattedDate);
  };

  return (
    <ScrollView flex={1} bgColor={"#1D1D1D"}>
      <Text
        color={"#E29C31"}
        textAlign={"center"}
        textTransform={"uppercase"}
        fontFamily={"NeohellenicBold"}
        fontSize={22}
        mt={8}
      >
        Agenda
      </Text>

      <VStack flex={1} roundedTop={18} bgColor={"black"} p={5} mt={4}>
        <Calendario onDataChange={handleDateChange} />
        <Box justifyContent={"center"} alignItems={"center"} mt={4}>
          <Divider bgColor={"white"} />
        </Box>
        <Text color={"white"} mt={2} fontFamily={"NeohellenicRegular"}>
          {selectedDate
            ? `Agendamentos para ${selectedDate}`
            : "Nenhum dia selecionado"}
        </Text>

        <HStack justifyContent={"space-around"} space={24} mt={8}>
          <Text
            color={"#E29C31"}
            textTransform={"uppercase"}
            fontFamily={"NeohellenicBold"}
            fontSize={16}
          >
            Agendamento
          </Text>
          <Text
            color={"#E29C31"}
            textTransform={"uppercase"}
            fontFamily={"NeohellenicBold"}
            fontSize={16}
          >
            Confirmar
          </Text>
        </HStack>
        <Box justifyContent={"center"} alignItems={"center"} mt={1}>
          <Divider bgColor={"white"} />
        </Box>

        {agendamentos.length > 0 ? (
          agendamentos.map((agendamento) => (
            <HStack
              key={agendamento.id}
              mt={4}
              alignItems="center"
              justifyContent={"space-around"}
            >
              <CardAgendamento
                agendamento={agendamento}
                clientes={clientes}
                usuarios={usuarios}
                servicos={servicos}
              />
              <Checkbox
                isChecked={selectedAgendamentos.includes(agendamento.id)}
                onChange={() => handleCheckboxChange(agendamento.id)}
              />
            </HStack>
          ))
        ) : (
          <Text color={"white"} mt={4}>
            Nenhum agendamento para esta data.
          </Text>
        )}

        <Box justifyContent={"center"} alignItems={"center"} mt={12} mb={32}>
          <ButtonEstilizado texto="Confirmar" onPress={confirmarAgendamentos} />
        </Box>
      </VStack>

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
