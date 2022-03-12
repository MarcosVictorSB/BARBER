import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import Preload from '../screens/Preload';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Barber from '../screens/Barber';

import MainTab from './MainTab';

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName='Preload' // tela a ser carregada inicialmente.
      screenOptions={{
        headerShown: false // nao tem cabeçalho
      }}  
    >
    <Stack.Screen name="Preload" component={Preload} />
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="MainTab" component={MainTab} />
    <Stack.Screen name="Barber" component={Barber} />
  </Stack.Navigator>
  )  
}