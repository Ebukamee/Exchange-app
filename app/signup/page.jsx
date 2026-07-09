"use client";
import { Suspense } from "react";
import { Flex, Spinner } from "@chakra-ui/react";
import Signup from "@/src/views/signup";

function LoadingFallback() {
	return (
		<Flex h="100vh" align="center" justify="center">
			<Spinner size="xl" color="brand.500" />
		</Flex>
	);
}

export default function SignupPage() {
	return (
		<Suspense fallback={<LoadingFallback />}>
			<Signup />
		</Suspense>
	);
}

