/**
 * @fileoverview This module provides the ResultScreen component for the application.
 */

// Import necessary modules from react, react-native and react-native-safe-area-context
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '../components/Slider';

/**
 * The ResultScreen component.
 * It wraps the Slider component in a SafeAreaView.
 * @returns {React.Component} The ResultScreen component.
 */
const ResultScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Slider />
        </SafeAreaView>
    );
};

/**
 * Stylesheet for the ResultScreen component.
 */
const styles = StyleSheet.create({
    scrollViewContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 300,
        height: 300, 
        marginVertical: 10,
    },
});

export default ResultScreen;