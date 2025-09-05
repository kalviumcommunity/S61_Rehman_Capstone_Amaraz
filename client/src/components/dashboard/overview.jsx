import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Text, Box, Flex, Skeleton, SkeletonText } from '@chakra-ui/react';

function Overview() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  const fetchOverviewData = async () => {
    try {
      const res = await axios.get('https://s61-rehman-capstone-amaraz.onrender.com/overview-stats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch (error) {
      console.error("Error fetching overview data:", error);
      setError('Failed to fetch overview data.');
    }
  };

  useEffect(() => {

    fetchOverviewData();
  }, []);

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  if (!stats) {
    return (
      <Box p={{ base: 2, md: 4 }}>
        <Flex
          justifyContent="space-between"
          mb={{ base: 4, md: 8 }}
          flexDirection={{ base: "column", md: "row" }}
          textAlign="center"
          gap={{ base: 4, md: 0 }}
        >
          <Box w={{ base: "100%", md: "30%" }} h="120px" bg="white" borderRadius="md" p={4} boxShadow="md">
            <SkeletonText mt="4" noOfLines={2} spacing="4" />
          </Box>
          <Box w={{ base: "100%", md: "30%" }} h="120px" bg="white" borderRadius="md" p={4} boxShadow="md">
            <SkeletonText mt="4" noOfLines={2} spacing="4" />
          </Box>
          <Box w={{ base: "100%", md: "30%" }} h="120px" bg="white" borderRadius="md" p={4} boxShadow="md">
            <SkeletonText mt="4" noOfLines={3} spacing="4" />
          </Box>
        </Flex>
      </Box>
    );
  }

  return (
    <Box p={{ base: 2, md: 4 }}>
    
      <Flex
        justifyContent="space-between"
        mb={{ base: 4, md: 8 }}
        flexDirection={{ base: "column", md: "row" }}
        textAlign="center"
        gap={{ base: 4, md: 0 }}
      >
        <Box w={{ base: "100%", md: "30%" }} h="120px" bg="white" borderRadius="md" p={4} boxShadow="md">
          <Text fontSize="xl" fontWeight="bold">Profits</Text>
          <Text fontSize="lg" color="green.600">
            ₹ {stats.profit != null ? stats.profit.toFixed(2) : 'N/A'}
          </Text>
        </Box>
        <Box w={{ base: "100%", md: "30%" }} h="120px" bg="white" borderRadius="md" p={4} boxShadow="md">
          <Text fontSize="xl" fontWeight="bold">Total Orders</Text>
          <Text fontSize="lg">{stats.totalOrders}</Text>
        </Box>
        <Box w={{ base: "100%", md: "30%" }} h="120px" bg="white" borderRadius="md" p={4} boxShadow="md">
          <Text fontSize="xl" fontWeight="bold">Inventory</Text>
          <Text fontSize="md">Products: {stats.inventoryCount}</Text>
          <Text fontSize="md">
            Total Cost: ₹ {stats.inventoryCost != null ? stats.inventoryCost.toFixed(2) : 'N/A'}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default Overview;
