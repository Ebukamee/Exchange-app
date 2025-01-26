import {
  Box,
  Button,
  Input,
  Grid,
  Image,
  Text,
  VStack,
  VisuallyHidden,
  Checkbox,
  Flex,
  // useToast,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { DataListItem, DataListRoot } from "../components/ui/data-list"
import { useState } from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  DialogActionTrigger,
} from "../components/ui/dialog";

const GiftCardForm = () => {
  // const toast = useToast();
  const [formData, setFormData] = useState({
    giftCard: null,
    category: null,
    subCategory: null,
    price: "",
    description: "",
    images: [],
    acceptedTerms: false,
  });

  const giftCards = [
    { id: 1, name: "Adidas Gift Card", image: "/adidas.png", rate: 650 },
    { id: 2, name: "Amazon Gift Card", image: "/amazon.png", rate: 700 },
  ];

  const categories = ["E-commerce", "Fashion", "Electronics"];
  const subCategories = {
    "E-commerce": ["Digital Goods", "Subscription Services", "Gift Cards"],
    Fashion: ["Apparel", "Footwear", "Accessories"],
    Electronics: ["Devices", "Components", "Peripherals"],
  };

  const amount =
    formData.price && formData.giftCard
      ? (formData.price * formData.giftCard.rate).toLocaleString()
      : "";

  const isFormValid =
    formData.giftCard &&
    formData.category &&
    formData.subCategory &&
    formData.price > 0 &&
    formData.description &&
    formData.image &&
    formData.acceptedTerms;

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.every((file) => file.type.startsWith("image/"))) {
      setFormData({
        ...formData,
        images: [...formData.images, ...files],
      });
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Transaction Submitted",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  return (
    <Box maxW="800px" mx="auto" p={4}>
      {/* Gift Card Selection */}
      <FormControl isInvalid={!formData.giftCard} isRequired mb={4}>
        <FormLabel>Gift Card Name</FormLabel>
        <DialogRoot>
          <DialogTrigger>
            <Input
              isReadOnly
              value={formData.giftCard?.name || ""}
              placeholder="Select Gift Card"
              cursor="pointer"
              _placeholder={{ color: "gray.400" }}
              borderColor={!formData.giftCard ? "red.300" : "gray.200"}
            />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select Gift Card</DialogTitle>
              <DialogCloseTrigger />
            </DialogHeader>
            <DialogBody>
              <VStack spacing={3}>
                {giftCards.map((card) => (
                  <DialogActionTrigger key={card.id} asChild>
                    <Button
                      w="100%"
                      variant="outline"
                      justifyContent="start"
                      onClick={() =>
                        setFormData({ ...formData, giftCard: card })
                      }
                    >
                      <Image src={card.image} boxSize="24px" mr={2} />
                      {card.name}
                    </Button>
                  </DialogActionTrigger>
                ))}
              </VStack>
            </DialogBody>
          </DialogContent>
        </DialogRoot>
        <FormErrorMessage>Please select a gift card</FormErrorMessage>
      </FormControl>

      {/* Category Selection Grid */}
      <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={4}>
        <FormControl isInvalid={!formData.category} isRequired>
          <FormLabel>Category</FormLabel>
          <DialogRoot>
            <DialogTrigger>
              <Input
                isReadOnly
                value={formData.category || ""}
                cursor="pointer"
                placeholder="Select Category"
                borderColor={!formData.category ? "red.300" : "gray.200"}
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Select Category</DialogTitle>
                <DialogCloseTrigger />
              </DialogHeader>
              <DialogBody>
                <VStack spacing={3}>
                  {categories.map((category) => (
                    <DialogActionTrigger key={category} asChild>
                      <Button
                        w="100%"
                        variant="outline"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            category,
                            subCategory: null,
                          })
                        }
                      >
                        {category}
                      </Button>
                    </DialogActionTrigger>
                  ))}
                </VStack>
              </DialogBody>
            </DialogContent>
          </DialogRoot>
          <FormErrorMessage>Required field</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!formData.subCategory} isRequired>
          <FormLabel>Sub-category</FormLabel>
          <DialogRoot>
            <DialogTrigger>
              <Input
                isReadOnly
                cursor="pointer"
                value={formData.subCategory || ""}
                placeholder="Select Sub-category"
                borderColor={!formData.subCategory ? "red.300" : "gray.200"}
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Select Sub-category</DialogTitle>
                <DialogCloseTrigger />
              </DialogHeader>
              <DialogBody>
                <VStack spacing={3}>
                  {formData.category &&
                    subCategories[formData.category]?.map((subCat) => (
                      <DialogActionTrigger key={subCat} asChild>
                        <Button
                          w="100%"
                          variant="outline"
                          onClick={() =>
                            setFormData({ ...formData, subCategory: subCat })
                          }
                        >
                          {subCat}
                        </Button>
                      </DialogActionTrigger>
                    ))}
                </VStack>
              </DialogBody>
            </DialogContent>
          </DialogRoot>
          <FormErrorMessage>Required field</FormErrorMessage>
        </FormControl>
      </Grid>

      {/* Price Input */}
      <FormControl isInvalid={!formData.price} isRequired mb={4}>
        <FormLabel>Price</FormLabel>
        <Input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          min="1"
          placeholder="Enter price"
        />
        <FormErrorMessage>Enter a valid price</FormErrorMessage>
      </FormControl>

      {/* Amount Display */}
      <FormControl mb={4}>
        <FormLabel>Amount</FormLabel>
        <Input
          isReadOnly
          value={amount ? `¥${amount}` : ""}
          fontWeight="bold"
          placeholder="Calculated amount"
        />
      </FormControl>

      {/* Image Upload */}
      <FormControl isInvalid={!formData.images.length} isRequired mb={4}>
        <FormLabel>Upload Gift Card Images</FormLabel>
        <Box
          borderWidth={1}
          p={4}
          borderRadius="md"
          borderColor="gray.200"
          _hover={{ borderColor: "blue.300" }}
        >
          <VisuallyHidden>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              multiple
            />
          </VisuallyHidden>
          <Button
            onClick={() => document.querySelector('input[type="file"]').click()}
            variant="outline"
          >
            Choose Files
          </Button>
          {formData.images.length > 0 && (
            <Text mt={2} fontSize="sm">
              Selected: {formData.images.length} image(s)
            </Text>
          )}
        </Box>
        <FormErrorMessage>Please upload at least one image</FormErrorMessage>
      </FormControl>

      {/* Terms Checkbox */}
      <FormControl isInvalid={!formData.acceptedTerms} isRequired mb={6}>
        {/* <Checkbox
            isChecked={formData.acceptedTerms}
            onChange={(e) =>
              setFormData({ ...formData, acceptedTerms: e.target.checked })
            }
          >
            I accept the terms and conditions
          </Checkbox> */}
        <FormErrorMessage>You must accept the terms</FormErrorMessage>
      </FormControl>

      {/* Summary Dialog */}
      <DialogRoot trapFocus="false">
        <DialogTrigger>
          <Button
            colorScheme="blue"
            w="100%"
            size="lg"
            isDisabled={!isFormValid}
          >
            Proceed to Summary
          </Button>
        </DialogTrigger>
        <DialogContent
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          boxShadow="xl"
          borderRadius="xl"
        >
          <DialogHeader>
            <DialogTitle textAlign="center">Transaction Summary</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            <VStack spacing={4} align="stretch">
              {formData.images.length > 0 && (
                <Box
                  maxH="300px"
                  overflowX="auto"
                  overflowY="hidden"
                  whiteSpace="nowrap"
                  py={2}
                  css={{
                    "&::-webkit-scrollbar": {
                      height: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#CBD5E0",
                      borderRadius: "4px",
                    },
                  }}
                >
                  <Flex gap={4}>
                    {formData.images.map((image, index) => (
                      <Image
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt={`Uploaded Gift Card ${index + 1}`}
                        w='200px'
                        objectFit="contain"
                        borderRadius="md"
                        display="inline-block"
                        flexShrink={0}
                      />
                    ))}
                  </Flex>
                </Box>
              )}
              <DataListRoot orientation="horizontal">
                <DataListItem
                  label="Gift Card"
                  value={
                    <Text fontWeight="medium">
                      {formData.giftCard?.name || "Not selected"}
                    </Text>
                  }
                />
                <DataListItem
                  label="Category"
                  value={
                    <Text color="gray.600">{formData.category || "—"}</Text>
                  }
                />
                <DataListItem
                  label="Sub-category"
                  value={
                    <Text color="gray.600">{formData.subCategory || "—"}</Text>
                  }
                />
                <DataListItem
                  label="Amount"
                  value={
                    <Text fontWeight="bold" color="green.600">
                      ¥{amount || "0"}
                    </Text>
                  }
                />
              </DataListRoot>

              <Text fontSize="sm" color="gray.500" textAlign="center">
                Amount payable may change if uploaded to wrong category. Please
                verify all details before confirming.
              </Text>
            </VStack>
          </DialogBody>
          <DialogFooter justifyContent="center">
            <DialogActionTrigger>
              <Button variant="outline" mr={3}>
                Cancel
              </Button>
            </DialogActionTrigger>
            <Button colorScheme="green" onClick={handleSubmit}>
              Confirm Transaction
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};

export default GiftCardForm;
