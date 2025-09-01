import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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



const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('loginTime', new Date().getTime());
      
      navigate('/dashboard', { replace: true });
      console.log('Google OAuth token stored successfully');
    }

    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      navigate('/login');
      return;
    }
    
  }, [location, navigate]);


  return (
    <ChakraProvider>
      <Flex direction={{ base: 'column', md: 'row' }} h="100vh">
        <Sidebar />
        <Box w={{ base: '100%', md: '94%' }} paddingLeft="5%">
          <Overview />
          <Box overflow="hidden">
            {/* <Flex mb="4" alignItems="center" direction={{ base: 'column', md: 'row' }}>
              <Input placeholder="Search" size="md" w={{ base: '100%', md: '50%' }} mb={{ base: 2, md: 0 }} />
              <IconButton ml={{ base: 0, md: 2 }} aria-label="Search" icon={<SearchIcon />} />
            </Flex> */}
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
