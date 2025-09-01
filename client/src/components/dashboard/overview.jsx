import React from 'react';
import { Text, Box, Flex, Center } from '@chakra-ui/react';

function Overview() {
  return (
    <Box p={{ base: 2, md: 4 }}>
      <Text textAlign={"center"} fontSize={{ base: "2xl", md: "3xl" }} mb={{ base: 2, md: 4 }}>Overview </Text>
      <Flex
        justifyContent="space-between"
        mb={{ base: 4, md: 8 }}
        flexDirection={{ base: "column", md: "row" }}
        textAlign="center"
        gap={{ base: 4, md: 0 }}
      >
        <Box
          w={{ base: "100%", md: "30%" }}
          h="100px"
          bg="white"
          borderRadius="md"
          p={{ base: 2, md: 4 }}
          boxShadow="md"
        >
          <Text fontSize={{ base: "lg", md: "xl" }}>Profits</Text>
        </Box>
        <Box
          w={{ base: "100%", md: "30%" }}
          h="100px"
          bg="white"
          borderRadius="md"
          p={{ base: 2, md: 4 }}
          boxShadow="md"
        >
          <Text fontSize={{ base: "lg", md: "xl" }}>Orders</Text>
        </Box>
        <Box
          w={{ base: "100%", md: "30%" }}
          h="100px"
          bg="white"
          borderRadius="md"
          p={{ base: 2, md: 4 }}
          boxShadow="md"
        >
          <Text fontSize={{ base: "lg", md: "xl" }}>Inventory</Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default Overview;
