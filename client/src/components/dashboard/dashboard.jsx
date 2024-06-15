import React from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  Text,
  Input,
  IconButton,
  Button,
  useDisclosure,
  Image,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Sidebar from './Navbar';
import InventoryList from './dash'; 
import AddInventory from '../asset/AddInventory.svg';
import AddInventoryItem from './fileUpload';
import Overview from './overview';

function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider>
      <Flex direction={{ base: 'column', md: 'row' }} h="100vh">
        <Sidebar />
        <Box w={{ base: '100%', md: '94%' }} paddingLeft="5%">
          <Overview />
          <Box overflow="hidden">
            <Box maxHeight="400px" overflowY="auto">
              <InventoryList />
            </Box>
          </Box>
          <Box mt="4">
            <Flex justifyContent={{ base: 'center', md: 'flex-end' }} position="fixed" bottom="5" w={{ base: '100%', md: '94%' }} p={{ base: 4, md: 0 }}>
              <Button
                variant="normal"
                bgColor="#006400"
                color="white"
                borderRadius="20px"
                height="50px"
                leftIcon={<Image src={AddInventory} />}
                onClick={onOpen}
              >
                Add Inventory
              </Button>
              <AddInventoryItem isOpen={isOpen} onClose={onClose} />
            </Flex>
          </Box>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default Dashboard;
