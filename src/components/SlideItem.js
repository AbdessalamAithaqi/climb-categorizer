import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";

const { width, height } = Dimensions.get("screen");

const SlideItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <Image
                source={item.img}
                resizeMode="contain"
                style={styles.image} // Apply the style here
            />
            <View style={styles.content}>
                <Text style={styles.title}>{item.color}</Text>
            </View>
        </View>
    );
}

export default SlideItem;

const styles = StyleSheet.create({
    container: {
        width: width, // Use the full width of the screen
        height: height * 0.65, // Adjust the height as needed, here it's half of the screen height
        alignItems: 'center',
        justifyContent: 'center', // Center the content
    },
    image: {
        width: '100%', // Take the full width of the container
        height: '100%', // Take the full height of the container
    },
    content: {
        position: 'absolute', // Overlay the content on the image
        bottom: 10, // Adjust as needed
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    }
});
