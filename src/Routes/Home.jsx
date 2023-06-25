// TODO: answer here
import React from "react";
import { Link, Box, Button } from '@chakra-ui/react';

const Home = () => {
    return (
        <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        width='100%'
        py={100}>
            <Button data-testid="student-btn" colorScheme="teal" size='lg' variant='outline'>
                <Link href="/student">All Student</Link>
            </Button>
        </Box>
        )
};

export default Home;