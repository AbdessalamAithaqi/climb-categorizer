import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

const ResultScreen = ({ navigation }) => {
    // Array of image sources
    const images = [
        require('../styles/images/templatePic1.jpg'), // Update the path to your local images
        require('../styles/images/templatePic2.jpg'),
        require('../styles/images/templatePic3.jpg'),

        // ... more images
    ];

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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
            </View>
        </View>
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
