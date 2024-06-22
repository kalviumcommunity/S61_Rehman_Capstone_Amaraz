import React, { useState } from 'react'
import { Box, Heading } from '@chakra-ui/react'
import Navbar from './Navbar'

const AllOrders = () => {
 

  return (
    <>
      <Navbar />
      <Box>
        <Heading>All Orders</Heading>
        <p>List of all orders</p>
      </Box>
    </>
  )
}

export default AllOrders
