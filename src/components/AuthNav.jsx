import { NavLink } from "react-router-dom";
import { Box, Heading } from "@chakra-ui/react";


export default function AuthNav() {
    return(
        <Box>
        <Heading as="h2" size="3xl" color="teal.500" textAlign='center' mb={4}>
                      BlixExchange
                    </Heading>
        <div className="authNav">
            <NavLink to='/signup' className={({isActive}) => isActive ? 'auth_blue' : 'auth'} id="reg">SIGN UP</NavLink>
            <NavLink to='/login'className={({isActive}) => isActive ? 'auth_blue' : 'auth'} id="log">LOG IN</NavLink>
        </div>
    </Box>
    );
}