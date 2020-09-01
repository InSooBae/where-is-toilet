import React from "react";
import { View, Text, Button } from "react-native";
import { useColorScheme } from "react-native-appearance";
export default ({ navigation }) => {
  const colorScheme = useColorScheme();
  return (
    <View
      style={
        colorScheme === "dark"
          ? { flex: 1, backgroundColor: "black" }
          : { flex: 1, backgroundColor: "white" }
      }
    >
      <Text>Home</Text>
      <Button
        onPress={() => navigation.navigate("Detail")}
        title="Go To Detail"
      />
    </View>
  );
};
