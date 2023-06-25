// TODO: answer here
import React from "react";
import { useNavigate } from "react-router-dom";
import { Heading, Button, Container, Center } from "@chakra-ui/react";

const NotFound = () => {
    const navigate = useNavigate();

    return (
      <Container alignItems="center">
        <Center>
            <Heading as="h1">404 | Not Found</Heading>
            <Button onClick={() => navigate(-1)}>Take Me Back</Button>
        </Center>
      </Container>
    );
};

export default NotFound;
