import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ResultScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Result Screen</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Error')}
            >
                <Text style={styles.text}>Go to Error</Text>
            </TouchableOpacity>
        </View>
    );
};

// Define your styles here
const styles = StyleSheet.create({
    button: {
        backgroundColor: 'orange', // Example color
        borderRadius: 20,          // Example border radius
        padding: 10,               // Example padding
        marginTop: 20,             // Example margin
    },
    text: {
        color: 'white',            // Example text color
        fontSize: 16,              // Example font size
    },
});

export default ResultScreen;
