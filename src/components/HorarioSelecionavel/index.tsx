import { Box, Pressable, Text } from "native-base";

interface HorarioSelecionavelProps {
  horario: string;
  selecionado?: boolean;
  desabilitado?: boolean;
  aoSelecionado: () => void;
}

export default function HorarioSelecionavel({
  horario,
  aoSelecionado,
  desabilitado,
  selecionado,
}: HorarioSelecionavelProps) {
  return (
    <Pressable onPress={aoSelecionado}>
      <Box
        bgColor={selecionado ? "#E29C31" : "black"}
        px={4}
        py={1}
        rounded={"8px"}
        opacity={desabilitado ? 0.5 : 1}
      >
        <Text
          color={selecionado ? "black" : "white"}
          fontSize={16}
          fontFamily={"NeohellenicBold"}
        >
          {horario}
        </Text>
      </Box>
    </Pressable>
  );
}
