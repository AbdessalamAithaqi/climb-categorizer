import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '../components/Slider';

const ResultScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Slider />
        </SafeAreaView>
    );
};

// Define your styles here
const styles = StyleSheet.create({
    scrollViewContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 300, // Adjust as needed
        height: 300, // Adjust as needed
        marginVertical: 10,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
    },
    button: {
        backgroundColor: 'orange',
        borderRadius: 20,
        padding: 10,
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
});

export default ResultScreen;
