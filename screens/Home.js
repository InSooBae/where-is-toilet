import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { useColorScheme } from "react-native-appearance";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { toiletApi } from "../api";
import constants from "../constants";
export default ({ navigation }) => {
  const colorScheme = useColorScheme();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLocaLoading, setIsLocaLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [data, setData] = useState([]);
  const getData = async () => {
    const {
      data: {
        SearchPublicToiletPOIService: { list_total_count, row },
      },
    } = await toiletApi.location(1, 1000);
    setData([...row]);

    for (let i = 1001; list_total_count > i; i += 1000) {
      if (i + 999 > list_total_count) {
        const {
          data: {
            SearchPublicToiletPOIService: { row },
          },
        } = await toiletApi.location(i, list_total_count);
        setData([...row]);
      } else {
        const {
          data: {
            SearchPublicToiletPOIService: { row },
          },
        } = await toiletApi.location(i, i + 999);
        setData([...row]);
      }
    }
    setDataLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("설정에서 위치 정보 권한을 허락해주세요!");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setIsLocaLoading(false);
    })();
    if (errorMsg) {
      console.log(errorMsg);
    }
  }, []);
  if (!dataLoading)
    return (
      <View
        style={
          colorScheme === "dark"
            ? { flex: 1, backgroundColor: "black" }
            : { flex: 1, backgroundColor: "white" }
        }
      >
        {!isLocaLoading && (
          <MapView
            initialRegion={{
              latitude: location?.coords?.latitude || 37.48175921133305,
              longitude: location?.coords?.longitude || 127.13387660765427,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation
            style={{
              width: constants.width,
              height: constants.height / 2,
            }}
          >
            {data &&
              data.map((marker, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker?.Y_WGS84,
                    longitude: marker?.X_WGS84,
                  }}
                  title={marker.FNAME}
                  description={marker.ANAME}
                />
              ))}
          </MapView>
        )}
        <Button
          onPress={() => navigation.navigate("Detail")}
          title="Go To Detail"
        />
      </View>
    );
  else
    return (
      <View
        style={
          colorScheme === "dark"
            ? { flex: 1, backgroundColor: "black" }
            : { flex: 1, backgroundColor: "white" }
        }
      ></View>
    );
};
