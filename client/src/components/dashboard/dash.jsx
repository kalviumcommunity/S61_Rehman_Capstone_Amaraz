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
  Input,
  Stack,
  Heading,
  Text,
  Badge,
  useToast,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

function InventoryList() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const token = localStorage.getItem('token');
  const toast = useToast();
  const isTable = useBreakpointValue({ base: false, md: true });

  const fetchItems = async () => {
    try {
      const res = await axios.get('https://s61-rehman-capstone-amaraz.onrender.com/inventory', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [token]);

  const openModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setQuantity(1);
  };

  const handleAddToBill = async () => {
    if (!selectedItem || quantity < 1 || quantity > selectedItem.quantity) {
      toast({
        title: 'Invalid quantity',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const res = await axios.put(
        `https://s61-rehman-capstone-amaraz.onrender.com/inventory/update/${selectedItem._id}`,
        {
          pendingQuantity: quantity,
          status: 'pending',
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast({
        title: 'Item added to bill',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      fetchItems();
      closeModal();
    } catch (err) {
      toast({
        title: 'Error',
        description: err.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box bg="white" p={4}>
      <Heading mb={4}>Inventory List</Heading>
      <Input
        placeholder="Search for items"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        w={{ base: '100%', md: '50%' }}
        mb={{ base: 4, md: 6 }}
      />
      <Text mb={4}>
        Number of items: <Badge colorScheme="green">{filteredItems.length}</Badge>
      </Text>

      {isTable ? (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Available Quantity</Th>
              <Th>Price</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredItems.map((item) => (
              <Tr key={item._id}>
                <Td>{item.name}</Td>
                <Td>{item.quantity}</Td>
                <Td>₹{item.price}</Td>
                <Td>
                  <Button colorScheme="blue" onClick={() => openModal(item)}>
                    Add to bill
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Stack spacing={4}>
          {filteredItems.map((item) => (
            <Box
              key={item._id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Text fontWeight="bold">{item.name}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text>Price: ${item.price}</Text>
              <Button mt={2} colorScheme="blue" onClick={() => openModal(item)}>
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
            <NumberInput
              value={quantity}
              min={1}
              max={selectedItem?.quantity || 1}
              onChange={(valueString) => setQuantity(parseInt(valueString))}
            >
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
