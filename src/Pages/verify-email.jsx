import { Box, Container,Button,Text } from "@chakra-ui/react"
import { Blue } from "../assets/Colors"
export default function VerifyEmail()  {
    return(
        <Box maxH='100vh'>
            <Container  shadow='md' w='90%' maxW='600px'p={7}textAlign='center'my='30vh'>
               <Text color="gray.700" as='p'm={3}>
               We have Sent a Verification Email to your Email chukwuebukavictornwokike@gmail.com
               </Text>
               <Text color='gray.700' as='p'm={3}>Didnt Recieve It?</Text>
               <Button bg={Blue.p}>Resend</Button>
            </Container>
        </Box>
    )
}