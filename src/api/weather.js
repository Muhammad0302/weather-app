import axios from "axios";
import { apikey } from "../utils/apikey";
export const getCurrentWeather = async (city) => {
    const API_KEY = apikey()
    let res;
    try {
      res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    } catch (err) {
      res = err.response;
      console.log(err.response);
    }
    return res ? res : "";
  };