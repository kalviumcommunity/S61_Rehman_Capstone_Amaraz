import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  useToast 
} from '@chakra-ui/react';

function UpdateItemModal({ isOpen, onClose, itemId }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [purchasedPrice, setPurchasedPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [supplier, setSupplier] = useState('');
  const [image, setImage] = useState(null);
  const toast = useToast(); 

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`https://s61-rehman-capstone-amaraz.onrender.com/inventory/${itemId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const item = res.data;

        setName(item.name);
        setQuantity(item.quantity);
        setPurchasedPrice(item.purchasedPrice);
        setPrice(item.price);
        setSupplier(item.supplier);
      } catch (err) {
        console.error('Error fetching item:', err);
      }
    };

    if (isOpen && itemId) {
      fetchItem();
    }
  }, [itemId, isOpen]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('quantity', quantity);
    formData.append('purchasedPrice', purchasedPrice);
    formData.append('price', price);
    formData.append('supplier', supplier);
    if (image) {
      formData.append('image', image);
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://s61-rehman-capstone-amaraz.onrender.com/inventory/update/${itemId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      toast({
        title: "Item updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      window.location.reload();
      onClose();
    } catch (err) {
      toast({
        title: "Error updating item",
        description: err.response?.data?.message || "An error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error(err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent textAlign={"center"}>
        <ModalHeader>Update Inventory Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Item Name</FormLabel>
              <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Purchased Price</FormLabel>
              <NumberInput min={0} precision={2} value={purchasedPrice} onChange={(valueString) => setPurchasedPrice(parseFloat(valueString))}>
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Quantity</FormLabel>
              <NumberInput min={1} value={quantity} onChange={(valueString) => setQuantity(parseInt(valueString))}>
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Selling Price</FormLabel>
              <NumberInput min={0} precision={2} value={price} onChange={(valueString) => setPrice(parseFloat(valueString))}>
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Supplier</FormLabel>
              <Input type="text" value={supplier} onChange={(e) => setSupplier(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Image</FormLabel>
              <Input type="file" onChange={handleImageChange} />
            </FormControl>
            <ModalFooter justifyContent="center" gap={"10px"}>
              <Button colorScheme="blue" mr={3} type="submit">
                Update Item
              </Button>
              <Button color={"white"} colorScheme={"red"} onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default UpdateItemModal;
