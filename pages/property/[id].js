import { Box, Flex, Icon, Avatar, Spacer, Text } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";
import { fetchApi, baseUrl } from "../../utils/fetchApi";

import ImageScrollBar from "../../components/ImageScrollBar";

const PropertuDetails = ({
  propertyDetails: {
    price,
    photos,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
  },
}) => (
  <Box p="4" maxWidth="1000px" margin="auto">
    {photos && <ImageScrollBar data={photos} />}
    <Box p="3">
      <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Box paddingRight="3" color="green.400">
            {isVerified && <GoVerified />}
          </Box>
          <Text fontWeight="bold" fontSize="lg">
            AED {millify(price)} {rentFrequency && `${rentFrequency}`}
          </Text>
        </Flex>
        <Box>
          <Avatar size="sm" src={agency?.logo?.url} />
        </Box>
      </Flex>
      <Flex
        alignItems="center"
        p="1"
        justifyContent="space-between"
        w="250px"
        color="blue.500"
      >
        {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqrt
        <BsGridFill />
      </Flex>
      <Flex textTransform="uppercase" fontSize="lg" fontWeight="bold">
        {title}
      </Flex>
      <Box paddingTop="10px">
        <Text lineHeight="8">{description}</Text>
      </Box>
      <Flex
        marginTop="15px"
        w="full"
        justifyContent="space-around"
        flexWrap="wrap"
      >
        <Flex margin="5px" alignItems="center">
          <Text padding="4px" borderRadius="2px" color="white" bg="blue.400">
            TYPE
          </Text>
          <Text
            padding="4px"
            borderRadius="2px"
            bg="blue.100"
            fontSize="xl"
            textTransform="capitalize"
          >
            {type}
          </Text>
        </Flex>
        <Flex margin="5px" alignItems="center">
          <Text padding="4px" borderRadius="2px" color="white" bg="blue.400">
            PURPOSE
          </Text>
          <Text
            padding="4px"
            fontSize="xl"
            textTransform="capitalize"
            borderRadius="2px"
            bg="blue.100"
          >
            {purpose}
          </Text>
        </Flex>
        {furnishingStatus && (
          <Flex margin="5px" alignItems="center">
            <Text
              padding="4px"
              textTransform="uppercase"
              borderRadius="2px"
              color="white"
              bg="blue.400"
            >
              furnishingStatus
            </Text>
            <Text
              padding="4px"
              borderRadius="2px"
              bg="blue.100"
              fontSize="xl"
              textTransform="capitalize"
            >
              {furnishingStatus}
            </Text>
          </Flex>
        )}
      </Flex>
      <Box marginTop="10px">
        {amenities.length && (
          <Text fontWeight="bold" fontSize="2xl" textTransform="capitalize">
            amenities
          </Text>
        )}
        <Flex flexWrap="wrap">
          {amenities.map((item) =>
            item.amenities.map((amenity) => (
              <Text bg="blue.100" margin="5px" padding="8px" key={amenity.text}>
                {amenity.text}
              </Text>
            ))
          )}
        </Flex>
      </Box>
    </Box>
  </Box>
);

export default PropertuDetails;

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

  return {
    props: {
      propertyDetails: data,
    },
  };
}
