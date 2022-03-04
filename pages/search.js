import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Text, Flex, Box, Icon, Button } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";
import NoResult from "../assets/images/noresult.png";

import { fetchApi, baseUrl } from "../utils/fetchApi";

import SearchFilters from "../components/SearchFilters";
import Property from "../components/Property";

const Search = ({ properties }) => {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();
  return (
    <Box>
      <Flex
        cursor="pointer"
        padding="2"
        bg="gray.100"
        justifyContent="center"
        alignItems="center"
        fontWeight="black"
        fontSize="lg"
        onClick={() => setSearchFilters(!searchFilters)}
      >
        <Text>Search By Filters</Text>
        <Icon paddingLeft="2" w="10" as={BsFilter} />
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize="2xl" fontWeight="bold" p="4">
        Properties {router.query.purpose}
      </Text>
      <Flex flexWrap="wrap" justifyContent="center">
        {properties.map((property) => (
          <Property {...property} key={property.id} />
        ))}
      </Flex>
      <Box>
        {properties.length === 0 && (
          <Flex
            p="2"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Image src={NoResult} width={300} height={300} alt="noresult" />
            <Text fontSize="2xl">No Result Found</Text>
            <Link href="/" passHref>
              <Button bg="blue.200" p="2">
                Back to Home
              </Button>
            </Link>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default Search;

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || "for-rent";
  const rentFrequency = query.rentFrequency || "yearly";
  const minPrice = query.minPrice || "0";
  const maxPrice = query.maxPrice || "1000000";
  const roomsMin = query.roomsMin || "0";
  const bathsMin = query.bathsMin || "0";
  const sort = query.sort || "price-desc";
  const areaMax = query.areaMax || "35000";
  const locationExternalIDs = query.locationExternalIDs || "5002";
  const categoryExternalID = query.categoryExternalID || "4";

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
}
