import { Divider, Text, VStack } from "native-base";

interface CardHistoricoProps {
  ativo?: Boolean;
}

export default function CardHistorico({ ativo = false }: CardHistoricoProps) {
  return (
    <VStack
      w={"95%"}
      h={120}
      bgColor={ativo ? "#E29C31" : "black"}
      rounded={"3xl"}
      p={4}
      borderWidth={"2"}
      borderColor={"#E29C31"}
    >
      <Text
        textAlign={"center"}
        color={ativo ? "black" : "#E29C31"}
        fontFamily={"NeohellenicBold"}
        textTransform={"uppercase"}
        fontSize={18}
      >
        Corte de cabelo
      </Text>
      <Divider bgColor={ativo ? "black" : "white"} />
      <Text
        color={ativo ? "black" : "white"}
        fontFamily={"NeohellenicBold"}
        textTransform={"uppercase"}
        fontSize={18}
        my={1}
      >
        Carlos
      </Text>
      <Divider bgColor={ativo ? "black" : "white"} />
      <Text
        color={ativo ? "black" : "gray.300"}
        fontFamily={"NeohellenicBold"}
        fontSize={18}
      >
        4 de janeiro de 2024 | 9:00 Horas
      </Text>
    </VStack>
  );
}
