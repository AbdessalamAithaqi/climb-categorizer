import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Animated, Easing } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ResultScreen from '../screens/ResultScreen';

const Stack = createNativeStackNavigator();

const forSlide = ({ current, next, inverted, layouts: { screen } }) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    next
      ? next.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      })
      : 0
  );

  return {
    cardStyle: {
      transform: [
        {
          translateY: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [
                screen.height, // Start from the bottom
                0, // Move to the top
                screen.height * -1, // Move up above the screen
              ],
              extrapolate: 'clamp',
            }),
            inverted
          ),
        },
      ],
    },
  };
};

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'vertical',
        transitionSpec: {
          open: { animation: 'timing', config: { duration: 500, easing: Easing.inOut(Easing.ease) } },
          close: { animation: 'timing', config: { duration: 500, easing: Easing.inOut(Easing.ease) } },
        },
        cardStyleInterpolator: forSlide,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
