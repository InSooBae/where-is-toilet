import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useColorScheme } from "react-native-appearance";
import { toiletApi } from "../api";
export default ({ navigation }) => {
  const colorScheme = useColorScheme();
  let data = [];
  const getData = async () => {
    const {
      data: {
        SearchPublicToiletPOIService: { list_total_count, row },
      },
    } = await toiletApi.location(1, 1000);
    data.push(...row);

    for (let i = 1001; list_total_count > i; i += 1000) {
      if (i + 999 > list_total_count) {
        const {
          data: {
            SearchPublicToiletPOIService: { row },
          },
        } = await toiletApi.location(i, list_total_count);
        data.push(...row);
      } else {
        const {
          data: {
            SearchPublicToiletPOIService: { row },
          },
        } = await toiletApi.location(i, i + 999);
        data.push(...row);
      }
    }
    for (let i in data) {
      console.log(data[i]);
    }
  };
  useEffect(() => {
    getData();
  }, []);
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
