import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { API_KEY, forecastEndPoint } from "../utils/constant";
import { createDataList, groupDataByDate } from "../utils/functions";
import { Divider, Flex, Image, Text } from "@chakra-ui/react";
import moment from "moment/moment";

const ForeCast = ({ city }) => {
  const { data, loading, error } = useFetch(
    `${forecastEndPoint}?q=${city}&units=metric&appid=${API_KEY}`
  );
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    if (!data) return;
    const { list } = data;
    const groupedData = groupDataByDate(list);
    const dateWithDataList = createDataList(groupedData);
    setCityData(dateWithDataList);
  }, [data]);

  if (loading) return <div>Loading...</div>;

  return (
    <Flex direction="column" gap="2" h="100%" overflowY="scroll">
      {cityData.length > 0 ? (
        <Flex direction="column" h="83vh">
          {cityData.map((item) => (
            <>
              <Flex
                key={item.date}
                bg="#fff"
                justifyContent="space-between"
                my="2"
                direction="column"
                p="2"
                borderRadius="md"
              >
                <Text fontWeight="700">
                  {moment(item.date).format("dddd")}
                </Text>
                <Flex justify="space-evenly">
                  {item.data.map((data) => (
                    <Flex key={data.dt} bg="whiteAlpha.400" direction="column">
                      <Text>{moment(data.dt_txt).format("hh:mm A")}</Text>
                      <Image
                        src={`http://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`}
                        boxSize="50px"
                      />
                      <Text>{data.main.temp}°</Text>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
              <Divider orientation="vertical" />
            </>
          ))}
        </Flex>
      ) : (
        <Text>No Data Found</Text>
      )}
    </Flex>
  );
};

export default ForeCast;
