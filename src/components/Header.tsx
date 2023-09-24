import { GestureResponderEvent, TextInputProps } from "react-native";
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

import { useAuth } from "../hooks/useAuth";
import { HStack, View, Image, Text, Button, Icon } from "native-base";
import { ButtonAdd } from "./ButtonAdd";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { CInput } from "./CInput/CInput";

type HeaderProps = TextInputProps & {
  isSearch?: boolean
  clearSearch?: (event: GestureResponderEvent) => void
  input?: React.ReactNode
}

export function Header({ isSearch, clearSearch, ...rest }: HeaderProps) {
  const { user, signOutGoogle } = useAuth();
  const { goBack } = useNavigation()

  const firstName = user.displayName.split(" ")[0];

  return (
    <>
      {
        isSearch ? (
          <HStack
            width="100%"
            height={110}
            alignItems="flex-end"
            backgroundColor="black"
            justifyContent={'center'}
            padding="2.5"
            borderBottomRightRadius="2xl"
            borderBottomLeftRadius="2xl"
          >
            <Button
              bgColor="black"
              padding="1.5"
              mr="2.5"
              onPress={goBack}
              leftIcon={<Icon as={Ionicons} name="arrow-back" size="xl" />}
              _pressed={{ bg: "gray.700" }}
            />

            <View flex={1}>
              <CInput 
                placeholder="Digite o nome do local"
                leftIcon={
                  <FontAwesome
                    name="search"
                    size={24}
                    color="black"
                  />
                }
                rightIcon={
                  <FontAwesome
                    name="close"
                    size={24}
                    color="black"
                    onPress={clearSearch}
                  />
                }
                {...rest}
              />
            </View>

            <ButtonAdd />
          </HStack>
        ) : (
          <View
            w='full'
            h={110}
            padding="2.5"
            bgColor={'black'}
            justifyContent={'flex-end'}
            borderBottomRightRadius="2xl"
            borderBottomLeftRadius="2xl"
          >
            <HStack
              justifyContent={"space-between"}
              alignItems={'center'}
            >
              <HStack>
                <Image  
                  source={{ uri: user.photoURL }}
                  alt="Imagem do usuário" 
                  w={50}
                  h={50}
                  borderRadius={16}
                  mr={4}
                />

                <View>
                  <HStack>
                    <Text fontSize={24} color={'white'}>Olá, </Text>
                    <Text fontSize={24} color={'white'} fontWeight={'bold'}>{firstName}</Text>
                  </HStack>
                  <Text fontSize={14} color={'gray.400'}>Hoje é dia de vitória</Text>
                </View>
              </HStack>

              <Button
                bgColor="black"
                onPress={signOutGoogle}
                leftIcon={<Icon as={MaterialIcons} name="logout" size="xl" />}
                _pressed={{ bg: "gray.700" }}
              />
            </HStack>
          </View>
        )
      }
    </>
  )
}