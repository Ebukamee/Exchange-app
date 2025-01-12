import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Container,
  Image,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Plus from "../assets/images/plus.svg"
import Minus from "../assets/images/minus.svg"

const FAQ = () => {
  const faqItems = [
    {
      question: "How Does Blixexchange Work?",
      answer:
        "We've built Blixexchange with love to give you the simplest trading experience ever, so you will never find it difficult to use. From creating an account to carrying out any form of transaction, we have tooltips and guides in place within the app to help you. You will also receive notifications via email and SMS on transaction updates, so you're never in the dark.",
    },
    {
      question: "Is Blixexchange Safe?",
      answer:
        "Yes, Blixexchange is built with advanced security measures to ensure your transactions are safe.",
    },
    {
      question: "How Do I Register On Blixexchange?",
      answer:
        "To register, click the 'Sign up for free' button on the top-right corner of the page and follow the instructions.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Box bg="gray.50" py={20} pb={0} color='blue.900' className="faq">
        <div className="faq">
      <Container maxW="3xl" textAlign="center" pb={20} mb={12} >
        <Heading as="h2" size="3xl" mb={4} >
          Frequently Asked Questions
        </Heading>
        <Text>
          Our customer support is always available to provide answers to any of your questions. To begin, here are some of our most asked questions.
        </Text>
      </Container>

      <Container maxW="5xl">
        {faqItems.map((item, index) => (
          <Box
            key={index}
            p={6}
            mb={4}
            
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              cursor="pointer"
              onClick={() => toggleFAQ(index)}
            >
              <Text fontSize="lg" fontWeight="bold">
                {item.question}
              </Text>
              
                  {openIndex === index ? <Image src={Minus} />: <Image src={Plus} />}
                 
            </Box>
            {openIndex === index && (
              <Text mt={4}>
                {item.answer}
              </Text>
            )}
          </Box>
        ))}
      </Container>
      </div>
    </Box>
  );
};

export default FAQ;
