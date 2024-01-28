/**
 * @fileoverview This module provides the AppNavigator component for the application.
 */

// Import necessary modules from react, react-navigation/native-stack, and react-native
import React from 'react'; import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Animated, Easing } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ResultScreen from '../screens/ResultScreen';
import ErrorScreen from '../screens/ErrorScreen';

// Create a native stack navigator

const Stack = createNativeStackNavigator();

/**
 * Function to interpolate the transition animation for sliding screens.
 * @param {object} props - The properties object.
 * @param {object} props.current - The current screen.
 * @param {object} props.next - The next screen.
 * @param {object} props.inverted - The inverted object.
 * @param {object} props.layouts - The layouts object.
 * @param {object} props.layouts.screen - The screen layout.
 * @returns {object} The card style interpolator.
 */
const forSlide = ({ current, next, inverted, layouts: { screen } }) => {
  const combinedProgress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    next?.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }) || 0
  );

  // Card style transformation based on the combined progress
  const translateY = Animated.multiply(
    combinedProgress.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [screen.height, 0, -screen.height], // Start from bottom, move to top, and then above the screen
      extrapolate: 'clamp',
    }),
    inverted
  );

  return {
    cardStyle: {
      transform: [{ translateY }],
    },
  };
};

/**
 * The AppNavigator component.
 * It defines the navigation stack for the application.
 * @returns {React.Component} The AppNavigator component.
 */
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
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="Error" component={ErrorScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
