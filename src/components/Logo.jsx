"use client";
import { useState } from "react";
import { Flex, Text, Image } from "@chakra-ui/react";

// Geometric "P" mark — SVG fallback used until the real artwork is added,
// and on dark surfaces where a colour-customisable mark reads better.
export function LogoMark({ size = 32, color = "#ed1c24" }) {
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

function getLogoSrc() {
  if (typeof window === "undefined") {
    return `https://${process.env.NEXT_PUBLIC_DOMAIN || "powerpaytech.com"}/powerpay-logo.png`;
  }
  const hostname = window.location.hostname || "";
  const domain = process.env.NEXT_PUBLIC_DOMAIN || "powerpaytech.com";
  if (hostname.startsWith("admin.") || hostname.startsWith("dashboard.")) {
    return `https://${domain}/powerpay-logo.png`;
  }
  return `${window.location.origin}/powerpay-logo.png`;
}

export default function Logo({
  size = 32,
  color = "#ed1c24",
  showText = true,
  textColor,
  fontSize = "xl",
  useImage = false,
  imageHeight,
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = useImage && !imgFailed;

  // Always render the same component tree to avoid conditional hook violations
  // in Chakra's internal components (Image vs Flex use different hooks).
  return (
    <>
      {showImage && (
        <Image
          src={getLogoSrc()}
          alt="Powerpay"
          h={`${imageHeight || size + 20}px`}
          w="auto"
          objectFit="contain"
          onError={() => setImgFailed(true)}
        />
      )}
      {!showImage && (
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
      )}
    </>
  );
}
