import React from 'react';
import { VStack, Text, Box, Button } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutUsSection = () => {
  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: textRef1, inView: textInView1 } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: textRef2, inView: textInView2 } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: textRef3, inView: textInView3 } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const titleControls = useAnimation();
  const textControls1 = useAnimation();
  const textControls2 = useAnimation();
  const textControls3 = useAnimation();

  React.useEffect(() => {
    if (titleInView) {
      titleControls.start('visible');
    }
  }, [titleControls, titleInView]);

  React.useEffect(() => {
    if (textInView1) {
      textControls1.start('visible');
    }
  }, [textControls1, textInView1]);

  React.useEffect(() => {
    if (textInView2) {
      textControls2.start('visible');
    }
  }, [textControls2, textInView2]);

  React.useEffect(() => {
    if (textInView3) {
      textControls3.start('visible');
    }
  }, [textControls3, textInView3]);

  return (
    <Box textAlign="center" mx="auto">
      <Box >
        <VStack spacing={8} py={20} align="centre">
          <motion.div
            ref={titleRef}
            animate={titleControls}
            initial='hidden'
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 50 },
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Text fontSize="4xl" fontWeight="bold">
              <Text as="span" style={{ color: 'black' }}>About</Text>
              <Text as="span" style={{ color: '#FF4500' }}> us</Text>
            </Text>
          </motion.div>
          <motion.div
            ref={textRef1}
            animate={textControls1}
            initial='hidden'
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 50 },
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Box align="center">
              <Text fontSize="lg" color="gray.600" maxW="600px">
                We understand the challenges that come with running a small business, and we're here to help.
              </Text>
            </Box>
          </motion.div>
          <motion.div
            ref={textRef2}
            animate={textControls2}
            initial='hidden'
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 50 },
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Box align="center">
              <Text fontSize="lg" color="gray.600" maxW="600px">
                At AMARAZ, we provide a platform where business owners can seamlessly manage their orders and inventory. Our user-friendly interface allows you to add orders with their respective prices, keep track of your inventory, and calculate your total profits for the day.
              </Text>
            </Box>
          </motion.div>
          <motion.div
            ref={textRef3}
            animate={textControls3}
            initial='hidden'
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 50 },
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Box align="center">
              <Text fontSize="lg" color="gray.600" maxW="600px">
                Our mission is to simplify business management and help small businesses thrive. We believe that with the right tools, managing your business can be a smooth and efficient process.
              </Text>
            </Box>
          </motion.div>
        </VStack>
      </Box>
      <Box textAlign="center" py={20}>
        <Text fontSize="2xl" fontWeight="bold">Join us at AMARAZ, and let's grow your business together.</Text>
      </Box>
    </Box>
  );
};

export default AboutUsSection;
