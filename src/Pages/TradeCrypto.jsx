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
  Heading,
  Textarea,
  // useToast,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { DataListItem, DataListRoot } from "../components/ui/data-list";
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
import { Blue } from "../assets/Colors";
import TransactionStore from "../Store/TransactionStore";
import useAuthStore from "../Store/userStore";
import { toaster } from "../components/ui/toaster";
import { toast } from "../Helper";

const CryptoForm = () => {
  const { uploadImages, uploadCrypto } = TransactionStore();
  const { user } = useAuthStore();
  const [loading,setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    images: [],
    acceptedTerms: false,
  });

  const AddCryptoRecord = async () => {
    setLoading(true);
     toast("loading", "Please Wait", "Creating Transaction");
     try {
       const imageUrls = await uploadImages(formData.images);
       uploadCrypto(
         'Bitcoin',
         user.uid,
         1000,
         formData.price,
         user.email,
         formData.description,
         imageUrls
       );
       setLoading(false);
       if (!loading) {
         toaster.dismiss();
       }
       toast("success", "Transaction Succesful", "Success");
     } catch (error) {
       if (!loading) {
         toaster.dismiss();
       }
       toast("error", error.message, "An Error Occured");
     }
  };
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

  const amount = formData.price * 500;

  const isFormValid =
    formData.name &&
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
    // toast({
    //   title: "Transaction Submitted",
    //   status: "success",
    //   duration: 3000,
    //   isClosable: true,
    //   position: "top-right",
    // });
    uploadImages(formData.images)
  };

  return (
    <Box maxW="800px" w="85%" mx="auto" p={4}>
      <Heading as="h1" size="3xl" my={10} color="teal.500" textAlign="center">
        BlixExchange
      </Heading>
      {/* Gift Card Selection */}
      <FormControl isInvalid={!formData.giftCard} isRequired mb={10}>
        <FormLabel>Crypto Name</FormLabel>
        <DialogRoot>
          <DialogTrigger w="100%">
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
              <DialogTitle>Select Crypto Currency</DialogTitle>
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
      </FormControl>

      {/* Price Input */}
      <FormControl isInvalid={!formData.price} isRequired mb={10}>
        <FormLabel>Price</FormLabel>
        <Input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          min="1"
          placeholder="Enter price"
        />
      </FormControl>

      {/* Amount Display */}
      <FormControl mb={10}>
        <FormLabel>Amount</FormLabel>
        <Input
          isReadOnly
          value={amount ? `₦${amount}` : ""}
          fontWeight="bold"
          color="green.500"
          placeholder="Calculated amount"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea
         h='100px' onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder='Enter a description'></Textarea>
      </FormControl>
      {/* Image Upload */}
      <FormControl isInvalid={!formData.images.length} isRequired mb={10}>
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
      <DialogRoot>
        <DialogTrigger>
          <Button
            bg={Blue.p}
            w="100%"
            px={10}
            size="lg"
            isDisabled={!isFormValid}
          >
            Continue
          </Button>
        </DialogTrigger>
        <DialogContent>
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
                        w="200px"
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
                  label="Crypto"
                  value={
                    <Text fontWeight="medium">
                      {formData.name || "Not selected"}
                    </Text>
                  }
                />
                <DataListItem
                  label="Description"
                  value={
                    <Text >
                      {formData.description || "—"}
                    </Text>
                  }
                />
                <DataListItem
                  label="Amount"
                  value={
                    <Text fontWeight="bold" color="green.600">
                      ₦{amount || "0"}
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
            <Button bg="green" onClick={AddCryptoRecord}>
              Confirm Transaction
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};

export default CryptoForm;
