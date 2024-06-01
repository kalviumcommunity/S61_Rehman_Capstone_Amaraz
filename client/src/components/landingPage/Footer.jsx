import React from 'react';
import { Flex, Text, VStack, Link, Image, HStack, Center } from '@chakra-ui/react';
import Logo from '../asset/footerLogo.svg';
import FacebookIcon from '../asset/facebook.svg';
import TwitterIcon from '../asset/twitter.svg';
import InstagramIcon from '../asset/instagram.svg';

const Footer = () => {
  return (
    <Flex as="footer" direction={{ base: 'column', md: 'row' }} justify="space-between" align="center" p={4} bg="gray.800" color="white">
      <Center mb={{ base: 4, md: 0 }}>
        <Image src={Logo} alt="AMARAZ Logo" />
      </Center>
      <VStack align="flex-start" mb={{ base: 4, md: 0 }}>
        <Text>© 2024 AMARAZ. All rights reserved.</Text>
        <HStack spacing={4}>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms of service</Link>
        </HStack>
      </VStack>
      <VStack align="flex-start" mb={{ base: 4, md: 0 }}>
        <Text fontWeight="bold">Contact Us</Text>
        <Link href="mailto:info@amaraz.com" isExternal>Email: info@amaraz.com</Link>
        <Link href="tel:+1234567890" isExternal>Phone: +1234567890</Link>
      </VStack>
      <VStack align="flex-start">
        <Text fontWeight="bold">Follow Us</Text>
        <HStack spacing={4} bg="#FF4500" width="150px" height="50px" borderRadius="20px" align="center" justify="center" _hover={{ bg: '#E03E00' }}>
          <Link href="https://www.facebook.com/yourpage" isExternal><Image src={FacebookIcon} alt="Facebook" /></Link>
          <Link href="https://www.twitter.com/yourpage" isExternal><Image src={TwitterIcon} alt="Twitter" /></Link>
          <Link href="https://www.instagram.com/yourpage" isExternal><Image src={InstagramIcon} alt="Instagram" /></Link>
        </HStack>
      </VStack>
    </Flex>
  );
};
export default Footer;
