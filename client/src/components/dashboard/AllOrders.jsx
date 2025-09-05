import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  Text,
  Badge,
  Skeleton,
  Flex,
  Checkbox,
  useToast
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function PendingOrders() {
  const [pendingItems, setPendingItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const token = localStorage.getItem('token');
  const buttonSize = "md"; // Define buttonSize or remove it if not needed
  const toast = useToast();

  const fetchPendingOrders = async () => {
    try {
      const res = await axios.get('https://s61-rehman-capstone-amaraz.onrender.com/inventory', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const filtered = res.data.filter(
        (item) => item.status === 'pending' && item.pendingQuantity > 0
      );
      setPendingItems(filtered);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch pending orders.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteOrder = async () => {
    try {
      await axios.post(
        'https://s61-rehman-capstone-amaraz.onrender.com/orders/complete-orders',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast({
        title: "Order Completed",
        description: "The order has been completed and moved to completed orders.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchPendingOrders();
    } catch (error) {
      console.error(error);
      setError('Failed to complete order.');
    }
  };

  const handleRemoveSelectedItems = async () => {
    try {
      await Promise.all(
        selectedItems.map(async (itemId) => {
          await axios.put(
            `https://s61-rehman-capstone-amaraz.onrender.com/inventory/update/${itemId}`,
            { pendingQuantity: 0, status: 'completed' },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        })
      );
      setSelectedItems([]);
      fetchPendingOrders();
      toast({
        title: "Items Removed",
        description: "Selected items have been removed from pending orders.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      setError('Failed to remove selected items.');
    }
  };

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId]
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPendingOrders();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredPending = pendingItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Box paddingLeft={"7%"} paddingTop={"5%"} paddingRight={"7%"} paddingBottom={"5%"}>
        <Skeleton height="40px" mb={4} />
        <Input placeholder="Search pending items" mb={4} maxW="45%" isDisabled />
        <Skeleton height="20px" mb={2} />
        <Skeleton height="20px" mb={2} />
        <Skeleton height="20px" mb={4} />
        <Skeleton height="40px" mb={4} />
        <Flex justifyContent="center" mb={4}>
          <Skeleton width="200px" height="40px" />
        </Flex>
      </Box>
    );
  }

  return (
    <Box>
      <Navbar />
      <Box paddingLeft={"7%"} paddingTop={"5%"} paddingRight={"7%"} paddingBottom={"5%"}>
        <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
          <Heading mb={4}>Pending Orders</Heading>
        </Box>

        <Input
          placeholder="Search pending items"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          mb={4}
          maxW="45%"
        />
        {error ? (
          <Text color="red.500">{error}</Text>
        ) : filteredPending.length === 0 ? (
          <Text>No pending orders.</Text>
        ) : (
          <>
            <Table variant="simple" mb={4}>
              <Thead>
                <Tr>
                  <Th>Select</Th>
                  <Th>Product</Th>
                  <Th>Pending Quantity</Th>
                  <Th>Price</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredPending.map((item) => (
                  <Tr key={item._id}>
                    <Td>
                      <Checkbox
                        isChecked={selectedItems.includes(item._id)}
                        onChange={() => handleCheckboxChange(item._id)}
                      />
                    </Td>
                    <Td>{item.name}</Td>
                    <Td>
                      <Badge colorScheme="orange">
                        {item.pendingQuantity}
                      </Badge>
                    </Td>
                    <Td>${item.price}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Flex justifyContent="space-between" mb={4}>
              <Button colorScheme="green" onClick={handleCompleteOrder} width="200px">
                Complete Order
              </Button>
              <Button colorScheme="red" onClick={handleRemoveSelectedItems} width="200px" isDisabled={selectedItems.length === 0}>
                Remove Selected
              </Button>
            </Flex>
          </>
        )}
      </Box>
      <Flex justifyContent={{ base: 'center', md: 'flex-end' }} position="fixed" bottom="5" w={{ base: '100%', md: '94%' }} p={{ base: 4, md: 0 }}>
        <Link to="/completedOrders">
          <Button variant="normal" bgColor="#403735" color="white" height="50px">
            <Text>CompletedOrders</Text>
          </Button>
        </Link>
      </Flex>
    </Box>
  );
}

export default PendingOrders;
