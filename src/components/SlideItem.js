/**
 * @fileoverview This module provides the SlideItem component for the application.
 */

// Import necessary modules from react and react-native
import React from "react";
import { Image, StyleSheet, Text, View, Dimensions } from "react-native";

// Get the screen dimensions
const { width, height } = Dimensions.get("screen");

/**
 * The SlideItem component.
 * It displays a single slide item with an image and a title.
 * @param {object} props - The properties object.
 * @param {object} props.item - The slide item.
 * @param {string} props.item.img - The image source for the slide item.
 * @param {string} props.item.color - The title for the slide item.
 * @returns {React.Component} The SlideItem component.
 */
const SlideItem = ({ item }) => (
  <View style={styles.container}>
    <Image source={{ uri: `data:image/jpeg;base64,${item.img}` }} resizeMode="contain" style={styles.image} />
    <View style={styles.content}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.color}</Text>
      </View>
    </View>
  </View>
);

export default SlideItem;

/**
 * Stylesheet for the SlideItem component.
 */
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height * 0.65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    transform: [{ rotate: '90deg' }],
  },
  content: {
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
  },
  titleContainer: {
    backgroundColor: 'black', // Use a semi-transparent white background
    padding: 10, // Add padding to create some space around the text
    borderRadius: 5, // Optional: Add border-radius for rounded corners
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  }
});
