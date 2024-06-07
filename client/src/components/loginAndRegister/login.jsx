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
  FormLabel,
  Alert,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import api from '../api';
import SignIn from '../asset/login.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('loginTime', new Date().getTime());
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data || 'Login failed');
    }
  };
  return (
      <Container maxW={'7xl'} py={{ base: 10, sm: 10, lg: 16 }}>
        <Box
          bg={'gray.50'}
          boxShadow={'2xl'}
          borderRadius={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          position="relative"
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
              src={SignIn}
              alt="Team Image"
              borderRadius="xl"
              boxSize={{ base: '300px', md: '500px' }}
              mb={{ base: 4, md: 0 }}
              display={{ base: 'none', md: 'block' }}
            />
            <Stack>
              <Stack
                spacing={{ base: 8 }}
                maxW={{ lg: 'lg' }}
              >
                <Stack spacing={4}>
                  <Heading
                    color={'gray.800'}
                    lineHeight={1.1}
                    fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
                  >
                    Log in to your account
                    <Text as={'span'} bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">
                      !
                    </Text>
                  </Heading>
                  <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                    let's grow your business together
                  </Text>
                </Stack>
                <Box as={'form'} mt={10} onSubmit={handleLogin}>
                  <Stack spacing={4}>
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
                    Sign in
                  </Button>
                </Box>
                <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }} textAlign={'center'} mt={4}>
                  Don't have an account?{' '}
                  <Link as={RouterLink} to="/register" color={'red.400'} fontWeight={'bold'}>
                    Sign up
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Flex>
        </Box>
      </Container>
  );
};

export default Login;

