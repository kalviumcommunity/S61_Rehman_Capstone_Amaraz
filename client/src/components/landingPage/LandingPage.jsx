import React from 'react'
import Header from '../landingPage/Header';
import HeroSection from '../landingPage/HeroSection';
import FeaturesSection from '../landingPage/FeaturesSection';
import AboutUsSection from '../landingPage/AboutUsSection';
import Footer from '../landingPage/Footer';
import { ChakraProvider, Box } from '@chakra-ui/react';


const LandingPage = () => {
  return (
    <ChakraProvider>
    <Box >
      <Header />
      <HeroSection />
      <FeaturesSection />
      <AboutUsSection />
      <Footer />
    </Box>
  </ChakraProvider>
  )
}

export default LandingPage;