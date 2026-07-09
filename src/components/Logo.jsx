"use client";
import { useState, useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";

// Geometric "P" mark — SVG fallback used on dark surfaces where a
// colour-customisable mark reads better, or when the image fails to load.
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

export default function Logo({
  size = 32,
  color = "#ed1c24",
  showText = true,
  textColor,
  fontSize = "xl",
  useImage = false,
  imageHeight,
}) {
  // Resolve the logo src on the client only (avoids SSR/hydration mismatch).
  const [src, setSrc] = useState(null);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    if (!useImage) return;
    const domain = process.env.NEXT_PUBLIC_DOMAIN || "powerpaytech.com";
    const hostname = window.location.hostname || "";
    if (hostname.startsWith("admin.") || hostname.startsWith("dashboard.")) {
      setSrc(`https://${domain}/powerpay-logo.png`);
    } else {
      setSrc(`${window.location.origin}/powerpay-logo.png`);
    }
  }, [useImage]);

  const showImage = useImage && src && !imgFailed;
  const h = imageHeight || size + 20;

  // Use a plain <img> to avoid Chakra Image's internal hooks which cause
  // React error #310 when conditionally mounted/unmounted.
  if (showImage) {
    return (
      <img
        src={src}
        alt="Powerpay"
        style={{ height: `${h}px`, width: "auto", objectFit: "contain" }}
        onError={() => setImgFailed(true)}
      />
    );
  }

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
