import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

// Wraps the app in a NavigationContainer
const App = () => {
    return (
        <NavigationContainer>
            <AppNavigator />
        </NavigationContainer>
    );
};

export default App;
