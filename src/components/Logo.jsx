"use client";
import { useState } from "react";
import { Flex, Text, Image } from "@chakra-ui/react";

// The logo asset is hosted at the site root. On admin/dashboard subdomains
// some environments may not serve the public assets from the subdomain, so
// we compute a safe absolute host when necessary.

// Geometric "P" mark — SVG fallback used until the real artwork is added,
// and on dark surfaces where a colour-customisable mark reads better.
export function LogoMark({ size = 64, color = "#ed1c24" }) {
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
  size = 64,
  color = "#ed1c24",
  showText = true,
  textColor,
  fontSize = "4xl",
  useImage = false, // render the real logo image (mark + wordmark) as one lockup
  imageHeight,
}) {
  const [imgFailed, setImgFailed] = useState(false);

  // Preferred: the exact uploaded artwork. Use the main site host for admin
  // and dashboard subdomains to ensure the asset is reachable.
  if (useImage && !imgFailed) {
    let src = "/powerpay-logo.png";
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname || "";
      const domain = process.env.NEXT_PUBLIC_DOMAIN || "powerpaytech.com";
      if (hostname.startsWith("admin.") || hostname.startsWith("dashboard.")) {
        src = `https://${domain}/powerpay-logo.png`;
      } else {
        src = `${window.location.origin}/powerpay-logo.png`;
      }
    } else {
      src = `https://${process.env.NEXT_PUBLIC_DOMAIN || "powerpaytech.com"}/powerpay-logo.png`;
    }

    return (
      <Image
        src={src}
        alt="Powerpay"
        h={`${imageHeight || size + 20}px`}
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

