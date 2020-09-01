import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Detail from "../screens/Detail";
import Tabs from "./Tabs";
import { useColorScheme } from "react-native-appearance";
const Stack = createStackNavigator();

export default () => {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator
      screenOptions={
        colorScheme === "dark"
          ? {
              headerStyle: {
                backgroundColor: "black",
                borderBottomColor: "black",
                shadowColor: "black",
              },
              headerTintColor: "white",
            }
          : {
              headerStyle: {
                backgroundColor: "white",
                borderBottomColor: "white",
                shadowColor: "white",
              },
              headerTintColor: "black",
            }
      }
    >
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
};
