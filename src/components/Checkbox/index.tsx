import React from "react";
import { Box, ICheckboxProps, Pressable } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";

interface CheckboxProps {
  isChecked: boolean;
  onChange: () => void;
}

export default function Checkbox({ isChecked, onChange }: CheckboxProps) {
  return (
    <Pressable onPress={onChange}>
      <Box
        w={12}
        h={12}
        borderRadius={12}
        borderWidth={2}
        borderColor={isChecked ? "#E29C31" : "white"}
        justifyContent={"center"}
        alignItems={"center"}
        bgColor={"#1D1D1D"}
      >
        {isChecked && <Ionicons name="checkmark" size={42} color="#E29C31" />}
      </Box>
    </Pressable>
  );
}
