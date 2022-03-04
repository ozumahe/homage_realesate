import Image from "next/image";
import Link from "next/link";
import { Box, Flex, Button, Text } from "@chakra-ui/react";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import Property from "../components/Property";

// # Banner
const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  linkName,
  buttonText,
  imageUrl,
}) => (
  <Link href={linkName}>
    <a>
      <Box position="relative" height="300px" m="10">
        <img
          src={imageUrl}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt="bannerImage"
        />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <Text
            color={"gray.500"}
            padding="5px"
            bg="blue.100"
            textAlign="center"
            fontSize="xl"
            fontWeight="medium"
          >
            {purpose}
          </Text>
          <Text fontSize="3xl" color="white" fontWeight="bold">
            {title1} <br /> {title2}
          </Text>
          <Text fontSize="2xl" paddingTop="3" paddingBottom="3" color={"white"}>
            {desc1} <br /> {desc2}
          </Text>
        </Box>
      </Box>
    </a>
  </Link>
);

export default function Home({ propertyForRent, propertyForSale }) {
  return (
    <Box>
      <Banner
        purpose="RENT A HOME"
        title1="Rental Homes for"
        title2="Everyone"
        desc1="Explore Apartment, Villes, Home"
        desc2="and more"
        buttonText="Explore renting"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />

      <Flex flexWrap="wrap" justifyContent="center">
        {propertyForRent.map((property) => (
          <Property {...property} key={property.id} />
        ))}
      </Flex>
      <Banner
        purpose="BUY A HOME"
        title1="Find, Buy & Own your"
        title2="Dream Home"
        desc1="Explore Apartment, Villes, Home"
        desc2="and more"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap="wrap" justifyContent="center">
        {propertyForSale.map((property) => (
          <Property {...property} key={property.id} />
        ))}
      </Flex>
    </Box>
  );
}

export async function getStaticProps() {
  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );
  const propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );

  return {
    props: {
      propertyForRent: propertyForRent?.hits,
      propertyForSale: propertyForSale?.hits,
    },
  };
}
