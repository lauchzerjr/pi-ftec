import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export interface DataSportSelectProps {
  sportId: string;
  sportName: string;
  nameCollection: string;
  nameIcon: keyof typeof MaterialCommunityIcons.glyphMap;
}

export const dataSportSelect: DataSportSelectProps[] = [
  {
    sportId: '1',
    sportName: 'Futebol',
    nameCollection: 'futebol',
    nameIcon: 'soccer'
  },
  {
    sportId: '2',
    sportName: 'Basquete',
    nameCollection: 'basquete',
    nameIcon: 'basketball'
  },
  {
    sportId: '3',
    sportName: 'Tênis',
    nameCollection: 'tenis',
    nameIcon: 'tennis'
  },
  {
    sportId: '4',
    sportName: 'Vôlei',
    nameCollection: 'volei',
    nameIcon: 'volleyball'
  },
  {
    sportId: '5',
    sportName: 'Handebol',
    nameCollection: 'handebol',
    nameIcon: 'handball'
  },
  {
    sportId: '6',
    sportName: 'Lutas',
    nameCollection: 'lutas',
    nameIcon: 'boxing-glove'
  },
  {
    sportId: '7',
    sportName: 'Kart',
    nameCollection: 'kart',
    nameIcon: 'racing-helmet'
  },
  {
    sportId: '8',
    sportName: 'Corrida',
    nameCollection: 'corrida',
    nameIcon: 'run'
  },
  {
    sportId: '9',
    sportName: 'Ciclismo',
    nameCollection: 'ciclismo',
    nameIcon: 'bike'
  },
  {
    sportId: '10',
    sportName: 'Airsoft / Paintball',
    nameCollection: 'airsoft',
    nameIcon: 'pistol'
  },
  {
    sportId: '11',
    sportName: 'Skateboarding',
    nameCollection: 'skateboarding',
    nameIcon: 'skateboarding'
  },
  {
    sportId: '12',
    sportName: 'Boliche',
    nameCollection: 'boliche',
    nameIcon: 'bowling'
  },
]