import {
  Actionsheet,
  Box,
  Button,
  Divider,
  HStack,
  Text,
  VStack,
  useToast,
} from "native-base";
import React from "react";
import { useForm } from "react-hook-form";
import firestore from "@react-native-firebase/firestore";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAuth } from "../hooks/useAuth";
import { useScheduling } from "../hooks/useScheduling";
import { ControlledInput } from "./ControlledInput";
import { validationDate, validationTime } from "../utils/validationDateAndTime";

type FormData = {
  nameCollection: string;
  nameLocation: string;
  location: string;
  date: Date;
  time: string;
  maxPeople: number;
  city: string;
  owner: string;
};

const schema = yup.object({
  nameLocation: yup.string().required("Informe o nome do local"),
  location: yup.string().required("Informe o endereço"),
  date: yup.string().required('Informe a data').min(10, "Complete a data").test('validate-date', 'A data não é válida', text => validationDate(text)),
  time: yup.string().required("Informe a hora").min(5, "Complete a hora").test('validate-time', 'A hora não é válida', text => validationTime(text)),
  city: yup.string().required("Informe o nome da cidade").max(60),
  maxPeople: yup.string().required("Informe os membros").min(1, "Complete os integrantes"),
});

type FormCreateSchedulingProps = {
  onClose: () => void;
};

export function FormCreateScheduling({ onClose }: FormCreateSchedulingProps) {
  const { user } = useAuth();
  const { nameCollection } = useScheduling();
  const toast = useToast();

  const [isLoading, setIsLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  function handleSportRegister(data: FormData) {
    setIsLoading(true);

    firestore()
      .collection("sports")
      .doc("subCollections")
      .collection(nameCollection)
      .add({
        nameLocation: data.nameLocation,
        location: data.location,
        date: `${data.date} às ${data.time}`,
        maxPeople: Number(data.maxPeople),
        city: data.city,
        created_at: firestore.FieldValue.serverTimestamp(),
        owner: user.displayName,
        ownerID: user.uid,
        qtdPeopleNow: 1,
        participating: [user.uid],
      })
      .then(() => {
        toast.show({
          title: "Agendamento cadastrado com sucesso!",
          placement: "top",
          bgColor: "green.500",
        });
      })
      .catch((error) => {
        console.log("error => ", error);
        toast.show({
          title: "Algo deu errado, tente novamente mais tarde.",
          placement: "top",
          bgColor: "red.500",
        });
      })
      .finally(() => {
        setIsLoading(false);
        onClose();
      });
  }

  return (
    <Actionsheet.Content bgColor="gray.200">
      <Box w="100%" h="10" justifyContent="center">
        <Text textAlign="center" fontSize="sm" color="gray.500">
          Preencha os campos abaixo para criar um agendamento
        </Text>
      </Box>

      <Divider bg="gray.400" thickness="1" my="1" orientation="horizontal" />

      <ControlledInput
        control={control}
        name="nameLocation"
        error={errors.nameLocation}
        inputLabel="Nome do local"
        placeholder="Nome do local"
        // autoComplete="email"
        // keyboardAppearance="dark"
        autoCorrect={false}
      />
      <ControlledInput
        control={control}
        name="location"
        error={errors.location}
        inputLabel="Endereço"
        placeholder="Nome da rua"
        autoCorrect={false}
      />
      <ControlledInput
        control={control}
        name="city"
        error={errors.city}
        inputLabel="Cidade"
        placeholder="Nome da cidade"
        autoCorrect={false}
      />
      <Divider bg="gray.400" thickness="1" my="1" orientation="horizontal" />

      <HStack
        justifyContent={"space-between"}
        w="100%"
        mb="4"
      >
        <VStack flex={1} mr={1}>
          <ControlledInput
            control={control}
            name="maxPeople"
            error={errors.maxPeople}
            inputLabel="N° de membros"
            placeholder="26"
            keyboardType="numeric"
            maxLength={3}
          />
        </VStack>

        <VStack  flex={1}  mr={1}>
          <ControlledInput
            control={control}
            name="date"
            error={errors.date}
            inputLabel="Data"
            mask
            type="datetime"
            options={{ format: 'DD/MM/YYYY' }}
            placeholder="DD/MM/YYYY"
            keyboardType="numeric"
          />
        </VStack>
        <VStack flex={1}>
          <ControlledInput
            control={control}
            name="time"
            error={errors.time}
            inputLabel="Hora"
            mask
            type="datetime"
            options={{ format: 'HH:mm' }}
            placeholder="HH:MM"
            keyboardType="numeric"
          />
        </VStack>
      </HStack>

      <Button
        onPress={handleSubmit(handleSportRegister)}
        _pressed={{ backgroundColor: "gray.700" }}
        backgroundColor="black"
        w="100%"
        mt="2"
        mb="2"
        isLoading={isLoading}
        _loading={{
          _spinner: { color: "white", size: 27 },
        }}
      >
        <Text fontSize="md" color="white">
          Confirmar
        </Text>
      </Button>
    </Actionsheet.Content>
  );
}
