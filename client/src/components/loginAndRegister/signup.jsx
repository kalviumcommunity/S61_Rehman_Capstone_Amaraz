import React, { useState } from 'react';
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  Image,
  Link,
  CloseButton,
  FormControl,
  Alert,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import api from '../api';
import RegisterImg from '../asset/signUp.svg';
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await api.post('/register', { email, username, password });
      alert('Registration successful');
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data || 'Registration failed');
    }
  };
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
      <Container maxW={'7xl'} height={'100vh'} py={{ base: 10, sm: 10, lg: 16 }} >
        <Box
          bg={'gray.50'}
          boxShadow={'2xl'}
          borderRadius={'xl'}
          position={'relative'}
        >
          <CloseButton
            as={RouterLink}
            to="/"
            position="absolute"
            top={4}
            right={4}
          />
          <Flex
            align={'center'}
            justify={'center'}
            flexDirection={{ base: 'column', md: 'row' }}
          >
            <Image
              src={RegisterImg}
              alt="Team Image"
              borderRadius="lg"
              boxSize={{ base: '300px', md: '500px' }}
              mb={{ base: 4, md: 0 }}
              display={{ base: 'none', md: 'block' }}
            />
            <Stack
              rounded={'xl'}
              p={{ base: 4, sm: 6, md: 8 }}
              spacing={{ base: 8 }}
              maxW={{ lg: 'lg' }}
            >
              <Stack spacing={4}>
                <Heading
                  color={'gray.800'}
                  lineHeight={1.1}
                  fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
                >
                  Create an account
                  <Text as={'span'} bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">
                    !
                  </Text>
                </Heading>
                <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                  Join Amaraz, let's grow your business together
                </Text>
              </Stack>
              <Box as={'form'} mt={10} onSubmit={handleRegister}>
                <Stack spacing={4}>
                  <FormControl id="username" isRequired>
                    <Input
                      type="text"
                      placeholder="Username"
                      bg={'gray.100'}
                      border={0}
                      color={'gray.500'}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="email" isRequired>
                    <Input
                      type="email"
                      placeholder="Email"
                      bg={'gray.100'}
                      border={0}
                      color={'gray.500'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="password" isRequired>
                    <Input
                      type="password"
                      placeholder="Password"
                      bg={'gray.100'}
                      border={0}
                      color={'gray.500'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="confirm-password" isRequired>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      bg={'gray.100'}
                      border={0}
                      color={'gray.500'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </FormControl>
                  {error && <Alert status="error" mt="4">{error}</Alert>}
                </Stack>
                <Button
                  type="submit"
                  fontFamily={'heading'}
                  mt={8}
                  w={'full'}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  color={'white'}
                  _hover={{
                    bgGradient: 'linear(to-r, red.400,pink.400)',
                    boxShadow: 'xl',
                  }}
                >
                  Sign up
                </Button>
              </Box>
              <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }} textAlign={'center'} mt={4}>
                Already have an account?{' '}
                <Link as={RouterLink} to="/login" color={'red.400'} fontWeight={'bold'}>
                  Sign in
                </Link>
              </Text>
              <Button onClick={handleGoogleLogin}>
                <FcGoogle size={30} />oogle
              </Button>
            </Stack>
          </Flex>
        </Box>
      </Container>
  );
};

export default Register;
