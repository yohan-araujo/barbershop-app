import { useFonts } from "expo-font";
import {
  Avatar,
  Box,
  Center,
  Divider,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import IProfissional from "../../@types/IProfissional";
import IconPinca from "../../assets/images/icons/iconPinca.png";
import IconBigode from "../../assets/images/icons/iconBigode.png";
import IconTesoura from "../../assets/images/icons/iconTesoura.png";

interface ICardProfissionalProps {
  profissional: IProfissional;
  onSelecionado?: (id: string) => void;
  estaSelecionado?: boolean;
}

export default function CardProfissional({
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
        backgroundColor={"#E29C31"}
        h={64}
        w={40}
        mt={4}
        borderRadius={"2xl"}
        justifyContent={"center"}
        key={profissional.id}
        borderWidth={3}
        borderColor={estaSelecionado ? "white" : "black"}
      >
        <Center mb={5}>
          <Avatar
            position={"absolute"}
            zIndex={1}
            top={3}
            size={"lg"}
            source={{ uri: profissional.usu_foto }}
            borderWidth={3}
            borderColor={"#E29C31"}
          />
        </Center>
        <VStack h={48} bg={"black"} top={5} borderBottomRadius={"xl"}>
          <Text
            color={"white"}
            textAlign={"center"}
            mt={8}
            fontFamily={"NeohellenicBold"}
          >
            {profissional.usu_nomeCompleto}
          </Text>
          <Center>
            <Divider bg={"#E29C31"} w={24} />
          </Center>
          <Box my={2}>
            <Box flexDirection={"row"} mt={1} ml={3}>
              <Box
                w={6}
                h={6}
                bgColor={"#E29C31"}
                rounded={"full"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image
                  w={4}
                  h={4}
                  source={IconTesoura}
                  alt="icone de tesoura"
                />
              </Box>

              <Text color={"white"} ml={2} fontFamily={"NeohellenicRegular"}>
                Cabelo
              </Text>
            </Box>
            <Box flexDirection={"row"} mt={1} ml={3}>
              <Box
                w={6}
                h={6}
                bgColor={"#E29C31"}
                rounded={"full"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image w={4} h={4} source={IconBigode} alt="icone de bigode" />
              </Box>

              <Text color={"white"} ml={2} fontFamily={"NeohellenicRegular"}>
                Barba
              </Text>
            </Box>
            <Box flexDirection={"row"} mt={1} ml={3}>
              <Box
                w={6}
                h={6}
                bgColor={"#E29C31"}
                rounded={"full"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image w={4} h={4} source={IconPinca} alt="icone de pinca" />
              </Box>

              <Text color={"white"} ml={2} fontFamily={"NeohellenicRegular"}>
                Sobrancelha
              </Text>
            </Box>
          </Box>
          <Center>
            <Divider bg={"#E29C31"} w={24} mt={1} />
          </Center>
          <Text
            color={"#E29C31"}
            textAlign={"center"}
            fontFamily={"NeohellenicBold"}
          >
            Barbeiro
          </Text>
        </VStack>
      </Box>
    </Pressable>
  );
}
