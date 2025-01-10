import { Tabs } from "@chakra-ui/react";

export default function Dashboard() {
  return (
    <Tabs.Root defaultValue='home' w="100%">
      <Tabs.Content value="home">Home</Tabs.Content>
      <Tabs.Content value="notifications">Notifications</Tabs.Content>
      <Tabs.Content value="history">Transaction History</Tabs.Content>
      <Tabs.Content value="profile">Profile</Tabs.Content>
      <Tabs.List  display="flex" w="100%" justifyContent="space-between">
        <Tabs.Trigger value="home">Home</Tabs.Trigger>
        <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
        <Tabs.Trigger value="history">Transaction History</Tabs.Trigger>
        <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  );
}
