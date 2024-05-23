import { ChevronLeftIcon, Image, VStack } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";

interface BotaoPaginacaoProps {
  nome: string;
}

export default function BotaoPaginacao({ nome }: BotaoPaginacaoProps) {
  return (
    <VStack
      w={8}
      h={8}
      bgColor={"#E29C31"}
      rounded={"full"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Ionicons name={nome} color={"black"} size={24} />
    </VStack>
  );
}
