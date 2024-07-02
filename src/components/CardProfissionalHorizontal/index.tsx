import { useFonts } from "expo-font";
import { Box, Image, Pressable, Text } from "native-base";
import IProfisisonal from "../../@types/IProfissional";

interface ICardProfissionalProps {
  profissional: IProfisisonal;
  onSelecionado?: (id: string) => void;
  estaSelecionado?: boolean;
}

export default function CardProfissionalHorizontal({
  profissional,
  estaSelecionado,
  onSelecionado,
}: ICardProfissionalProps) {
  const [fontsCarregadas, fontsError] = useFonts({
    NeohellenicRegular: require("../../assets/fonts/Neohellenic/GFSNeohellenic-Regular.ttf"),
    NeohellenicBold: require("../../assets/fonts/Neohellenic/GFSNeohellenic-Bold.ttf"),
  });

  return (
    <Pressable onPress={() => onSelecionado(profissional.id)}>
      <Box
        backgroundColor={"black"}
        h={175}
        w={40}
        mt={4}
        borderRadius={"2xl"}
        justifyContent={"center"}
        key={profissional.id}
        borderWidth={2}
      >
        <Image
          h={100}
          source={{ uri: profissional.usu_foto }}
          borderTopLeftRadius={"xl"}
          borderTopRightRadius={"xl"}
          alt={"servicos"}
          mt={1}
        />
        <Box h={75}>
          <Text
            color={"white"}
            textAlign={"center"}
            mt={3}
            fontFamily={"NeohellenicBold"}
            fontSize={16}
          >
            {profissional.usu_nomeCompleto}
          </Text>
          <Text
            color={"#E29C31"}
            textAlign={"center"}
            fontFamily={"NeohellenicBold"}
            fontSize={16}
          >
            Barbeiro
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
}
