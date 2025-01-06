import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Container,
  IconButton,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

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
    <Box bg="gray.50" py={16}>
      <Container maxW="3xl" textAlign="center" mb={12}>
        <Heading as="h2" size="2xl" mb={4}>
          Frequently Asked Questions
        </Heading>
        <Text color="gray.600">
          Our customer support is always available to provide answers to any of your questions. To begin, here are some of our most asked questions.
        </Text>
      </Container>

      <Container maxW="3xl">
        {faqItems.map((item, index) => (
          <Box
            key={index}
            bg="white"
            p={6}
            mb={4}
            borderRadius="md"
            boxShadow="md"
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              cursor="pointer"
              onClick={() => toggleFAQ(index)}
            >
              <Text fontSize="lg" fontWeight="bold" color="gray.800">
                {item.question}
              </Text>
              <IconButton
                icon={
                  <FontAwesomeIcon
                    icon={openIndex === index ? faChevronUp : faChevronDown}
                  />
                }
                variant="ghost"
                aria-label="Toggle FAQ"
              />
            </Box>
            {openIndex === index && (
              <Text mt={4} color="gray.600">
                {item.answer}
              </Text>
            )}
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default FAQ;
