import { useFonts } from "expo-font";
import { Box, Image, Pressable, Text } from "native-base";
import IServico from "../../@types/IServico";

interface CardServicoProps {
  servico: IServico;
  onSelecionado?: (id: string) => void;
  estaSelecionado?: boolean;
}

export default function CardServico({
  servico,
  estaSelecionado,
  onSelecionado,
}: CardServicoProps) {
  const [fontsCarregadas, fontsError] = useFonts({
    NeohellenicRegular: require("../../assets/fonts/Neohellenic/GFSNeohellenic-Regular.ttf"),
    NeohellenicBold: require("../../assets/fonts/Neohellenic/GFSNeohellenic-Bold.ttf"),
  });

  return (
    <Pressable onPress={() => onSelecionado(servico.id)}>
      <Box
        backgroundColor={"black"}
        h={175}
        w={40}
        mt={4}
        borderRadius={"2xl"}
        justifyContent={"center"}
        key={servico.id}
        borderWidth={3}
        borderColor={estaSelecionado ? "white" : "black"}
      >
        <Image
          mt={1}
          h={100}
          source={{ uri: "https://picsum.photos/150" }}
          borderTopLeftRadius={"2xl"}
          borderTopRightRadius={"2xl"}
          alt={"servicos"}
        />
        <Box h={75}>
          <Text
            color={"white"}
            textAlign={"center"}
            mt={3}
            fontFamily={"NeohellenicBold"}
            fontSize={18}
          >
            {servico.ser_tipo}
          </Text>
          <Text
            color={"white"}
            textAlign={"center"}
            fontFamily={"NeohellenicRegular"}
          >
            Preço: R${servico.ser_preco.toFixed(2)}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
}
