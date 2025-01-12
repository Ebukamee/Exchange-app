import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
//   HStack,
  Icon,
//   Button,
  Grid,
} from "@chakra-ui/react";
import Check from "../assets/images/check-circle-solid.svg";
import { Blue } from "../assets/Colors";
import Card  from "../assets/images/sell-card.webp";

export default function Other() {
  const features = [
    "Financial Flexibility",
    "User-Friendly Experience",
    "Increased Security",
    "Extensive Card Variety",
    "Market Efficiency",
    "Quick Payouts",
  ];
  return (
    <>
      {/* Section 1: How It Works */}
      <Box   textAlign="center" w='90%' mx='auto' bg={Blue.bg} rounded='3xl'>
        <Flex
          direction={["column", "column", "row"]}
          align="center"
          justify="space-between"
          gap={8}
          my={8}
        >
          {/* Text Content */}
          <VStack align="flex-start" spacing={4} maxW="lg" mx={8}>
            <Heading as="h2" size="3xl" color="gray.800" my={5}>
              Why Us?
            </Heading>

            {/* Grid Layout for Features */}
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={6}
              w="full"
            >
              {features.map((feature, index) => (
                <Flex key={index} align="center" gap={2}>
                  {/* Optional: Use an icon */}
                  <Icon>
                    <img src={Check} />
                  </Icon>

                  <Text color="gray.500" fontSize="md">
                    {feature}
                  </Text>
                </Flex>
              ))}
            </Grid>
          </VStack>

          {/* Image */}
          <Box
            // boxSize="sm"
            // rounded="lg"
            overflow="hidden"
            position="relative"
            w={{base:'100%', md:'50%'}}
          >
            <img
              src={Card}
              alt="Person holding a phone"
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
        </Flex>
      </Box>
    </>
  );
}
