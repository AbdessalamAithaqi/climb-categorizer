/**
 * @fileoverview This module provides the Pagination component for the application.
 */

// Import necessary modules from react and react-native
import React from "react";
import { StyleSheet, Animated, View, Dimensions } from "react-native";
import colorPalette from "../styles/GlobalStyles.js";

// Get the screen width
const { width } = Dimensions.get("screen");

/**
 * The Pagination component.
 * It displays a pagination indicator for a list of items.
 * @param {object} props - The properties object.
 * @param {Array} props.data - The list of items.
 * @param {Animated.Value} props.scrollX - The Animated.Value for the x offset of the scroll view.
 * @returns {React.Component} The Pagination component.
 */
const Pagination = ({ data, scrollX }) => (
  <View style={styles.container}>
    {data.map((_, i) => {
      const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
      const dotWidth = scrollX.interpolate({
        inputRange,
        outputRange: [12, 30, 12],
        extrapolate: "clamp",
      });

      return (
        <Animated.View
          style={[styles.dot, { width: dotWidth }]}
          key={i.toString()}
        />
      );
    })}
  </View>
);

export default Pagination;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: -20, // Position adjusted to below the slider
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    height: 12,
    borderRadius: 6,
    marginHorizontal: 3,
    backgroundColor: 'black',
  },
});
