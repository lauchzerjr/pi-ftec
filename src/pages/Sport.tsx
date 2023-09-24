import { useRoute } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Text, VStack, Spinner, Divider, Center } from "native-base";
import firestore from "@react-native-firebase/firestore";

import { CardSport } from "../components/CardSport";
import { useScheduling } from "../hooks/useScheduling";
import { Header } from "../components/Header";
import { ListEmpty } from "../components/ListEmpty";

export type RouteParams = {
  nameCollection: string;
  sportName: string;
};

export type FormProps = {
  id: string;
  nameCollection: string;
  nameLocation: string;
  location: string;
  date: string;
  maxPeople: number;
  qtdPeopleNow: number;
  owner: string;
  city: string;
};

export function Sport() {
  const route = useRoute();
  const { nameCollection } = useScheduling();
  const { sportName } = route.params as RouteParams;
  const [sportsCreated, setSportsCreated] = useState<FormProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const nameLocationFilter = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return sportsCreated.filter((item) =>
      item.nameLocation.toLowerCase().includes(lowerSearch)
    );
  }, [search]);

  useEffect(() => {
    setIsLoading(true);

    const subscribe = firestore()
      .collection("sports")
      .doc("subCollections")
      .collection(nameCollection)
      .onSnapshot((querySnapShot) => {
        const data = querySnapShot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as FormProps[];

        setSportsCreated(data);
        setIsLoading(false);
      });

    return () => subscribe();
  }, [nameCollection]);

  return (
    <VStack flex={1} width="100%" backgroundColor="gray.400">
      <Header 
        isSearch
        onChangeText={setSearch}
        value={search}
        clearSearch={() => setSearch('')}
      />

      <VStack paddingX="3" justifyContent="center" flex={1}>
        {isLoading ? (
          <Center>
            <Spinner size="lg" color="black" />
          </Center>
        ) : (
          <FlatList
            data={search.length >= 1 ? nameLocationFilter : sportsCreated}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <>
                <CardSport
                  owner={item.owner}
                  date={item.date}
                  location={item.location}
                  nameLocation={item.nameLocation}
                  maxPeople={item.maxPeople}
                  city={item.city}
                  docId={item.id}
                  qtdPeopleNow={item.qtdPeopleNow}
                />
                <Divider thickness="0" my="1" orientation="horizontal" />
              </>
            )}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
              <Text fontSize="2xl" bold textAlign="center" marginBottom="1.5">
                {sportName}
              </Text>
            )}
            ListEmptyComponent={<ListEmpty sportName={sportName}/>}
          />
        )}
      </VStack>
    </VStack>
  );
}
