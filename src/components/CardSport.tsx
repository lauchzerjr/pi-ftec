import {
  HStack,
  Icon,
  IconButton,
  Text,
  useToast,
  VStack,
} from "native-base";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import firestore from "@react-native-firebase/firestore";
import { useScheduling } from "../hooks/useScheduling";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

type CardSportProps = {
  nameLocation: string;
  location: string;
  date: string;
  maxPeople: number;
  qtdPeopleNow: number;
  owner: string;
  city: string;
  docId: string;
};

export function CardSport({
  owner,
  date,
  location,
  nameLocation,
  maxPeople,
  city,
  docId,
  qtdPeopleNow,
}: CardSportProps) {
  const { nameCollection } = useScheduling();
  const { user } = useAuth();
  const toast = useToast();

  const [participating, setParticipating] = useState([]);
  const [isParticipating, setIsParticipating] = useState<boolean>();

  const isNotVacant = maxPeople === qtdPeopleNow;

  function handleParticipate() {
    try {
      firestore()
        .collection("sports")
        .doc("subCollections")
        .collection(nameCollection)
        .doc(docId)
        .update({
          qtdPeopleNow: qtdPeopleNow + 1,
          participating: [...participating, user.uid],
        });

      toast.show({
        title: "Você está participando!",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      console.log("ERROOO", error);
      toast.show({
        title: "Não foi possivel participar, tente novamente mais tarde!",
        placement: "top",
        bgColor: "red.500",
      });
      throw new Error("Não foi possivel participar");
    }
  }

  function handleDeleteParticipate() {
    try {
      firestore()
        .collection("sports")
        .doc("subCollections")
        .collection(nameCollection)
        .doc(docId)
        .update({
          qtdPeopleNow: qtdPeopleNow - 1,
          participating: participating.filter((item) => item !== user.uid),
        });

      toast.show({
        title: "Você não está mais participando!",
        placement: "top",
        bgColor: "red.500",
      });
    } catch (error) {
      console.log("ERROOO", error);
      toast.show({
        title: "Não foi possivel parar participar, tente novamente mais tarde!",
        placement: "top",
        bgColor: "red.500",
      });
      throw new Error("Não foi possivel participar");
    }
  }

  useEffect(() => {
    firestore()
      .collection("sports")
      .doc("subCollections")
      .collection(nameCollection)
      .where("participating", "array-contains", user.uid)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          const { participating } = doc.data();
          return {
            id: doc.id,
            participating,
          };
        });
        const tal = data.some((item) => item.id === docId);

        setIsParticipating(tal);
      });
  }, [docId]);

  useEffect(() => {
    firestore()
      .collection("sports")
      .doc("subCollections")
      .collection(nameCollection)
      .doc(docId)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.data().participating;

        setParticipating(data);
      });
  }, [docId]);

  return (
    <VStack
      w="100%"
      padding="2"
      borderRadius="2xl"
      borderWidth={isNotVacant ? 2 : 0}
      borderColor={isNotVacant && "red.500"}
      bgColor={isNotVacant ? "red.100" : "white"}
    >
      <Text fontSize="sm" fontWeight="bold" color="black">
        Nome do local: {nameLocation}
      </Text>

      <Text fontSize="sm" color="black">
        Localização: {location}
      </Text>
      <HStack flexDirection="row" justifyContent="space-between">
        <Text fontSize="sm" color="black">
          Cidade: {city}
        </Text>
        <Text fontSize="sm" fontWeight="bold" color="black">
          {date}
        </Text>
      </HStack>

      <Text fontSize="sm" fontWeight="bold" color="black">
        Cadastrado por: {owner}
      </Text>

      <HStack mt="2" alignItems="center">
        <Text fontSize="md" color="black" fontWeight="bold">
          Quantidade de pessoas:
        </Text>

        {isParticipating && qtdPeopleNow > 1 && (
          <IconButton
            onPress={handleDeleteParticipate}
            colorScheme="red"
            p={0.5}
            marginLeft={0.5}
            _icon={{
              as: AntDesign,
              name: "minuscircle",
              size: 8,
            }}
          />
        )}

        <HStack alignItems="center">
          <HStack p="2" rounded="2xl" bgColor="gray.300" marginLeft={0.5}>
            <Text fontSize="md" color="black">
              {qtdPeopleNow} de {maxPeople}
            </Text>
          </HStack>

          {isParticipating || isNotVacant ? (
            <Icon
              as={AntDesign}
              name="checksquare"
              color="green.500"
              size="2xl"
            />
          ) : (
            <IconButton
              onPress={handleParticipate}
              colorScheme="green"
              p={0.5}
              _icon={{
                as: Ionicons,
                name: "add-circle",
                size: 10,
              }}
            />
          )}
        </HStack>
      </HStack>

      {isNotVacant && (
        <HStack marginY="1" alignItems="center">
          <Icon as={Ionicons} name="alert-circle" color="red.500" size="2xl" />
          <Text color="red.500" fontSize="md">
            Não há mais vagas disponiveis
          </Text>
        </HStack>
      )}
    </VStack>
  );
}
