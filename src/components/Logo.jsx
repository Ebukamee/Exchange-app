"use client";
import { useState } from "react";
import { Flex, Text, Image } from "@chakra-ui/react";

// Path to the real Powerpay logo. Drop the exact artwork here:
//   public/powerpay-logo.png   (transparent PNG or SVG recommended)
// It is served from the site root as /powerpay-logo.png
const LOGO_SRC = "/powerpay-logo.png";

// Geometric "P" mark — SVG fallback used until the real artwork is added,
// and on dark surfaces where a colour-customisable mark reads better.
export function LogoMark({ size = 34, color = "#ed1c24" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M20 6h34c11 0 20 9 20 20s-9 20-20 20H38v22L20 90V6Z" fill={color} />
      <path d="M38 22h14a4 4 0 0 1 0 8H38v-8Z" fill="#ffffff" />
    </svg>
  );
}

export default function Logo({
  size = 34,
  color = "#ed1c24",
  showText = true,
  textColor,
  fontSize = "xl",
  useImage = false, // render the real logo image (mark + wordmark) as one lockup
  imageHeight,
}) {
  const [imgFailed, setImgFailed] = useState(false);

  // Preferred: the exact uploaded artwork.
  if (useImage && !imgFailed) {
    return (
      <Image
        src={LOGO_SRC}
        alt="Powerpay"
        h={`${imageHeight || size + 8}px`}
        w="auto"
        objectFit="contain"
        onError={() => setImgFailed(true)}
      />
    );
  }

  // Fallback: SVG mark + wordmark (colour-customisable).
  return (
    <Flex align="center" gap={2}>
      <LogoMark size={size} color={color} />
      {showText && (
        <Text
          as="span"
          fontFamily="heading"
          fontWeight="800"
          letterSpacing="0.12em"
          fontSize={fontSize}
          color={textColor || color}
        >
          POWERPAY
        </Text>
      )}
    </Flex>
  );
}

