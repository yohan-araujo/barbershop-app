import { useFonts } from "expo-font";
import {
  Actionsheet,
  Avatar,
  Box,
  Divider,
  HStack,
  IBoxProps,
  Pressable,
  Text,
  useDisclose,
  VStack,
} from "native-base";
import IServico from "../../@types/IServico";
import Ionicons from "react-native-vector-icons/Ionicons";

interface CardServicoProps extends IBoxProps {
  servico: IServico;
}

export default function CardServicoHome({
  servico,
  ...rest
}: CardServicoProps) {
  const [fontsCarregadas, fontsError] = useFonts({
    NeohellenicRegular: require("../../assets/fonts/Neohellenic/GFSNeohellenic-Regular.ttf"),
    NeohellenicBold: require("../../assets/fonts/Neohellenic/GFSNeohellenic-Bold.ttf"),
  });

  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <Pressable onPress={onOpen}>
      <Box
        backgroundColor={"black"}
        borderRadius={"2xl"}
        justifyContent={"center"}
        key={servico.id}
        p={3}
        w={148}
        h={124}
        {...rest}
      >
        <HStack alignItems={"center"}>
          <Box
            bottom={-1}
            position={"absolute"}
            w={78}
            h={71}
            bgColor={"#E29C31"}
            rounded={"xl"}
            opacity={80}
          >
            <Text>icone</Text>
          </Box>
          <Box ml={"auto"}>
            <Ionicons name={"chevron-forward"} size={20} color={"white"} />
          </Box>
        </HStack>
        <VStack mt={3}>
          <Text color={"white"} fontFamily={"NeohellenicBold"} fontSize={18}>
            {servico.ser_tipo}
          </Text>
          <Text color={"white"} fontFamily={"NeohellenicRegular"} fontSize={18}>
            R$ {servico.ser_preco.toFixed(2)}
          </Text>
        </VStack>
      </Box>
      <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
        <Actionsheet.Content p={5} bgColor={"#1D1D1D"}>
          <Actionsheet.Item bgColor={"#1D1D1D"}>
            <VStack>
              <Text
                textTransform={"uppercase"}
                fontFamily={"NeohellenicBold"}
                color={"#E29C31"}
                fontSize={22}
              >
                {servico.ser_tipo}
              </Text>
              <Text
                fontFamily={"NeohellenicRegular"}
                color={"white"}
                fontSize={18}
              >
                Servico efetuado com profissionalismo
              </Text>
            </VStack>
          </Actionsheet.Item>
          <Divider bgColor={"white"} opacity={50} />
          <Actionsheet.Item bgColor={"#1D1D1D"}>
            <VStack>
              <Text
                textTransform={"uppercase"}
                fontFamily={"NeohellenicBold"}
                color={"#E29C31"}
                fontSize={22}
              >
                Profissionais
              </Text>
              <Text
                fontFamily={"NeohellenicRegular"}
                color={"white"}
                fontSize={18}
              >
                Profissionais especializados em diversos cortes!
              </Text>
            </VStack>
          </Actionsheet.Item>
          <Actionsheet.Item
            bgColor={"#1D1D1D"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <HStack
              w={"full"}
              bgColor={"black"}
              py={3}
              px={2}
              space={3}
              rounded={"xl"}
              alignItems={"center"}
            >
              <Avatar />
              <VStack>
                <Text
                  fontFamily={"NeohellenicRegular"}
                  color={"#E29C31"}
                  fontSize={18}
                >
                  Andre Ramos
                </Text>
                <Text
                  fontFamily={"NeohellenicRegular"}
                  color={"white"}
                  fontSize={18}
                >
                  Especializado em tal
                </Text>
              </VStack>
            </HStack>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Pressable>
  );
}