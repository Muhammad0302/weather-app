import React, { useState, useEffect } from 'react';
import { Text, Box, Stack, Switch, Flex,  Icon,
    Input,
    FormControl,
    FormLabel,
    Button,
    Radio,
    useDisclosure,
    RadioGroup,
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
  const [tempratureType, setTempratureType] = useState('Fahrenheit')

    //Code for live search input city  

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await getCurrentWeather(city)
//       console.log(res)
//       const data = res.data;
//       setWeatherData(data);
//     };
//     if (city) {
//       fetchData();
//     }
//   }, [city]);


  const fetchWeatherData = async () => {
    if (city) {
        const res = await getCurrentWeather(city)
        setWeatherData(res.data);
      }
  };


  const handleToggle = () => {
    setIsFahrenheit(prev => !prev);
  };

  const handleChange = event => {
    setCity(event.target.value);
  };

  console.log(weatherData)

  const getTemperature = () => {
    if (weatherData?.main) {
      return tempratureType ==='Fahrenheit'
        ? ((weatherData.main.temp - 273.15) * 9) / 5 + 32
        : weatherData.main.temp - 273.15;
    }

    return null;
  };


  console.log(tempratureType)

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
          {/* <Text>Fahrenheit</Text>
          <Switch onChange={handleToggle} isChecked={isFahrenheit} />
          <Text>Celsius</Text>
                */}

        <RadioGroup onChange={setTempratureType} value={tempratureType}>
        <Stack direction='row'>
           <Radio value='Fahrenheit' colorScheme='green'>Fahrenheit</Radio>
           <Radio value='Celsius' colorScheme='green'>Celsius</Radio>
        </Stack>
        </RadioGroup>               




        </Flex>



               <Box maxW="100%" borderWidth="1px" rounded="lg" pt={5} pl={5} pr={5} 
               pb={5}
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
              <Button mt={4} variantColor="teal" type="button" onClick={fetchWeatherData}>
                Get Weather
              </Button>
          </Box>   
       
       
       
        {weatherData.main ? (
          <Stack textAlign="center" spacing={4}>
            <Text>Temperature: {getTemperature().toFixed(2)}°</Text>
            <Text>Humidity: {weatherData.main.humidity}%</Text>
            <Text>Wind Speed: {weatherData.wind.speed} m/s</Text>
            <Text>Description: {weatherData.weather[0].description}</Text>
          </Stack>
        ) :  city && weatherData.cod ==='404' ? <Text color="#ff0000">No data found for the enter city or zip code</Text> : null  }

      </Stack>
    </Box>
    </Flex>
  );
};

export default Home;
