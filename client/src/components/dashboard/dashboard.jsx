import React , {useEffect} from  'react';
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
import { getTokenFromUrl } from '../../utils/tokenUtils';

function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tokenReady, setTokenReady] = React.useState(false);

  useEffect(() => {
    const token = getTokenFromUrl();
    if (token) {
      console.log('Token from URL:', token);
      try {
        const tokenParts = token.split('.');
        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          console.log('Decoded token payload:', payload);
        } else {
          console.log('Token is not in JWT format');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
      
      localStorage.setItem('token', token);
      localStorage.setItem('loginTime', new Date().getTime());
      const url = new URL(window.location.href);
      url.searchParams.delete('token');
      window.history.replaceState({}, document.title, url.toString());
      setTokenReady(true);
    }else if (localStorage.getItem('token')) {
      setTokenReady(true);
    }else {
      console.log('No token found in URL');
      const storedToken = localStorage.getItem('token');
      console.log('Token from localStorage:', storedToken);
      setTokenReady(true);
    }
  }, []);

  if(!tokenReady){
    return <div>Loading...</div>;
  }

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
