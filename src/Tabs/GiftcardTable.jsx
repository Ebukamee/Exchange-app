import React, { useState } from "react";
import {
  Box,
  Heading,
  Button,
  Flex,
  Spacer,
  Input,
  Text,
  TableRoot,
  TableHeader,
  TableRow,
  TableColumnHeader,
  TableBody,
  TableCell,
  Image,
} from "@chakra-ui/react";
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogCloseTrigger,
  DialogBody,
  DialogFooter,
} from "../components/ui/dialog"; // Adjust the import path based on your project structure
import { Blue } from "../assets/Colors";

// Mapping of gift card names to their images
const giftCardImages = {
  Amazon: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  Apple: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  "Razer Gold": "https://i.pinimg.com/736x/e4/67/0c/e4670c59dade6ed7522fa8054e687de3.jpg",
  "American Express":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/601px-American_Express_logo_%282018%29.svg.png",
  Steam: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg",
  "Vanilla/One":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Vanilla_Logo_1.png/800px-Vanilla_Logo_1.png?20150330072304",
  "Vanilla VISA": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Visa_2021.svg/512px-Visa_2021.svg.png",
  NordStorm:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Nordstrom_Logo_1991.svg/531px-Nordstrom_Logo_1991.svg.png",
  Nike: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
  Macy: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Macys_logo.svg/512px-Macys_logo.svg.png",
  Sephora: "https://seeklogo.com/images/S/sephora-logo-F5C4DB9E97-seeklogo.com.png",
  Target: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Target_logo.svg/432px-Target_logo.svg.png",
  Ebay: "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg",
  VISA: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Visa_2021.svg/512px-Visa_2021.svg.png",
  Xbox: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Xbox_Logo.svg/372px-Xbox_Logo.svg.png",
  Footlocker:
    "https://upload.wikimedia.org/wikipedia/fr/thumb/9/94/Foot_Locker_logo.svg/339px-Foot_Locker_logo.svg.png?20190912154451",
};

const GiftcardForm = () => {
  // Initial gift cards data
  const [giftCards, setGiftCards] = useState({
    Amazon: [
      { name: "100-200", rate: 0.8 },
      { name: "201-500", rate: 0.75 },
      { name: "Others", rate: 0.7 },
    ],
    Apple: [
      { name: "25-99", rate: 0.85 },
      { name: "100-500", rate: 0.8 },
      { name: "Others", rate: 0.75 },
      { name: "Horizontal", rate: 0.7 },
    ],
    "Razer Gold": [
      { name: "20-500", rate: 0.9 },
      { name: "Others", rate: 0.85 },
    ],
    "American Express": [], // No subcategories
    Steam: [{ name: "10-1000", rate: 0.8 }],
    "Vanilla/One": [], // No subcategories
    "Vanilla VISA": [], // No subcategories
    NordStorm: [], // No subcategories
    Nike: [], // No subcategories
    Macy: [
      { name: "100-500", rate: 0.8 },
      { name: "Others", rate: 0.75 },
    ],
    Sephora: [{ name: "100-500", rate: 0.85 }],
    Target: [
      { name: "100-500", rate: 0.8 },
      { name: "Others", rate: 0.75 },
    ],
    Ebay: [
      { name: "100-200", rate: 0.85 },
      { name: "Others", rate: 0.8 },
    ],
    VISA: [], // No subcategories
    Xbox: [
      { name: "100-500", rate: 0.8 },
      { name: "Others", rate: 0.75 },
    ],
    Footlocker: [
      { name: "100-500", rate: 0.85 },
      { name: "Others", rate: 0.8 },
    ],
  });

  // State for adding/editing
  const [newGiftCard, setNewGiftCard] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [newRate, setNewRate] = useState("");
  const [selectedGiftCard, setSelectedGiftCard] = useState("");
  const [editingRate, setEditingRate] = useState({ giftCard: "", index: -1, rate: 0 });

  // Add a new gift card
  const handleAddGiftCard = () => {
    if (newGiftCard && !giftCards[newGiftCard]) {
      setGiftCards({
        ...giftCards,
        [newGiftCard]: [],
      });
      setNewGiftCard("");
    }
  };

  // Add a new subcategory and rate
  const handleAddSubcategory = () => {
    if (selectedGiftCard && newSubcategory && newRate) {
      const updatedGiftCards = {
        ...giftCards,
        [selectedGiftCard]: [
          ...giftCards[selectedGiftCard],
          { name: newSubcategory, rate: parseFloat(newRate) },
        ],
      };
      setGiftCards(updatedGiftCards);
      setNewSubcategory("");
      setNewRate("");
    }
  };

  // Edit a subcategory rate
  const handleEditRate = (giftCard, index, newRate) => {
    const updatedSubcategories = [...giftCards[giftCard]];
    updatedSubcategories[index].rate = parseFloat(newRate);
    setGiftCards({
      ...giftCards,
      [giftCard]: updatedSubcategories,
    });
    setEditingRate({ giftCard: "", index: -1, rate: 0 }); // Reset editing state
  };

  return (
    <Box p={4}>
      <Flex mb={4} alignItems="center">
        <Heading as="h2" size="lg">
          Gift Cards
        </Heading>
        <Spacer />
        <DialogRoot>
          <DialogTrigger>
            <Button bg={Blue.p}>Add Gift Card</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <Heading size="md">Add New Gift Card</Heading>
              <DialogCloseTrigger />
            </DialogHeader>
            <DialogBody>
              <Input
                placeholder="Gift Card Name (e.g., Amazon)"
                value={newGiftCard}
                onChange={(e) => setNewGiftCard(e.target.value)}
              />
            </DialogBody>
            <DialogFooter>
              <Button bg="green" onClick={handleAddGiftCard}>
                Add Gift Card
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogRoot>
      </Flex>

      {/* Gift Cards Table */}
      <TableRoot>
        <TableHeader>
          <TableRow>
            <TableColumnHeader>Gift Card</TableColumnHeader>
            <TableColumnHeader>Subcategories</TableColumnHeader>
            <TableColumnHeader>Rates</TableColumnHeader>
            <TableColumnHeader>Actions</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(giftCards).map(([giftCard, subcategories]) => (
            <TableRow key={giftCard}>
              <TableCell>
                <Flex alignItems="center">
                  <Image
                    src={giftCardImages[giftCard]}
                    alt={giftCard}
                    w='40px'
                    mr={2}
                  />
                  <Text>{giftCard}</Text>
                </Flex>
              </TableCell>
              <TableCell>
                {subcategories.length > 0 ? (
                  subcategories.map((subcategory, index) => (
                    <Box key={index} mb={2}>
                      <Text fontWeight="bold">{subcategory.name}</Text>
                      <Text>{subcategory.rate}</Text>
                      <DialogRoot>
                        <DialogTrigger>
                          <Button
                            size="sm"
                            bg={Blue.p}
                            onClick={() =>
                              setEditingRate({
                                giftCard,
                                index,
                                rate: subcategory.rate,
                              })
                            }
                          >
                            Edit Rate
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <Heading size="md">
                              Edit Rate for {giftCard}'s {subcategory.name}
                            </Heading>
                            <DialogCloseTrigger />
                          </DialogHeader>
                          <DialogBody>
                            <Input
                              placeholder="New Rate"
                              value={editingRate.rate}
                              onChange={(e) =>
                                setEditingRate({
                                  ...editingRate,
                                  rate: e.target.value,
                                })
                              }
                              type="number"
                              step="0.01"
                            />
                          </DialogBody>
                          <DialogFooter>
                            <Button
                              bg="green"
                              onClick={() =>
                                handleEditRate(
                                  editingRate.giftCard,
                                  editingRate.index,
                                  editingRate.rate
                                )
                              }
                            >
                              Save
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </DialogRoot>
                    </Box>
                  ))
                ) : (
                  <Text color="gray.500">No subcategories</Text>
                )}
              </TableCell>
              <TableCell>
                {subcategories.length > 0 ? (
                  subcategories.map((subcategory, index) => (
                    <Box key={index} mb={2}>
                      <Text>{subcategory.rate}</Text>
                    </Box>
                  ))
                ) : (
                  <Text color="gray.500">—</Text>
                )}
              </TableCell>
              <TableCell>
                <DialogRoot>
                  <DialogTrigger>
                    <Button
                      size="sm"
                      bg="white"
                      color={Blue.p}
                      borderColor={Blue.p}
                      onClick={() => setSelectedGiftCard(giftCard)}
                    >
                      Add Subcategory
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <Heading size="md">Add Subcategory to {giftCard}</Heading>
                      <DialogCloseTrigger />
                    </DialogHeader>
                    <DialogBody>
                      <Input
                        placeholder="Subcategory (e.g., 100-500)"
                        value={newSubcategory}
                        onChange={(e) => setNewSubcategory(e.target.value)}
                        mb={2}
                      />
                      <Input
                        placeholder="Rate (e.g., 0.8)"
                        value={newRate}
                        onChange={(e) => setNewRate(e.target.value)}
                        type="number"
                        step="0.01"
                      />
                    </DialogBody>
                    <DialogFooter>
                      <Button bg="green" onClick={handleAddSubcategory}>
                        Add Subcategory
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </DialogRoot>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </Box>
  );
};

export default GiftcardForm;