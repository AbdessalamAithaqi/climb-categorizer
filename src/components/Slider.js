/**
 * @fileoverview This module provides the Slider component for the application.
 */

// Import necessary modules from react and react-native
import React, { useRef } from "react";
import { View, Animated, FlatList } from "react-native";
import Slides from "../data/Slides";
import SlideItem from "./SlideItem";
import Pagination from "./Pagination";

/**
 * The Slider component.
 * It displays a list of slides with pagination.
 * @returns {React.Component} The Slider component.
 */
const Slider = () => {
    // Reference to the Animated.Value for the x offset of the scroll view
    const scrollX = useRef(new Animated.Value(0)).current;

    return (
        <View>
            <FlatList
                data={Slides}
                renderItem={({ item }) => <SlideItem item={item} />}
                horizontal
                pagingEnabled
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
            />
            <Pagination data={Slides} scrollX={scrollX} />
        </View>
    );
}

export default Slider;