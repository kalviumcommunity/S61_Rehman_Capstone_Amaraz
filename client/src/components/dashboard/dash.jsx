import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Input,
  Badge,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

function InventoryList() {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const token = localStorage.getItem('token');
  const toast = useToast(); 

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('http://localhost:3000/inventory', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setItems(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();

  }, [token]);

  const displayAsTable = useBreakpointValue({ base: false, md: true });

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setQuantity(1);
  };

  const handleAddToBill = () => {
    if (!selectedItem || quantity < 1 || quantity > selectedItem.quantity) {
      console.error('Invalid item or quantity');
      return;
    }
  
    const url = `http://localhost:3000/inventory/update/${selectedItem._id}`;
    const headers = { Authorization: `Bearer ${token}` };
  
    console.log(`Sending PUT request to ${url}`);
    console.log('Headers:', headers);
  
    axios
      .put(url, {
        ...selectedItem,
        pendingQuantity: quantity,
        status: 'pending'
      }, { headers })
      .then(res => {
        console.log('Response:', res.data);
        toast({
          title: "Item added successfully to bill",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch(err => {
        toast({
          title: "Error adding item to bill",
          description: err.response?.data?.message || "An error occurred",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.error('Error:', err);
      });
  
    console.log(`Adding ${quantity} of ${selectedItem.name} to bill.`);
    closeModal();
  };

  return (
    <Box bg="white" p={4}>
      <Heading mb={4}>Inventory List</Heading>
      <Input
        placeholder="Search for items"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} w={{ base: '100%', md: '50%' }} mb={{ base: 2, md: 0 }}
      />
      <Text mb={10} mt={5}>
        Number of items: <Badge colorScheme="green">{filteredItems.length}</Badge>
      </Text>
      {displayAsTable ? (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Product Name</Th>
              <Th>Quantity Available</Th>
              <Th>Price</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredItems.map(item => (
              <Tr key={item._id}>
                <Td>{item.name}</Td>
                <Td>{item.quantity}</Td>
                <Td>${item.price}</Td>
                <Td>
                  <Button colorScheme="blue" onClick={() => openModal(item)}>Add to bill</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Stack spacing={4}>
          {filteredItems.map(item => (
            <Box
              key={item._id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Text mt={2} fontSize="xl" fontWeight="bold">
                {item.name}
              </Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text>Price: ${item.price}</Text>
              <Button colorScheme="blue" mt={2} onClick={() => openModal(item)}>
                Add to bill
              </Button>
            </Box>
          ))}
        </Stack>
      )}

      <Modal isOpen={showModal} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add {selectedItem?.name} to Bill</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={2}>Enter quantity:</Text>
            <NumberInput defaultValue={quantity} min={1} max={selectedItem?.quantity} onChange={(value) => setQuantity(value)}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddToBill}>
              Add
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default InventoryList;
