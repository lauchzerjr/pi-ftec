import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {Divider, FlatList, Text, VStack} from 'native-base'

import { Header } from '../components/Header';
import { SelectSport } from '../components/SelectSport';
import { useScheduling } from '../hooks/useScheduling';
import { dataSportSelect } from '../utils/dataSportsSelect';

export function Home() {
  const { navigate } = useNavigation();
  const { setNameCollection } = useScheduling()

  function handleSportDetails(nameCollection: string, sportName: string) {
    navigate('sport', { nameCollection, sportName });
    console.log('nameCollection =>', nameCollection)
    console.log('sportName =>', sportName)

    setNameCollection(nameCollection)
  }

  return (
    <VStack 
      flex={1}
      background="gray.400"  
    >
      <Header />

      <Text
        bold
        textAlign="center"
        backgroundColor="black"
        fontSize="2xl"
        mb="1"
      >
        Escolha um esporte...
      </Text>

      <FlatList
        data={dataSportSelect}
        keyExtractor={( item ) => item.sportId}
        renderItem={({ item }) => (
            <SelectSport 
              titleSport={item.sportName}
              nameIcon={item.nameIcon}
              onPress={() => handleSportDetails(item.nameCollection, item.sportName)}
            />
          )
        }
        style={{marginHorizontal: 16 }}
        numColumns={2}
        ItemSeparatorComponent={() => <Divider thickness="0" my="1.5" orientation="horizontal" />}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
}