import { Tabs,Image } from "@chakra-ui/react";
import home from '../assets/images/home.svg'
import History from '../assets/images/history.svg'
import Contact from '../assets/images/chat.svg'
import Profile from '../assets/images/profile.svg'
import Home from "../Tabs/home";

export default function Dashboard() {
  return (
    <Tabs.Root defaultValue='home' w="100%" variant="enclosed">
      <Tabs.Content value="home">
        <Home />
      </Tabs.Content>
      <Tabs.Content value="history">Transaction History</Tabs.Content>
      <Tabs.Content value="chat">Contact</Tabs.Content>
      <Tabs.Content value="profile">Profile</Tabs.Content>
      <Tabs.List  display="flex" w="100%" justifyContent="space-between" bg="bg.muted" color="white" py={3}>
        <Tabs.Trigger value="home"> 
            <Image src={home} alt='home' />
        </Tabs.Trigger>
        <Tabs.Trigger value="history"> <Image src={History} alt='history' /></Tabs.Trigger>
        <Tabs.Trigger value="chat"><Image src={Contact} alt='home' /> </Tabs.Trigger>
        <Tabs.Trigger value="profile"><Image src={Profile} alt='profile' /></Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  );
}
