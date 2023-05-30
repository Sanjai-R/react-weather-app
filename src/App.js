import { useState, useEffect } from "react";
import {
  SimpleGrid,
  Box,
  Text,
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
} from "@chakra-ui/react";
import useFetch from "./hooks/useFetch";
import { API_KEY, weatherEndPoint } from "./utils/constant";
import { createDataList } from "./utils/functions";
import CurrentWeather from "./containers/CurrentWeather";
import ForeCast from "./containers/ForeCast";
import { GrLocationPin } from "react-icons/gr";
const cities = [
  "Paris",
  "London",
  "Singapore",
  "Berlin",
  "Chennai",
  "Bangalore",
  "Hyderabad",
  "Mumbai",
];

function App() {
  const [city, setCity] = useState(cities[0]);
  const [cityData, setCityData] = useState(null);

  const { data, loading, error } = useFetch(
    `${weatherEndPoint}?q=${city}&units=metric&appid=${API_KEY}`
  );

  useEffect(() => {
    if (data) {
      setCityData(data);
    }
  }, [data]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <SimpleGrid columns={2}>
      <Box
        background="url(https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=874&q=80) center/cover no-repeat"
        height="100vh"
        as="grid"
        alignItems="center"
        justifyContent="center"
        overflowY="hidden"
      >
        <Text
          color="white"
          fontWeight="bold"
          fontSize="24px"
          textShadow="0 0 20px black"
          textAlign="center"
          mt="4"
        >
          Weather App
        </Text>
        
        <Box
          display="grid"
          placeItems="center"
          h="100%"
          textAlign="center"
          flexDirection="column"
          backdropFilter="blur(8px)"
        >
          
          <Select
            ml={2}
            onChange={handleCityChange}
            value={city}
            placeholder="Select a city"
            w="80%"
            colorScheme="whiteAlpha"
            variant="filled"
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </Select>
        </Box>
      </Box>

      <Tabs isFitted variant="enclosed" bg="gray.100" overflowY="hidden">
        <TabList mb="1em" bg="#fff">
          <Tab>WEATHER</Tab>
          <Tab>FORECAST</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box>
              {cityData && <CurrentWeather data={{ ...cityData, city }} />}
            </Box>
          </TabPanel>
          <TabPanel>
            <ForeCast city={city} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </SimpleGrid>
  );
}

export default App;
