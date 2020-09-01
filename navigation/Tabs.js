import React, { useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Favs from "../screens/Favs";

const Tabs = createBottomTabNavigator();

export default ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route?.state?.routeNames[route.state.index] || "Home",
    });
  }, [route]);
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Search" component={Search} />
      <Tabs.Screen name="Favs" component={Favs} />
    </Tabs.Navigator>
  );
};
