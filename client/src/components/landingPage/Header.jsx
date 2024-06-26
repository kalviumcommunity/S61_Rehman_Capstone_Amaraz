import React from 'react';
import { Flex, Button, Image, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Logo from '../asset/logo-transparent-png.png';


const Header = () => {

  return (
    <Flex as="nav" justify="space-between" align="center" p={4} bg="white" boxShadow="md">
      <Image src={Logo} alt="AMARAZ Logo" width="100px" ml="4%" />
      <Box display="flex" alignItems="center" mr="4%">
        <Link to="/login">
          <Button variant="link" fontSize="16px" mr={4} verticalAlign="middle">
            Sign In
          </Button>
        </Link>
        <Link to="/register">
          <Button
            width="120px"
            height="40px"
            borderRadius="20px"
            bg="#FF4500"
            color="white"
            _hover={{ bg: '#E03E00' }}
            verticalAlign="middle"
          >
            Register
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default Header;
