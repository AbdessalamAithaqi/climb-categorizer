/**
 * @fileoverview This module provides the ErrorScreen component for the application.
 */

// Import necessary modules from react, react-native and react-native-safe-area-context
import React from 'react';
import { Text, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * The ErrorScreen component.
 * It displays an error message and a button to navigate back.
 * @param {object} navigation - The navigation object from react-navigation.
 * @returns {React.Component} The ErrorScreen component.
 */
const ErrorScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.errorText}>An error occurred!</Text>
            <Text style={styles.errorMessage}>We could not find the route you were looking for.</Text>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
        </SafeAreaView>
    );
};

/**
 * Stylesheet for the ErrorScreen component.
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    errorText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'red',
    },
    errorMessage: {
        // Your styles here
    },
});

export default ErrorScreen;