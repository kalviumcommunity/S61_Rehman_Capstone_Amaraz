import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateItemModal from './InventoryUpdate';
import Navbar from './Navbar';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  Input,
  useBreakpointValue,
  Heading,
  Text,
  Badge,
  Stack,
  Card,
  CardBody,
  CardFooter,
  useToast,
  Skeleton,
  SkeletonText,
  Flex
} from '@chakra-ui/react';

function InventoryInfo() {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState('');
  const fontSize = useBreakpointValue({ base: "sm", md: "md" });
  const isTableView = useBreakpointValue({ base: false, md: true });
  const toast = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      async function fetchData() {
        try {
          const res = await axios.get('http://localhost:3000/inventory', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setItems(res.data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }

      fetchData();
    }, 1000);

    return () => clearTimeout(timer);
  }, [token]);

  const handleUpdateItemClick = (itemId) => {
    setSelectedItemId(itemId);
    onOpen();
  };

  const handleDeleteItemClick = async (itemId) => {
    try {
      await axios.delete(`https://s61-rehman-capstone-amaraz.onrender.com/inventory/delete/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setItems(items.filter(item => item._id !== itemId));
      toast({
        title: "Item deleted",
        description: "Item has been deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Error in deleting an item",
        description: err.response?.data?.message || "An error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error('Error deleting item:', err);
    }
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Box bg="white" textAlign="center" paddingLeft={"5%"}>
        <Skeleton height="40px" mb={4} />
        <Input placeholder="Search for items" isDisabled mb={4} w={{ base: '100%', md: '50%' }} />
        <Text mb={10} mt={5} fontSize={20}>
          <SkeletonText mt="4" noOfLines={1} spacing="4" />
        </Text>
        {isTableView ? (
          <Table variant="simple" fontSize={fontSize}>
            <Thead>
              <Tr>
                <Th><Skeleton height="20px" /></Th>
                <Th><Skeleton height="20px" /></Th>
                <Th><Skeleton height="20px" /></Th>
                <Th><Skeleton height="20px" /></Th>
                <Th><Skeleton height="20px" /></Th>
                <Th><Skeleton height="20px" /></Th>
                <Th><Skeleton height="20px" /></Th>
                <Th><Skeleton height="20px" /></Th>
                <Th><Skeleton height="20px" /></Th>
              </Tr>
            </Thead>
            <Tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <Tr key={index}>
                  <Td><Skeleton height="20px" /></Td>
                  <Td><Skeleton height="20px" /></Td>
                  <Td><Skeleton height="20px" /></Td>
                  <Td><Skeleton height="20px" /></Td>
                  <Td><Skeleton height="20px" /></Td>
                  <Td><Skeleton height="20px" /></Td>
                  <Td><Skeleton height="20px" /></Td>
                  <Td><Skeleton height="20px" /></Td>
                  <Td><Skeleton height="20px" /></Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Stack spacing={4}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Card key={index}>
                <CardBody>
                  <SkeletonText mt="4" noOfLines={7} spacing="4" />
                </CardBody>
                <CardFooter>
                  <Flex justifyContent="space-between">
                    <Skeleton width="80px" height="30px" />
                    <Skeleton width="80px" height="30px" />
                  </Flex>
                </CardFooter>
              </Card>
            ))}
          </Stack>
        )}
      </Box>
    );
  }

  return (
    <Box bg="white">
      <Navbar />
      <Box bg="white" textAlign="center" paddingLeft={"5%"}>
        <Heading fontSize={30} mb={4}>Inventory List</Heading>
        <Input
          placeholder="Search for items"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          w={{ base: '100%', md: '50%' }}
          mb={{ base: 2, md: 0 }}
        />
        <Text mb={10} mt={5} fontSize={20}>
          Number of items: <Badge colorScheme="yellow">{filteredItems.length}</Badge>
        </Text>
        {isTableView ? (
          <Table variant="simple" fontSize={fontSize}>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Date</Th>
                <Th>Item Name</Th>
                <Th>Purchased Price</Th>
                <Th>Selling Price</Th>
                <Th>Quantity</Th>
                <Th>Supplier</Th>
                <Th>Last Updated</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredItems.map(item => (
                <Tr key={item._id}>
                  <Td>{item._id}</Td>
                  <Td>{new Date(item.updatedAt).toLocaleDateString()}</Td>
                  <Td>{item.name}</Td>
                  <Td>₹{item.purchasedPrice}</Td>
                  <Td>₹{item.price}</Td>
                  <Td>{item.quantity}</Td>
                  <Td>{item.supplier}</Td>
                  <Td>{new Date(item.updatedAt).toLocaleTimeString()}</Td>
                  <Td>
                    <Button onClick={() => handleUpdateItemClick(item._id)} colorScheme="green" size="sm">
                      Update Item
                    </Button>
                  </Td>
                  <Td>
                    <Button onClick={() => handleDeleteItemClick(item._id)} colorScheme="red" size="sm">
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Stack spacing={4}>
            {filteredItems.map(item => (
              <Card key={item._id}>
                <CardBody>
                  <Text mt={2} fontSize="xl" fontWeight="bold">{item.name}</Text>
                  <Text>ID: {item._id}</Text>
                  <Text>Date: {new Date(item.updatedAt).toLocaleDateString()}</Text>
                  <Text>Purchased Price: {item.purchasedPrice}</Text>
                  <Text>Selling Price: {item.price}</Text>
                  <Text>Quantity: {item.quantity}</Text>
                  <Text>Supplier: {item.supplier}</Text>
                  <Text>Last Updated: {new Date(item.updatedAt).toLocaleTimeString()}</Text>
                </CardBody>
                <CardFooter>
                  <Button onClick={() => handleUpdateItemClick(item._id)} colorScheme="green" size="sm" mr={2}>
                    Update Item
                  </Button>
                  <Button onClick={() => handleDeleteItemClick(item._id)} colorScheme="red" size="sm">
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </Stack>
        )}
        {selectedItemId && (
          <UpdateItemModal isOpen={isOpen} onClose={onClose} itemId={selectedItemId} />
        )}
      </Box>
    </Box>
  );
}

export default InventoryInfo;
