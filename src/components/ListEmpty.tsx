import AnimatedLottieView from 'lottie-react-native';
import { Center, Text } from 'native-base';
import React from 'react';
import emptyList from "../../assets/empty.json";

type ListEmpty = {
  sportName: string
}

export function ListEmpty({ sportName }: ListEmpty) {
  return (
    <Center
      flex={1}
      alignItems="center"
      justifyContent="center"
      mt="1.5"
    >
      <>
        <Text textAlign="center" fontSize="xl" bold>
          Ainda não há ofertas de partidas na modalidade de{" "}
          {sportName}
          ... {"\n"}
          Crie uma você mesmo.
        </Text>

        <AnimatedLottieView
          source={emptyList}
          autoPlay
          loop
          speed={1.5}
          style={{
            width: 300,
            height: 300,
          }}
        />
      </>
    </Center>
  );
}