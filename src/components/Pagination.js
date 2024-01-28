import { StyleSheet, Animated, View, Dimensions } from "react-native";
import React from "react";

const { width } = Dimensions.get('screen');

const Pagination = ({ data, scrollX }) => {
    return (
        <View style={styles.container}>
            {data.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [12, 30, 12],
                    extrapolate: 'clamp',
                });

                return <Animated.View style={[styles.dot, { width: dotWidth }]} key={i.toString()} />;
            })}
        </View>
    );
}

export default Pagination;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: -20, // Adjust this value as needed
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        height: 12,
        width: 12,
        borderRadius: 6,
        marginHorizontal: 3,
        backgroundColor: '#ccc',
    }
});