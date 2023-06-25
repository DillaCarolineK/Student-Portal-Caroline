// TODO: answer here
import React from "react";
import { Link } from '@chakra-ui/react'
import { Flex, Box, Heading, Spacer, HStack, Button } from "@chakra-ui/react";

const NavBar = () => {
    return (
        <Box bg="teal" p={4} color="black" alignItems="center">
            <Flex as="nav">
                <Heading as="h1" data-testid="home-page">
                    <Link data-testid="student-btn" href='/'>Student Portal</Link>
                </Heading>
                <Spacer/>

                <HStack spacing="5px">
                    <Button colorScheme="teal">
                        <Link href="/student" data-testid="student-page">All Student</Link>    
                    </Button> 

                    <Button colorScheme="teal">
                        <Link href="/add" data-testid="add-page">Add Student</Link>
                    </Button>
                </HStack>
            </Flex>
        </Box>
    );
};

export default NavBar;
