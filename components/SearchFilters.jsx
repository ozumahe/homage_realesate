import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Input, Flex, Select } from "@chakra-ui/react";
import { MdCancel } from "react-icons/md";
import Image from "next/image";

import { filterData, getFilterValues } from "../utils/filterData";

const SearchFilters = () => {
  const router = useRouter();
  const [filters, setFilters] = useState(filterData);

  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;

    const values = getFilterValues(filterValues);

    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    });

    router.push({ pathname: path, query });
  };

  return (
    <Flex
      bg="gray.100"
      p="4"
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
    >
      {filters.map((filter) => (
        <Box key={filter.queryName}>
          <Select
            placeholder={filter.queryName}
            p="2"
            w="fit-content"
            onChange={(e) =>
              searchProperties({ [filter.queryName]: e.target.value })
            }
          >
            {filter?.items?.map((item) => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
    </Flex>
  );
};

export default SearchFilters;
