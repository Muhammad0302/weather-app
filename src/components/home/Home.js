import React, { useState, useEffect } from 'react';
import { Text, Box, Stack, Switch, Flex,  Icon,
    Input,
    FormControl,
    FormLabel,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter } from '@chakra-ui/react';
import {getCurrentWeather} from "../../api/weather"

const Home = () => {
 
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCurrentWeather(city)
      console.log(res)
      const data = res.data;
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
    if (weatherData?.main) {
      return isFahrenheit
        ? ((weatherData.main.temp - 273.15) * 9) / 5 + 32
        : weatherData.main.temp - 273.15;
    }

    return null;
  };

  return (
    <Flex justify="center" alignItems="center" mt="100px" >
    <Box
      as="form"
      width="60%"
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


               <Box maxW="100%" borderWidth="1px" rounded="lg" p={5}>
            <form 
            // onSubmit={handleSubmit}
            >
              <FormControl>
                <FormLabel>Enter city name or zip code:</FormLabel>
                <Input
                  type="text"
                  value={city}
                  onChange={handleChange} 
                  placeholder="e.g Lahore"
                />
              </FormControl>
              <Button mt={4} variantColor="teal" type="submit">
                Get Weather
              </Button>
            </form>
          </Box>   
       
       
       
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
    </Flex>
  );
};

export default Home;
