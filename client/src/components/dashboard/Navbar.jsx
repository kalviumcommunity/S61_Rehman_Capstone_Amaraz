import React from 'react';
import { Box, Button, VStack, Image, Text, useBreakpointValue, Menu, MenuButton, MenuList, MenuItem, IconButton, cookieStorageManager } from '@chakra-ui/react';
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from 'react-router-dom';
import HomeBtn from '../asset/HomeIcon.svg';
import OrdersIcon from '../asset/OrderIcon.svg';
import LogoutIcon from '../asset/logout.svg';
import MainLogo from '../asset/logo-transparent-png.png';
import Purchased from '../asset/purchased.svg';

function Navbar() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const imageSize = useBreakpointValue({ base: "20px", md: "30px" });
  const buttonSize = useBreakpointValue({ base: "5px", md: "50px" });
  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    localStorage.removeItem('token');    
    navigate('/');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

  return (
    <Box
      w={{ base: "60px", md: "5%" }}
      h={{ base: "auto", md: "100vh" }}
      bg={isMobile ? "transparent" : "#18435A"} 
      color="white"
      display="flex"
      flexDirection={{ base: "column", md: "column" }}
      alignItems="center"
      textAlign="center"
      p="2"
      position="fixed"
      top={0}
      bottom={{ base: "2", md: "20" }}
    >
      {!isMobile && (
        <Image src={MainLogo} width={'80px'} height={'100px'} mb="auto" />
      )}
      {isMobile ? (
        <>
          <Box w="100%" textAlign="left" mb="4" flex={1} display={{ base: "block", md: "none" }} >
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="normal"
                bg={"#18435A"}
              />
              <MenuList bg="#18435A" color="white" p="2"> 
                <MenuItem bg={"#FF4500"} as={Link} to="/inventoryInfo" >Orders</MenuItem>
                <MenuItem bg={"#FF7712"} as={Link} to="/dashboard">Home</MenuItem>
                <MenuItem bg={"navy"} as={Link} to="/inventoryInfo">Inventory</MenuItem>
                <MenuItem bg={"red"} onClick={handleLogout}>Log out</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </>
      ) : (
        <>
          <Box mb="14" mt="16" flex={1} textAlign="center"> 
            <Link to="/dashboard">
              <Button variant="normal" colorScheme="#18435A" size={buttonSize}>
                <VStack spacing={0}>
                  <Image src={HomeBtn} boxSize={imageSize} />
                  <Text fontWeight={"light"}>Home</Text>
                </VStack>
              </Button>
            </Link>
          </Box>
          <Box mb="14" mt="auto" flex={1} textAlign="center">
            <Link to="/allOrders">
              <Button variant="normal" colorScheme="whiteAlpha" size={buttonSize}>
                <VStack spacing={0}>
                  <Image src={OrdersIcon} boxSize={imageSize} />
                  <Text fontWeight={"light"}>Orders</Text>
                </VStack>
              </Button>
            </Link>
          </Box>
          <Box mb="14" mt="auto" flex={1} textAlign="center">
            <Link to="/inventoryInfo">
              <Button variant="normal" colorScheme="whiteAlpha" size={buttonSize}>
                <VStack spacing={0}>
                  <Image src={Purchased} boxSize={imageSize} />
                  <Text fontWeight={"light"}>Inventory</Text>
                </VStack>
              </Button>
            </Link>
          </Box>
          <Box mt="auto" mb="14" flex={1} textAlign="center">
            <Button variant="normal" colorScheme="whiteAlpha" size={buttonSize} onClick={handleLogout}>
              <VStack spacing={0}>
                <Image src={LogoutIcon} boxSize={imageSize} />
                <Text fontWeight={"light"}>Log out</Text>
              </VStack>
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Navbar;
