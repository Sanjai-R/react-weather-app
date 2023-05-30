import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const FlexBox = ({ title, value }) => {
  return (
    <Flex>
      <Text fontSize="lg" fontWeight="700">
        {title}:
      </Text>
      <Text fontSize="lg">{value}</Text>
    </Flex>
  );
};

const CurrentWeather = ({ data }) => {
  return (
    <Box p="3" bg="#fff" borderRadius="md">
      <Flex justifyContent="space-between">
        <Flex direction="column">
          <Heading>
            {data?.name}, {data?.sys?.country}
          </Heading>
          <Text fontSize="lg">{data?.weather[0]?.description}</Text>
        </Flex>

        <Image
          src={`http://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`}
        />
      </Flex>

      <Divider my="4" />

      <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
        <FlexBox title="Temperature" value={`${data?.main?.temp} °C`} />
        <FlexBox title="Feels Like" value={`${data?.main?.feels_like} °C`} />
        <FlexBox title="Min Temperature" value={`${data?.main?.temp_min} °C`} />
        <FlexBox title="Max Temperature" value={`${data?.main?.temp_max} °C`} />
        <FlexBox title="Pressure" value={`${data?.main?.pressure} hPa`} />
        <FlexBox title="Humidity" value={`${data?.main?.humidity}%`} />
        <FlexBox title="Visibility" value={`${data?.visibility} meters`} />
        <FlexBox title="Wind Speed" value={`${data?.wind?.speed} m/s`} />
        <FlexBox title="Wind Direction" value={`${data?.wind?.deg}°`} />
        <FlexBox title="Cloudiness" value={`${data?.clouds?.all}%`} />
        <FlexBox
          title="Sunrise"
          value={new Date(data?.sys?.sunrise * 1000).toLocaleTimeString()}
        />
        <FlexBox
          title="Sunset"
          value={new Date(data?.sys?.sunset * 1000).toLocaleTimeString()}
        />
      </SimpleGrid>
    </Box>
  );
};

export default CurrentWeather;
