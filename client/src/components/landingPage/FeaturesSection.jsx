import React from 'react';
import { VStack, Flex, Text, Image, Box, Center } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import OrderM from '../asset/order-managment.svg';
import ProfitsM from '../asset/profits.svg'
import UpdateM from '../asset/update.svg'


const boxVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3, 
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};
const features = [
  {
    title: 'Effortless Order Management',
    description: 'Easily add and organize daily orders with prices.',
    icon: OrderM,
    color: '#FFB5A7',
  },
  {
    title: 'Real-Time Profit Insights',
    description: 'Instantly check daily profits based on orders and inventory sales.',
    icon: ProfitsM,
    color: '#FCD5CE',
  },
  {
    title: 'Streamlined Inventory Tracking',
    description: 'Keep inventory updated by adding and updating items with prices.',
    icon: UpdateM,
    color: '#F9DCC4',
  },
];

const FeatureBox = ({ feature, i }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      custom={i}
      animate={controls}
      initial="hidden"
      variants={boxVariants}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <Box
        p={6}
        m={4}
        bg={feature.color}
        borderRadius="lg"
        boxShadow="lg"
        textAlign="center"
        width="300px"
        height="300px" 
        direction="column"
        align="center"
      >
        <Center mb={4}>
          <Image src={feature.icon} alt={feature.title} boxSize="80px" />
        </Center>
        <Text fontSize="xl" fontWeight="bold" mb={2}>{feature.title}</Text>
        <Text color="gray.600">{feature.description}</Text>
      </Box>
    </motion.div>
  );
};

const FeaturesSection = () => {
  return (

    <VStack spacing={12} py={24} textAlign="center"  borderRadius="lg" boxShadow="lg">
     <Text fontSize="3xl" fontWeight="bold" color="#FF4500">
  <span style={{ display: 'block' }}>Simple Way</span> to Manage{' '}
  <Text as="span" color="black">
    Business Finances
  </Text>
</Text>
      <Flex wrap="wrap" justify="center">
        {features.map((feature, index) => (
          <FeatureBox key={index} feature={feature} i={index} />
        ))}
      </Flex>
    </VStack>
    
  );
};

export default FeaturesSection;
