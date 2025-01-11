import { Box, Heading, Tabs } from "@chakra-ui/react";
import { Blue } from "../assets/Colors";
import AllTransactions from "./All";
import CryptoTransactions from "./Crypto";
import GiftcardTransactions from "./GiftCard";


export default function History() {
    return (
        <Box p={10}>
            <Heading as='h2'>
                Transactions History
            </Heading>
            <Tabs.Root defaultValue="all" w="100%" my={10} variant='plain'>
      <Tabs.List
        display="flex"
        w="100%"
        justifyContent="space-between"
        color="white"
        py={3}
      >
        <Tabs.Trigger
          value="all"
          rounded={0}
          _selected={{
            color: "blue.500",
            borderBottom: "2px solid",
            borderColor: "blue.500",
          }}
        >
          All
        </Tabs.Trigger>
        <Tabs.Trigger
          value="crypto"
          rounded={0}
          _selected={{
            color: "blue.500",
            borderBottom: "2px solid",
            borderColor: "blue.500",
          }}
        >
          Crypto
        </Tabs.Trigger>
        <Tabs.Trigger
          value="giftcard"
          rounded={0}
          _selected={{
            color: "blue.500",
            borderBottom: "2px solid",
            borderColor: "blue.500",
          }}
        >
          Giftcard
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="all"
          _open={{
            animationName: "fade-in, scale-in",
            animationDuration: "500ms",
          }}
          _closed={{
            animationName: "fade-out, scale-out",
            animationDuration: "500ms",
          }}>
        <AllTransactions />
      </Tabs.Content>
      <Tabs.Content value='crypto'
          _open={{
            animationName: "fade-in, scale-in",
            animationDuration: "500ms",
          }}
          _closed={{
            animationName: "fade-out, scale-out",
            animationDuration: "500ms",
          }}>
        <CryptoTransactions />
      </Tabs.Content>
      <Tabs.Content value="giftcard"
          _open={{
            animationName: "fade-in, scale-in",
            animationDuration: "500ms",
          }}
          _closed={{
            animationName: "fade-out, scale-out",
            animationDuration: "500ms",
          }}>
        <GiftcardTransactions />
      </Tabs.Content>
    </Tabs.Root>
        </Box>
    )
}