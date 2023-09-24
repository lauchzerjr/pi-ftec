import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Center, IButtonProps, Text } from "native-base";

interface SelectSportProps extends IButtonProps {
  titleSport: string;
  nameIcon: keyof typeof MaterialCommunityIcons.glyphMap;
}

export function SelectSport({
  nameIcon,
  titleSport,
  ...rest
}: SelectSportProps) {
  return (
    <Button
      w="48%"
      h="20"
      backgroundColor="gray.900"
      borderRadius="2xl"
      _pressed={{ bg: "gray.700" }}
      {...rest}
    >
      <Center>
        <MaterialCommunityIcons name={nameIcon} size={24} color="#FFFFFF" />

        <Text color="white" textAlign="center" fontWeight="bold" fontSize="md">
          {titleSport}
        </Text>
      </Center>
    </Button>
  );
}
