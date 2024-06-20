import { Text, VStack } from "native-base";

export default function Historico() {
  return (
    <VStack flex={1} p={5} bgColor={"#1D1D1D"}>
      <Text
        color={"#E29C31"}
        textTransform={"uppercase"}
        fontSize={22}
        fontFamily={"NeohellenicBold"}
        textAlign={"center"}
        mb={4}
      >
        Histórico
      </Text>
    </VStack>
  );
}
