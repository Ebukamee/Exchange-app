import { Tabs, Image, Box, Text } from "@chakra-ui/react";
import home from "../assets/images/home.svg";
import history from "../assets/images/history.svg";
import contact from "../assets/images/chat.svg";
import profile from "../assets/images/profile.svg";
import Home from "../Tabs/home";
import History from "../Tabs/History";
import ProfilePage from "../Tabs/Profile";
import useAuthStore from "../Store/userStore";
import { useEffect } from "react";

export default function Dashboard() {
    const user = useAuthStore((state) => state.user)
    useEffect(() => {
        console.log(user);
      }, []);
  return (
    <Tabs.Root defaultValue="home" w="100%" h="100vh" variant="enclosed">
      <Box m={10} mb={0}>
        <Text>
          <span style={{ fontSize: "30px", fontWeight: "600" }}>
            Welcome 👋🏼,{" "}
          </span>
          {/* {user} */}
        </Text>
      </Box>
      <Tabs.Content
        value="home"
        _open={{
          animationName: "fade-in, scale-in",
          animationDuration: "500ms",
        }}
        _closed={{
          animationName: "fade-out, scale-out",
          animationDuration: "500ms",
        }}
      >
        <Home />
      </Tabs.Content>
      <Tabs.Content
        value="history"
        _open={{
          animationName: "fade-in, scale-in",
          animationDuration: "500ms",
        }}
        _closed={{
          animationName: "fade-out, scale-out",
          animationDuration: "500ms",
        }}
      >
        {" "}
        <History />
      </Tabs.Content>
      <Tabs.Content
        value="chat"
        _open={{
          animationName: "fade-in, scale-in",
          animationDuration: "500ms",
        }}
        _closed={{
          animationName: "fade-out, scale-out",
          animationDuration: "500ms",
        }}
      >
        <History />
      </Tabs.Content>
      <Tabs.Content value="profile">
        <ProfilePage />
      </Tabs.Content>
      <Tabs.List
        display="flex"
        w="100%"
        position="sticky"
        bottom="0"
        justifyContent="space-between"
        bg="#fafaff"
        color="white"
        py={3}
      >
        <Tabs.Trigger value="home">
          <Image src={home} alt="home" />
        </Tabs.Trigger>
        <Tabs.Trigger value="history">
          {" "}
          <Image src={history} alt="history" />
        </Tabs.Trigger>
        <Tabs.Trigger value="chat">
          <Image src={contact} alt="home" />{" "}
        </Tabs.Trigger>
        <Tabs.Trigger value="profile">
          <Image src={profile} alt="profile" />
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  );
}
