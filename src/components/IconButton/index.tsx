import { Button, IButtonProps } from "native-base";
import Ionicon from "react-native-vector-icons/Ionicons";

interface IconButtonProps extends IButtonProps {
  onPress: () => void;
  nomeIcon: string;
  texto: string;
}

export default function IconButton({
  onPress,
  nomeIcon,
  texto,
  ...rest
}: IconButtonProps) {
  return (
    <Button
      w={"30%"}
      onPress={onPress}
      leftIcon={<Ionicon name={nomeIcon} color="black" size={20} />}
      bgColor={"#E29C31"}
      _text={{
        fontFamily: "NeohellenicBold",
        color: "black",
        fontSize: 18,
      }}
      rounded={"full"}
      {...rest}
    >
      {texto}
    </Button>
  );
}
