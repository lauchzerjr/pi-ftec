import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import LottieSplashScreen from "react-native-lottie-splash-screen";

import { NativeBaseProvider, Box } from "native-base";

import { Routes } from './src/routes';
import { AuthContextProvider } from './src/contexts/AuthContext';
import { SchedulingContextProvider } from './src/contexts/CreateSchedulingContext';

export default function App() {

  useEffect(() => {
    LottieSplashScreen.hide(); // here
  }, []);

  return (
    <NativeBaseProvider>
      <StatusBar translucent style='light' />
      <AuthContextProvider>
        <SchedulingContextProvider>
          <Routes />
        </SchedulingContextProvider>
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}