import { useFonts } from "expo-font";
import { Button, IButtonProps, Text } from "native-base";
import { color } from "native-base/lib/typescript/theme/styled-system";

interface IBotaoProps extends IButtonProps {
  texto: string;
  outline?: boolean;
  tamanhoFonte?: number;
}

export function ButtonAlternativo({
  texto,
  outline,
  tamanhoFonte = 12,
  ...rest
}: IBotaoProps) {
  const [fontsCarregadas, fontsError] = useFonts({
    NeohellenicRegular: require("../../assets/fonts/Neohellenic/GFSNeohellenic-Regular.ttf"),
    NeohellenicBold: require("../../assets/fonts/Neohellenic/GFSNeohellenic-Bold.ttf"),
  });

  return (
    <Button
      w="70%"
      bgColor="black"
      borderRadius="3xl"
      {...rest}
      px={5}
      _pressed={{ backgroundColor: "black" }}
    >
      <Text
        color={"white"}
        textTransform={"uppercase"}
        fontFamily={"NeohellenicBold"}
        fontSize={18}
      >
        {texto}
      </Text>
    </Button>
  );
}
