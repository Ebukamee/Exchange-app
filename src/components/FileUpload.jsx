"use client";
import { useRef } from "react";
import { Box, Flex, Image, Text, IconButton } from "@chakra-ui/react";
import { FaCloudArrowUp, FaXmark } from "react-icons/fa6";

// Multi-image picker with previews. Holds raw File objects in parent state.
export default function FileUpload({ files, onChange, label, hint }) {
  const ref = useRef();

  const add = (e) => {
    const picked = Array.from(e.target.files).filter((f) => f.type.startsWith("image/"));
    onChange([...files, ...picked]);
    e.target.value = "";
  };

  const remove = (i) => onChange(files.filter((_, idx) => idx !== i));

  return (
    <Box>
      <Box
        as="button"
        type="button"
        onClick={() => ref.current?.click()}
        w="100%"
        border="2px dashed"
        borderColor="ink.200"
        borderRadius="l2"
        p={6}
        textAlign="center"
        _hover={{ borderColor: "brand.400", bg: "brand.50" }}
        transition="all .15s"
      >
        <Flex direction="column" align="center" gap={2} color="ink.500">
          <FaCloudArrowUp size="1.6em" />
          <Text fontWeight="600" fontSize="sm" color="ink.700">{label || "Click to upload proof"}</Text>
          <Text fontSize="xs">{hint || "PNG, JPG — you can select multiple images"}</Text>
        </Flex>
      </Box>
      <input ref={ref} type="file" accept="image/*" multiple hidden onChange={add} />

      {files.length > 0 && (
        <Flex gap={3} mt={4} wrap="wrap">
          {files.map((file, i) => (
            <Box key={i} position="relative">
              <Image src={URL.createObjectURL(file)} boxSize="80px" objectFit="cover" borderRadius="l1" border="1px solid" borderColor="ink.100" />
              <IconButton
                aria-label="Remove"
                size="2xs"
                colorPalette="red"
                position="absolute"
                top="-6px"
                right="-6px"
                borderRadius="full"
                onClick={() => remove(i)}
              >
                <FaXmark />
              </IconButton>
            </Box>
          ))}
        </Flex>
      )}
    </Box>
  );
}

