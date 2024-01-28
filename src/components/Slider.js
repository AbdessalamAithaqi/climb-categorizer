import { StyleSheet, Text, View, Animated, FlatList } from "react-native";
import React, { useRef } from "react";
import Slides from "../data/Slides";
import SlideItem from "./SlideItem";
import Pagination from "./Pagination";

const Slider = () => {
    const scrollX = useRef(new Animated.Value(0)).current;

    const handleOnScroll = (event) => {
        Animated.event(
            [
                {
                    nativeEvent: {
                        contentOffset: { x: scrollX }
                    },
                },
            ],
            {
                useNativeDriver: false,
            }
        )(event);
    }
    return (
        <View>
            <FlatList data={Slides}
                renderItem={({ item }) => <SlideItem item={item} />}
                horizontal
                pagingEnabled
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={handleOnScroll}
            />
            <Pagination data={Slides} scrollX={scrollX} />
        </View>
    );
}

export default Slider;

const styles = StyleSheet.create({});