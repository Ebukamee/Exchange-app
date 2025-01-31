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
              <Button bg='green' onClick={handleAddGiftCard}>
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
              <TableCell>{giftCard}</TableCell>
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
                              Edit Rate for {giftCard}'s' {subcategory.name}
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
                              bg='green'
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
                      bg='white'
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
                      <Button
                        bg='green'
                        onClick={handleAddSubcategory}
                      >
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