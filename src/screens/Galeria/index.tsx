import React from "react";
import { Box, Image, ScrollView, Text, Flex, HStack } from "native-base";

const enderecoImagens = [
  require("../../assets/images/galeria/imagemGaleria1.jpg"),
  require("../../assets/images/galeria/imagemGaleria2.jpg"),
  require("../../assets/images/galeria/imagemGaleria3.jpg"),
  require("../../assets/images/galeria/imagemGaleria4.jpg"),
  require("../../assets/images/galeria/imagemGaleria5.jpg"),
  require("../../assets/images/galeria/imagemGaleria6.jpg"),
  require("../../assets/images/galeria/imagemGaleria7.jpg"),
  require("../../assets/images/galeria/imagemGaleria8.jpg"),
];

const tamanhos = [
  { width: 150, height: 200 },
  { width: 150, height: 250 },
  { width: 150, height: 180 },
  { width: 150, height: 230 },
  { width: 150, height: 190 },
  { width: 150, height: 220 },
  { width: 150, height: 210 },
  { width: 150, height: 240 },
];

export default function Galeria() {
  return (
    <ScrollView flex={1} bg={"#1D1D1D"} p={5}>
      <Text
        color={"#E29C31"}
        textTransform={"uppercase"}
        fontSize={22}
        fontFamily={"NeohellenicBold"}
        textAlign={"center"}
        mb={4}
      >
        Galeria
      </Text>

      <HStack flexWrap="wrap" justifyContent="space-between" mb={24}>
        {enderecoImagens.map((enderecoImagem, index) => (
          <Box key={index} mb={4} mx={1}>
            <Image
              source={enderecoImagem}
              alt={`imagem ${index + 1}`}
              borderRadius={10}
              w={tamanhos[index % tamanhos.length].width}
              h={tamanhos[index % tamanhos.length].height}
            />
          </Box>
        ))}
      </HStack>
    </ScrollView>
  );
}
