/**
 * @fileoverview This module provides the main entry point for the application.
 */

// Import necessary modules from react and react-navigation
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

/**
 * The main App component.
 * It wraps the main component in a NavigationContainer.
 * The NavigationContainer is responsible for managing the app state and linking the top-level navigator to the app environment.
 * @returns {React.Component} The main application component.
 */
const App = () => {
    return (
        <NavigationContainer>
            {/* AppNavigator is the top-level navigator, defined in './src/navigation/AppNavigator' */}
            <AppNavigator />
        </NavigationContainer>
    );
};

// Export the App component as the default export
export default App;