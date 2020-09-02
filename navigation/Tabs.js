import React, { useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native-appearance";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Favs from "../screens/Favs";
import { Platform } from "react-native";
import Setting from "../screens/Setting";
const Tabs = createBottomTabNavigator();

const getHeaderName = (route) =>
  route?.state?.routeNames[route.state.index] || "Home";

export default ({ navigation, route }) => {
  const colorScheme = useColorScheme();
  useLayoutEffect(() => {
    const name = getHeaderName(route);
    navigation.setOptions({
      title: name,
      headerShown: name !== "Home",
    });
  }, [route]);
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = Platform.OS === "ios" ? "ios-" : "md-";
          if (route.name === "Home") {
            iconName += "compass";
          } else if (route.name === "Search") {
            iconName += "search";
          } else if (route.name === "Favs") {
            iconName += "heart";
          } else if (route.name === "Setting") {
            iconName += "settings";
          }
          return (
            <Ionicons
              name={iconName}
              size={24}
              color={
                colorScheme === "dark"
                  ? focused
                    ? "white"
                    : "grey"
                  : focused
                  ? "black"
                  : "gray"
              }
            />
          );
        },
      })}
      tabBarOptions={
        colorScheme === "dark"
          ? {
              style: {
                backgroundColor: "black",
                borderTopColor: "black",
              },
              showLabel: false,
            }
          : {
              style: {
                backgroundColor: "white",
                borderTopColor: "white",
              },
              showLabel: false,
            }
      }
    >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Search" component={Search} />
      <Tabs.Screen name="Favs" component={Favs} />
      <Tabs.Screen name="Setting" component={Setting} />
    </Tabs.Navigator>
  );
};
