import React from "react";
// TODO: answer here
import { Container } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home"
import AddStudent from "./Routes/AddStudent"
import Student from "./Routes/Student"
import EditStudent from "./Routes/EditStudent"
import NotFound from "./Routes/NotFound"
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
    return (
        // TODO: replace this
    <Container>
        <NavBar/>

        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/add" element={<AddStudent/>}/>
            <Route path="/student">
                <Route index element={<Student/>}/>
                <Route path=":id" element={<EditStudent/>}/>
            </Route>
            <Route path="*" element={<NotFound/>}/>
        </Routes>

        <Footer/>
    </Container>
    );
};

export default App;
