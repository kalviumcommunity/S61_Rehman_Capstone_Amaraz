import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Register from './components/loginAndRegister/signup';
import Login from './components/loginAndRegister/login';
import Dashboard from './components/dashboard/dashboard';
import LandingPage from './components/landingPage/LandingPage';
import InventoryInfo from './components/dashboard/inventoryInfo';
import AddInventory from './components/dashboard/fileUpload';


const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/addInventory" element={<AddInventory/>}/>
          <Route path="/inventoryInfo" element={<InventoryInfo/>} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
