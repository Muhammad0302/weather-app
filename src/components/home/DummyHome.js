import React, { useState, useEffect } from 'react';
import { Text, Box, Stack, Switch, Flex,
    Icon,
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
    ModalFooter, } from '@chakra-ui/react';

const API_KEY = '109c87baf883c7806f9598bd6ff4157f';

const Weather = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // fetch data from API and update weather state
      setWeather({
        temperature: 72,
        condition: "Sunny",
        icon: "sun",
      });
      onOpen();
    };
  
    return (
      <Box p={5}>
        <Flex align="center" justify="center">
          <Box maxW="sm" borderWidth="1px" rounded="lg" p={5}>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>City</FormLabel>
                <Input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city name"
                />
              </FormControl>
              <Button mt={4} variantColor="teal" type="submit">
                Get Weather
              </Button>
            </form>
          </Box>
        </Flex>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Weather in {city}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex align="center" justify="center">
                <Box p={5}>
                  <Text fontSize="6xl">
                    {weather.temperature}°
                    <Icon name={weather.icon} />
                  </Text>
                  <Text mt={4}>{weather.condition}</Text>
                </Box>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button variantColor="teal" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    );
};

export default Weather;
