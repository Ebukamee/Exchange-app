"use client";
import { Suspense } from "react";
import { Flex, Spinner } from "@chakra-ui/react";
import Login from "@/src/views/login";

function LoadingFallback() {
  return (
    <Flex h="100vh" align="center" justify="center">
      <Spinner size="xl" color="brand.500" />
    </Flex>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Login />
    </Suspense>
  );
}
