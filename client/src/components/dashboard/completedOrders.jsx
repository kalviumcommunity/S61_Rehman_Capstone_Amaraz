import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Input,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  VStack,
} from '@chakra-ui/react';
import Navbar from './Navbar';

function CompletedOrders() {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const token = localStorage.getItem('token');

  const fetchCompletedOrders = async () => {
    try {
      const res = await axios.get('https://s61-rehman-capstone-amaraz.onrender.com/orders/completed-orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompletedOrders(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedOrders();
    console.log(completedOrders);
  }, [token]);

  const filteredCompleted = completedOrders.filter((order) =>
    order.items.some((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Box>
       <Navbar /> 
    <Box paddingLeft={"7%"} paddingTop={"5%"} paddingRight={"7%"} paddingBottom={"5%"}>
      <Heading mb={6}>Completed Orders</Heading>
      <Input
        placeholder="Search by product name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        mb={6}
        maxW="400px"
      />
      {loading ? (
        <Spinner />
      ) : filteredCompleted.length === 0 ? (
        <Text>No completed orders found.</Text>
      ) : (
        <Accordion allowMultiple>
          {filteredCompleted.map((order, index) => (
            <AccordionItem key={order._id} border="1px solid #E2E8F0" borderRadius="lg" mb={4}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Text fontWeight="bold">Order #{index + 1}</Text>
                    <Text fontSize="sm" color="gray.500">
                      Completed:{" "}
                      <Badge colorScheme="green">
                        {new Date(order.completedAt).toLocaleString()}
                      </Badge>
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Total: <strong>₹{order.totalAmount.toFixed(2)}</strong>
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Table size="sm" variant="striped">
                  <Thead>
                    <Tr>
                      <Th>Product</Th>
                      <Th>Quantity</Th>
                      <Th>Unit Price</Th>
                      <Th>Subtotal</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {order.items.map((item, i) => (
                      <Tr key={i}>
                        <Td>{item.name}</Td>
                        <Td>{item.quantity}</Td>
                        <Td>₹{item.price.toFixed(2)}</Td>
                        <Td>₹{(item.quantity * item.price).toFixed(2)}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
                <VStack align="end" mt={4}>
                  <Text fontWeight="bold">
                    Total Amount: ₹{order.totalAmount.toFixed(2)}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Order ID: {order._id}
                  </Text>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </Box>
    </Box>
  );
}

export default CompletedOrders;
