import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '../components/Slider';

const ResultScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {images.map((image, index) => (
                    <Image key={index} source={image} style={styles.image} />
                ))}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Error')}
                >
                    <Text style={styles.text}>Go to Error</Text>
                </TouchableOpacity>
            </View> */}

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
