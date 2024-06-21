import React, { useState } from "react";
import { Box, Image } from "native-base";
import IconBigode2 from "../../assets/images/icons/iconBigode2.png";

export default function CartaoFidelidade() {
  const [pontos, setPontos] = useState(9);

  return (
    <Box
      borderWidth={2}
      borderColor={"#E29C31"}
      borderRadius={18}
      p={5}
      bgColor={"black"}
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="space-around"
    >
      {[...Array(10)].map((_, index) => (
        <Box
          key={index}
          w={44}
          h={44}
          borderWidth={2}
          borderColor={"#E29C31"}
          borderRadius={24}
          justifyContent="center"
          alignItems="center"
          m={1}
        >
          {index < pontos && (
            <Box
              w={9}
              h={9}
              bgColor={"#E29C31"}
              borderRadius={24}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Image w={10} h={10} alt="icone de bigode" source={IconBigode2} />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
