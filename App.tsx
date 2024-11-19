import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserTypeSelection from './components/UserTypeSelection';
import './firebase';

export type RootStackParamList = {
  UserTypeSelection: undefined;
  ClientRegistration: undefined;
  CompanyRegistration: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserTypeSelection" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UserTypeSelection" component={UserTypeSelection} />
        {/* Add other screens here when they're ready */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}