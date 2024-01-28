import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ErrorScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.errorText}>An error occurred!</Text>
            <Text style={styles.errorMessage}>We could not find the route you were looking for.</Text>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
    );
};

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
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginVertical: 20,
    },
});

export default ErrorScreen;