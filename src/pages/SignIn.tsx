import React, { useRef } from "react";
import { ImageBackground } from "react-native";
import AnimatedLottieView from "lottie-react-native";
import { VStack, Text, Heading, Button, Icon, View } from "native-base";
import { AntDesign } from "@expo/vector-icons";

import backgroungImage from "../assets/backgroungImage.png";
import lottieLogin from "../../assets/lottieLogin.json";
import splash from "../../assets/splash.json";
import { useAuth } from "../hooks/useAuth";

export const SignIn = () => {
  const { loadingSplash, loading, signInWithGoogle } = useAuth();
  const animation = useRef(null);

  if (loadingSplash) {
    return (
      <View flex={1} backgroundColor="gray.900" alignItems={'center'} justifyContent={'center'}>
        <AnimatedLottieView
          source={splash}
          autoPlay
          loop
          speed={2}
          ref={animation}
          style={{
            width: 200,
            height: 200,
          }}
        />
      </View>
    )
  }

  return (
    <ImageBackground
      source={backgroungImage}
      style={{
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'black'
      }}
    >
      <View
        position={"absolute"}
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgColor={'black'}
        opacity={0.70}
      />
      <AnimatedLottieView
        source={lottieLogin}
        autoPlay
        loop
        speed={2}
        ref={animation}
        style={{
          width: 300,
          height: 300,
        }}
      />

      <VStack width="100%" p="1">
        <Heading color="white" textAlign="center" bold marginBottom="3">
          Seja bem-vindo ao SportsMatch!
        </Heading>
      </VStack>

      <Button
        width="90%"
        backgroundColor="red.900"
        borderRadius={8}
        p="3"
        leftIcon={<Icon as={AntDesign} name="google" size="xl" />}
        onPress={signInWithGoogle}
        _pressed={{ bg: "red.800" }}
        isLoading={loading}
        _loading={{
          _spinner: { color: "white", size: 27 },
        }}
      >
        <Text fontSize="lg" color="white" bold>
          Entrar com Google
        </Text>
      </Button>
    </ImageBackground>
  );
};
