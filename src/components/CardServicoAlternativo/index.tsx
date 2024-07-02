import { useFonts } from "expo-font";
import { Box, Image, Pressable, Text } from "native-base";
import IServico from "../../@types/IServico";

interface CardServicoProps {
  servico: IServico;
  onSelecionado?: (id: string) => void;
  estaSelecionado?: boolean;
}

const images: { [key: string]: any } = {
  "corteDeCabelo.jpg": require("../../assets/images/servicos/corteDeCabelo.jpg"),
  "tintura.jpg": require("../../assets/images/servicos/tintura.jpg"),
  "barba.jpg": require("../../assets/images/servicos/barba.jpg"),
  "sobrancelha.png": require("../../assets/images/servicos/sobrancelha.png"),
  "corteDeCabeloGratuito.jpg": require("../../assets/images/servicos/corteDeCabeloGratuito.jpg"),
};

export default function CardServicoAlternativo({
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
      >
        <Image
          mt={1}
          h={100}
          source={images[servico.ser_foto]}
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
            fontSize={16}
          >
            {servico.ser_tipo}
          </Text>
          {servico.ser_preco === 0 ? (
            <Text
              color={"#E29C31"}
              textAlign={"center"}
              fontFamily={"NeohellenicBold"}
            >
              Gratuito
            </Text>
          ) : (
            <Text
              color={"#E29C31"}
              textAlign={"center"}
              fontFamily={"NeohellenicBold"}
              fontSize={16}
            >
              Preço: R${servico.ser_preco.toFixed(2)}
            </Text>
          )}
        </Box>
      </Box>
    </Pressable>
  );
}
