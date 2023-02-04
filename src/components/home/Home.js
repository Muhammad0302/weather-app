import React, { useState, useEffect } from 'react';
import { Text, Box, Stack, Switch, Flex } from '@chakra-ui/react';

const API_KEY = '109c87baf883c7806f9598bd6ff4157f';

const Home = () => {
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      console.log(res)
      const data = await res.json();
      setWeatherData(data);
    };

    if (city) {
      fetchData();
    }
  }, [city]);

  const handleToggle = () => {
    setIsFahrenheit(prev => !prev);
  };

  const handleChange = event => {
    setCity(event.target.value);
  };

  const getTemperature = () => {
    if (weatherData.main) {
      return isFahrenheit
        ? ((weatherData.main.temp - 273.15) * 9) / 5 + 32
        : weatherData.main.temp - 273.15;
    }

    return null;
  };

  return (
    <Box
      as="form"
      onSubmit={event => {
        event.preventDefault();
      }}
    >
      <Stack spacing={4}>
        <Flex justify="space-between">
          <Text>Fahrenheit</Text>
          <Switch onChange={handleToggle} isChecked={isFahrenheit} />
          <Text>Celsius</Text>
        </Flex>
        <Text mb={4}>Enter city name or zip code:</Text>
        <Box as="input" type="text" onChange={handleChange} />
        {weatherData.main ? (
          <Stack spacing={4}>
            <Text>Temperature: {getTemperature().toFixed(2)}°</Text>
            <Text>Humidity: {weatherData.main.humidity}%</Text>
            <Text>Wind Speed: {weatherData.wind.speed} m/s</Text>
            <Text>Description: {weatherData.weather[0].description}</Text>
          </Stack>
        ) : null}
      </Stack>
    </Box>
  );
};

export default Home;
