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
} from '@chakra-ui/react';

function InventoryInfo() {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState('');
  const fontSize = useBreakpointValue({ base: "sm", md: "md" });
  const isTableView = useBreakpointValue({ base: false, md: true });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('http://localhost:3000/inventory');
        setItems(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  const handleUpdateItemClick = (itemId) => {
    setSelectedItemId(itemId);
    console.log('Selected Item ID:', itemId);
    onOpen();
  };

  const handleDeleteItemClick = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3000/inventory/delete/${itemId}`);
      setItems(items.filter(item => item._id !== itemId));
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box bg="white">
      <Navbar />
      <Box bg="white" textAlign="center" paddingLeft={"5%"} >
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
                  <Td>${item.purchasedPrice}</Td>
                  <Td>${item.price}</Td>
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
                  <Text>Purchased Price: ${item.purchasedPrice}</Text>
                  <Text>Selling Price: ${item.price}</Text>
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