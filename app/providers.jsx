"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { system } from "@/src/theme/system";
import { Toaster } from "@/src/components/ui/toaster";
import AuthSync from "@/src/components/AuthSync";

// Client providers: Chakra UI v3 system + forced light theme + auth sync.
export function Providers({ children }) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider attribute="class" forcedTheme="light" disableTransitionOnChange>
        <AuthSync />
        {children}
        <Toaster />
      </ThemeProvider>
    </ChakraProvider>
  );
}

