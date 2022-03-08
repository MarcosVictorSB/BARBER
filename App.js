import React from 'react';
import { NavigationContainer }  from '@react-navigation/native'; // controlar a navegação
import MainStack from './src/stacks/MainStack';
import UserContextProvider from './src/contexts/UserContext'

export default () => {
    return (
        <UserContextProvider>
            <NavigationContainer>
                <MainStack />
            </NavigationContainer>
        </UserContextProvider>    
  );
}