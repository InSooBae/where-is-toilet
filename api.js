import axios from "axios";

const SEOUL_DATA_KEY = "78794f694662697332356d5445477a";
//http://openAPI.seoul.go.kr:8088/(인증키)/xml/GeoInfoPublicToiletWGS/1/5
const makeRequest = (start, end) =>
  axios.get(
    `http://openAPI.seoul.go.kr:8088/${SEOUL_DATA_KEY}/json/SearchPublicToiletPOIService/${start}/${end}`
  );

export const toiletApi = {
  location: (start, end) => makeRequest(start, end),
};
