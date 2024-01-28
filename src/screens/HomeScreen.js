import React from 'react';
import { View, Text, Button } from 'react-native';

// Defines the Home screen
const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Result"
        onPress={() => navigation.navigate('Result')}
      />
    </View>
  );
};

export default HomeScreen;
